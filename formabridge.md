# formalBridge — 리뷰 대기가 반복 주기를 지배할 때, 검증 환경을 따로 만들었다

> 좋아하는 음악을 쉽게 기록하는 서비스
> 2025.04–11 · 4인 (학부 동기) · 사이드 프로젝트

**저장소** [formalBridge/project_alpha](https://github.com/formalBridge/project_alpha) · **배포** 현재 중단

---

## 담당 범위

풀스택으로 참여했습니다.

| 영역 | 작업 |
|---|---|
| 인증 | Google OAuth + JWT |
| 외부 연동 | Spotify API |
| 기능 | 팔로우 시스템, 메모 검색 |
| 화면 | 모바일 반응형 UI |
| 배치 | TS 스크립트를 올리면 이미지 빌드·배포·실행까지 이어지는 배치 파이프라인 |
| 배포 | Kubernetes Job 배포 워크플로 (GitHub Actions) |

이 문서는 그중 **배치 파이프라인과 그 배포 과정**을 다룹니다.
가장 오래 막혔고, 가장 많이 배운 작업이기 때문입니다.

---

## 1. 스크립트 하나만 추가하면 배포까지 끝나게 만들었다

첫 요구는 곡 레코드에 Spotify ID를 채우는 일회성 작업이었지만, 앞으로 비슷한 일괄 작업이 계속 생길 것이 분명했습니다. 그래서 스크립트 하나를 돌리는 대신 **배치를 추가하는 절차 자체**를 만들었습니다.

```
scripts/에 TS 파일 작성 → push
  → Build Batch Image (tsup 번들 → 이미지 → GHCR, 태그: sha-<commit>)
    → Deploy And Run Batch Job (해당 태그로 K8s Job 실행 → 완료 대기 → 로그 출력)
```

핵심은 **범용 실행기**입니다. `scripts/job-runner.ts`가 `JOB_NAME` 환경변수로 받은 경로의 모듈을 동적 import해 실행합니다.

```ts
const job = await import(modUrl);
const runFn = pickRunFn(job);   // default export 또는 named export 'run'
await runFn();
```

`JOB_NAME`은 파일 경로에서 자동으로 결정되므로, **다음 배치를 추가할 때 워크플로·Dockerfile·매니페스트를 손댈 필요가 없습니다.** 스크립트만 올리면 됩니다.

컨테이너 환경에 맞춰 챙긴 것:

```ts
process.on('SIGTERM', () => process.exit(143));  // 128 + 15
process.on('SIGINT',  () => process.exit(130));  // 128 + 2
```

Kubernetes가 Pod를 종료할 때 보내는 시그널을 받아 표준 종료 코드로 나가게 했습니다. 이 처리가 없으면 Job이 종료 상태를 정확히 판정하지 못합니다. 실행 시간도 함께 기록해 로그만으로 소요 시간을 알 수 있게 했습니다.

---

## 2. 되돌릴 수 없는 작업에 DRY RUN을 먼저 붙였다

`spotifyId` 컬럼은 2025년 10월 6일(`255f8fa`)에 스키마에 추가됐습니다. 그 이전에 만들어진 곡 레코드에는 이 값이 없었고, 제목·아티스트만 들어 있었습니다. 즉 이 배치는 새 데이터를 만드는 작업이 아니라 **컬럼 추가 이전 레코드에 생긴 공백을 소급해서 채우는 작업**이었습니다. 건당 외부 API 호출이 필요해 서비스 요청 흐름 안에서 처리할 수 없었으므로, 별도 배치 스크립트로 분리했습니다.

문제는 **매칭이 틀려도 티가 안 난다**는 점이었습니다. 구현은 검색 결과의 첫 번째를 그대로 씁니다.

```ts
const results = await spotifyAPI.search({ title: song.title, artist: song.artist });
if (results.length > 0 && results[0].spotifyId) {
  const spotifyId = results[0].spotifyId;
```

동명이곡이나 커버 버전이 상위에 오면 엉뚱한 ID가 박히고, 한국어 제목은 특히 매칭이 불안정합니다.

이 값이 위험한 이유는 **화면 표시 경로가 `spotifyId` 유무로 갈리기 때문**입니다. `spotifyId`가 있으면 Spotify oEmbed로 받아온 임베드를 렌더하고 DB의 제목·아티스트는 쓰지 않습니다. 없으면 DB 필드로 폴백합니다(`app/features/music/loader.tsx`, `music.user.tsx`). oEmbed가 돌려주는 것은 텍스트 데이터가 아니라 iframe HTML이고, 애초에 임베드를 쓴 목적도 커버·미리듣기·Spotify 연결이 붙은 **재생 가능한 플레이어 위젯**이었습니다.

배치는 `spotifyId` 컬럼만 채우지만, 그 한 컬럼이 채워지는 순간 해당 곡의 표시가 DB 필드에서 임베드 위젯으로 전환됩니다. 잘못된 ID가 박히면 값이 조금 어긋나는 정도가 아니라 **엉뚱한 곡의 플레이어가 뜹니다.** 그래서 **쓰기 전에 무엇이 바뀔지 먼저 눈으로 확인할 수 있게** 만들었습니다.

```ts
const DRY_RUN = process.env.DRY_RUN === 'true';
```

```
[91/100] Processing: "예술이야" by "싸이"
[DRY] would update songId=92 spotifyId=7rPEpMvt602Np1i7TFk3Hc
[92/100] Processing: "Midnight Fiction" by "ILLIT"
...
[100/100] Processing: "Photograph" by "Ed Sheeran"
```

DRY 모드에서는 쓰기 없이 변경 예정 내역만 출력합니다. 실제 실행 전에 매칭 결과를 곡 단위로 검토할 수 있었습니다. **기본값을 시뮬레이션 쪽에 두어**, 설정을 빠뜨렸을 때 데이터가 바뀌지 않는 방향으로 실패하게 했습니다.

### 그 외에 넣은 안전장치

**어느 DB에 붙었는지 먼저 확인한다** — 되돌리기 어려운 스크립트라 연결 대상을 실행 시작 시점에 출력하도록 했습니다.

```ts
select current_database() as db, current_schema() as schema
```

**재실행이 안전하다** — 대상 조건이 `spotifyId: null`이라 이미 채워진 레코드는 다음 실행에서 자동으로 제외됩니다. 중단 후 재개해도 중복 갱신이 발생하지 않습니다.

**접속 정보는 마스킹한다** — `maskDatabaseUrl()`로 계정·비밀번호를 가려 출력합니다.

**실행 환경 차이를 스크립트가 흡수한다** — 컨테이너 안에서 실행되면 `localhost`를 `host.docker.internal`로 자동 재작성해, 로컬과 컨테이너에서 같은 설정으로 돌 수 있게 했습니다.

**레이트리밋과 부분 실패** — 호출 간 200ms 간격을 두고, 곡 단위 `try/catch`로 한 건의 실패가 전체를 중단시키지 않게 했습니다.

### 남은 한계

대상 조회가 `take: LIMIT` 상한 방식이라 페이지네이션 루프가 없습니다. 대상이 상한을 넘으면 반복 실행해야 합니다. 실제 작업은 100건 규모라 문제가 되지 않았지만, 규모가 커지면 커서 기반 순회로 바꿔야 하는 지점입니다.

---

## 3. 교착 — 검증하려면 머지해야 하고, 머지하려면 리뷰가 필요했다

배포 워크플로(`DeployAndRunBatchJob.yml`)는 `main` push에서만 트리거되도록 돼 있었습니다. 그런데 `main`은 브랜치 보호가 걸려 있어 리뷰 없이는 머지가 불가능했습니다.

```
워크플로가 main push에서만 트리거됨
  → main은 브랜치 보호 + 리뷰 필수
    → 새벽 시간대, 리뷰해줄 사람이 없음
      → 머지 불가 → 검증 불가 → 한 사이클에 몇 시간씩 대기
```

워크플로의 문법 오류, 시크릿 이름 불일치, 권한 부족은 **실제로 실행해봐야만 드러납니다.** 로컬 검증으로 대체되지 않습니다.

그런데 병목은 기술이 아니라 **제가 통제할 수 없는 대기 시간**이었습니다. 한 줄을 고치고 결과를 보기까지 몇 시간이 걸리는 구조에서는 원인을 좁혀갈 수가 없었습니다.

---

## 4. 해결 — 나 혼자 돌릴 수 있는 동일 환경

개인 저장소에 fork를 만들고 값을 채워 같은 조건을 재현했습니다. 브랜치 보호도 리뷰 절차도 없으니 **직접 push하고 `workflow_dispatch`로 즉시 실행**할 수 있었습니다.

fork에 맞추기 위해 바꾼 것:

| 커밋 | 내용 |
|---|---|
| `0e56fef` | 배치 이미지 빌드 워크플로 분리 |
| `ad07593` | fork 환경에 맞게 배치 잡·워크플로 조정 |
| `b909258` | 이미지 네임스페이스를 개인 GHCR로 변경 |
| `dfa0e26` | GHCR 인증을 `GITHUB_TOKEN` → PAT로 교체 (권한 부족) |

**2025년 10월 18일 새벽 3시 4분 ~ 4시 23분, 80분 동안 8회 실행.** 팀 저장소에서였다면 며칠이 걸렸을 사이클입니다.

이 과정에서 Kubernetes Job의 제약도 여기서 배웠습니다.

```bash
# Job은 spec이 immutable — 같은 이름으로 apply하면 실패한다.
# 재실행하려면 지우고 다시 만들어야 한다.
kubectl delete job "$JOB_RESOURCE_NAME" --ignore-not-found=true
kubectl apply -f .out/job.yaml

# 리소스 이름은 RFC 1123 — 소문자·숫자·하이픈만 허용된다.
JOB_RESOURCE_NAME="$(echo "$stem" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g')"

# apply는 "Job을 만들었다"까지만 보장한다.
# 이게 없으면 배치가 실패해도 Actions는 초록불이 뜬다.
kubectl wait --for=condition=complete --timeout=1800s job/"$JOB_RESOURCE_NAME"
kubectl logs -f job/"$JOB_RESOURCE_NAME" --all-containers=true --tail=1000
```

---

## 5. 한계 — fork로 전부 끝나지는 않았다

fork에서 워크플로 문법과 이미지 빌드는 통과시켰지만, **최종 통합은 결국 팀 저장소에서 해야 했습니다.**

그래서 `main` 이력에 검증 중이던 커밋이 그대로 남아 있습니다.

```
#221  DeployAndRunBatchJob.yml 수정 중 251106
#222  DeployAndRunBatchJob.yml 수정중 (251107_1712)
#223  DeployAndRunBatchJob.yml 수정중(251107_1741)
#224  DeployAndRunBatchJob.yml 최종수정
#225  Revert "최종수정"
```

11월 6일부터 7일 저녁까지, 약 30시간이 걸렸습니다.

**#225는 실패 롤백이 아닙니다.** 백필은 일회성 작업인데 `main` push마다 트리거되면 이후 모든 머지에서 재실행됩니다. 목적을 달성한 뒤 자동 트리거를 회수하고 수동 실행만 남긴 것입니다. 실제로 배치가 성공한 것은 revert 이후였습니다.

```
18:46  revert 머지
18:50  Build and Push Batch Image  수동 실행 ✅
18:51  Deploy & Run Batch Job      수동 실행 ✅
```

---

## 6. 30시간의 실제 원인

돌아보면 시간을 잡아먹은 것은 문제의 난이도가 아니었습니다. **원인을 볼 수 있는 수단이 없었던 것**입니다.

워크플로는 템플릿에 환경변수를 치환해 매니페스트를 만드는 구조였는데, 치환 결과를 볼 수 없으니 `apply` 실패의 원인이 템플릿인지 변수인지 구분할 수 없었습니다. 그래서 매번 추측으로 한 줄 고치고 다시 돌렸습니다.

렌더된 매니페스트를 출력하는 스텝을 넣은 뒤에야 원인이 보이기 시작했습니다.

```bash
envsubst < k8s/jobs/batch-job-template.yml > .out/job.yaml
echo "--- Rendered manifest ---"
cat .out/job.yaml
```

**관측 수단을 먼저 만들지 않고 시도 횟수로 밀어붙인 것이 30시간의 실제 원인이었습니다.**

---

## 7. 지금이라면 다르게 할 것

**자격증명을 개인 저장소에 두지 않겠습니다.**
당시 fork의 Secret에 팀 클러스터의 `KUBECONFIG`를 넣어 검증했습니다. 배치는 DRY 모드라 데이터를 바꾸지 않았지만, 팀 인프라 자격증명이 팀의 접근 통제 밖에 놓였다는 점은 잘못된 선택이었습니다. 읽기 전용 계정과 별도 네임스페이스를 준비하는 것이 맞습니다.

**로그의 credential 취급을 일관되게 하겠습니다.**
DB 접속 문자열은 마스킹 함수를 만들어 가렸으면서, Spotify 액세스 토큰은 매 반복마다 로그에 그대로 출력되고 있었습니다. 인식이 없었던 게 아니라 한 곳에 적용하지 못한 누락이었고, 그래서 더 체계가 필요했습니다.

**AI 사용 방식을 바꿨습니다.**
이 프로젝트에서 AI는 "이 기능 추가해줘", "이 에러 고쳐줘" 식으로 썼습니다. 기능은 나왔지만 왜 그렇게 동작하는지 설명할 수 없는 코드가 남았고, 같은 문제를 다시 만나면 처음부터 다시 물어야 했습니다.

다음 프로젝트인 [PinLog](pinlog.md)에서는 반대로 접근했습니다. 규칙 문서를 먼저 만들고, 커밋 전 보고를 관문으로 두고, 해결한 문제를 `docs/troubleshooting/`에 남겨 다음 세션이 먼저 읽게 했습니다.

**방식을 바꾼 이유가 이 프로젝트에 있습니다.**

---

## 기술 스택

Remix (React + Vite) · TypeScript · Prisma · PostgreSQL · Docker · Kubernetes · GitHub Actions (GHCR) · pnpm
