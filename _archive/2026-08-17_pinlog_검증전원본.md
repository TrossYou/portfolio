# PinLog — 에이전트 3개를 병렬로 돌려 5주 만에 만든 프론트엔드 개발 기록

> 장소를 저장한 이유와 경험을 기록하고, 자연어 검색으로 다시 찾는 서비스
> 2026.07–08 · 5주 · 6인 (기획 / 프론트엔드 / 백엔드 / 인프라 분리) · SSAFY 프로젝트

![PinLog](public/assets/pinlog-home.jpg)

**시연 영상** [전체 흐름](https://youtu.be/lD5MbHL9TZ8) · **저장소** [Team-PinLog/front](https://github.com/Team-PinLog/front) · **팀** [Team-PinLog](https://github.com/Team-PinLog)

> 서비스는 2026.08 배포 종료. 아래 화면은 종료 직전 기록입니다.

---

## 이 문서에서 내 기여의 범위

프론트엔드 기능 구현을 담당했고 저장소 커밋 대부분이 제 작업입니다.
다만 **코드의 상당 부분은 제가 직접 타이핑한 것이 아니라 에이전트가 생성한 것**입니다.
이 문서는 그 사실을 전제로, 제가 실제로 결정한 층위를 기록합니다.

| 제가 결정한 것 | 에이전트가 생성한 것 |
|---|---|
| 규칙 문서를 먼저 만들고 착수한다 | 규칙 문서의 문장 |
| `git worktree`로 레인을 3개로 나눈다 | 각 레인의 구현 코드 |
| 커밋 전 보고를 필수 관문으로 둔다 | 인증 재발급·상태 관리 구현 |
| 권한을 넓혔다가 되돌린다 | 응답 스키마 검증 배치 |
| 도구를 Codex로 전환한다 | 트러블슈팅 문서 본문 |
| 무엇을 기록할지, 언제 멈출지 | |

구현 세부의 설계자는 제가 아닙니다. **오케스트레이션 구조의 설계자는 저입니다.**

---

## 제약

- 5주 안에 기획 · 문서화 · 구현 · 발표까지 전부
- 프론트엔드 기능 구현은 사실상 1인
- 팀 전원이 역할을 나눠 협업하는 것 자체가 처음
- 에이전트 기반 개발도 처음 — 초기 세팅에만 약 1주

코드를 전부 직접 작성하는 선택지는 일정상 없었습니다.
그래서 **에이전트가 지켜야 할 규칙과, 규칙이 지켜졌는지 자동으로 검증하는 관문을 먼저 만들었습니다.**

이 방식을 택한 배경은 [formalBridge 회고](formabridge.md)에 있습니다.

---

## 화면

> AI 응답 대기와 타이핑 구간은 배속 처리했습니다.

1. **자연어 검색** — 저장한 맥락을 문장으로 다시 찾습니다. 서비스의 핵심 기능
   ![자연어 검색](public/assets/pinlog-natural-search.gif)
2. **장소 추가 (이미지)** — 사진에서 장소를 추출해 기록
   ![장소 추가 (이미지)](public/assets/pinlog-add-place-image.gif)
3. **장소 추가 (텍스트)** — 검색으로 장소를 찾아 기록
   ![장소 추가 (텍스트)](public/assets/pinlog-add-place-text.gif)
4. **지도 마커 → 레코드 상세**
   ![지도 마커 → 레코드 상세](public/assets/pinlog-map-marker.gif)
5. **피드** — 레코드 저장과 팔로우
   ![피드](public/assets/pinlog-feed.gif)
6. **라이브러리**
   ![라이브러리](public/assets/pinlog-library.gif)

### 주요 화면

| | | |
|---|---|---|
| ![장소 추가](public/assets/pinlog-add-place.jpg) 장소 추가 | ![검색 결과](public/assets/pinlog-search-result.jpg) 검색 결과 | ![검색 결과 없음](public/assets/pinlog-search-empty.jpg) 검색 결과 없음 (빈 상태 처리) |
| ![레코드 상세](public/assets/pinlog-record-detail.jpg) 레코드 상세 | ![피드](public/assets/pinlog-feed.jpg) 피드 | ![라이브러리](public/assets/pinlog-library.jpg) 라이브러리 |
| ![컬렉션 상세](public/assets/pinlog-collection-detail.jpg) 컬렉션 상세 | | |

---

## 1. 하네스를 먼저 만들었다

| 층위 | 위치 | 역할 |
|---|---|---|
| 도메인 사실 | `docs/reference/` | 추측 대신 근거로 삼는 원본 기획·명세 |
| 금지 규칙 | [`AGENTS.md`](https://github.com/Team-PinLog/front/blob/dev/AGENTS.md) | 실제 실패를 규칙으로 고정 (6항목) |
| 작업 절차 | [`docs/conventions.md`](https://github.com/Team-PinLog/front/blob/dev/docs/conventions.md) §5 | 티켓 → 브랜치 → **커밋 전 보고** → `/pr` → 머지 |
| 자동 검증 | CI | lint · typecheck · build · test 통과해야 이미지 빌드 |
| 재발 방지 | [`docs/troubleshooting/`](https://github.com/Team-PinLog/front/blob/dev/docs/troubleshooting/README.md) | 다음 세션이 먼저 읽는 자산 |

두 가지 원칙을 세웠습니다.

**추측 금지.** 문서에 없는 정책이나 엔드포인트는 구현하지 않고 API 계약의 "협의 필요" 항목을 확정된 것처럼 다루지 않는다. 도메인 판단이 필요하면 원본 문서를 근거로 삼는다.

**절차 밖 git 조작 금지.** 이슈키 없이 브랜치를 만들지 않고 검사가 전부 통과해도 커밋 전에 반드시 멈춰 보고한다.

### 규칙은 실패한 뒤에 추가됐다

`AGENTS.md`의 금지 항목은 처음부터 있던 게 아닙니다. 문제가 터질 때마다 하나씩 붙인 것입니다. 가장 대표적인 사례:

> "프론트는 토큰을 저장하지 않는다"
> → 에이전트가 이를 **"재발급 로직 자체를 만들지 말라"로 오독**해 401 복구가 통째로 빠졌습니다.

규칙 자체를 고치는 대신 **반례를 명시하는 형태**로 수정했습니다. 재발급은 반드시 하되 토큰 값을 읽거나 보관하지 않는다는 두 사실을 한 항목 안에 붙였습니다.

이후 규칙 작성 형식을 통일했습니다 — **금지만 쓰지 않고 혼동되기 쉬운 인접 행위 중 허용되는 것을 함께 쓴다.** 같은 오독은 재발하지 않았습니다.

---

## 2. 병렬화와 그 대가

직렬로 지시하고 결과를 복사해 옮기는 방식이 너무 느려 `git worktree`로 레인을 3개로 나누고 조율 세션이 작업을 분배하는 구조로 옮겼습니다.

처리량은 확실히 늘었습니다. 그런데 **병목이 사라진 게 아니라 검토 대역폭으로 이동했습니다.**

- 제가 한 레인을 검토하는 동안 나머지 두 레인은 대기
- 레인마다 dev 서버를 따로 띄워야 함
- 어느 레인이 무슨 작업 중인지 추적이 안 돼 대시보드를 만들었지만 갱신이 지연되고 작업 로그와 응답이 섞임

그리고 **병렬 구조 자체에서 새로운 실패 유형이 나왔습니다.**

| 실패 | 원인 | 기록 |
|---|---|---|
| 중복 구현과 죽은 소비자 | 레인의 시야가 좁아 서로의 작업을 모름 | [문서](https://github.com/Team-PinLog/front/blob/dev/docs/troubleshooting/2026-08-06-collection-spread-redesign-lessons.md) |
| 카카오맵 SDK 401 | 병렬 dev 포트(5174·5175)가 콘솔에 미등록. **코드 회귀로 오인** | [문서](https://github.com/Team-PinLog/front/blob/dev/docs/troubleshooting/2026-08-07-kakao-sdk-401-on-parallel-dev-ports.md) |
| 스택 브랜치 CONFLICTING | 부모가 squash 머지되며 이력이 갈라짐 | [문서](https://github.com/Team-PinLog/front/blob/dev/docs/troubleshooting/2026-08-07-squash-merge-stacked-branch-rebase.md) |
| 레인 세팅 함정 6종 | worktree 분할 기준 미비 | [문서](https://github.com/Team-PinLog/front/blob/dev/docs/troubleshooting/2026-08-06-parallel-worktree-sessions.md) |

각각을 `docs/troubleshooting/`에 남겨 다음 세션이 같은 곳에서 멈추지 않게 했습니다.
**병렬화의 이득은 명확했지만 공짜가 아니었고 그 비용을 문서로 남긴 것이 이 프로젝트에서 가장 값이 나간 작업이라고 생각합니다.**

---

## 3. 권한 설계를 잘못 잡았다

일정이 급해지며 조율 세션의 자유도를 계속 넓혔습니다. 가벼운 명령은 자체 승인, MCP로 Jira 연결, 로컬 커밋 후 검토를 전제로 한 머지 권한까지.

Opus로 운용하는 동안은 문제가 없었습니다. **토큰이 부족해 조율 세션 모델을 낮추자 상황이 무너졌습니다.**

- 지시하지 않은 범위까지 수정
- 그 상태로 머지되어 배포까지 진행
- 제 피드백이 반영되지 않은 채 다음 작업으로 넘어감

### 무엇이 진짜 원인이었나

처음에는 "약한 모델에 권한을 너무 줬다"고 정리했는데, 다시 보니 정확하지 않았습니다.

**결함은 권한이 모델과 무관하게 고정돼 있었다는 점입니다.**
저는 Opus를 관찰하고 "이 정도면 믿을 만하다"고 판단해 권한을 열었습니다. 그런데 그 판단의 전제가 바뀌었을 때, 권한은 자동으로 따라 내려오지 않았습니다. 신뢰의 근거가 사라졌는데 신뢰의 결과만 남아 있었던 겁니다.

승인 관문을 되돌리고 이후로는 **권한을 상수가 아니라 실행 주체에 종속된 값으로** 다루기로 했습니다.

---

## 4. 도구를 옮겼는데, 하네스는 그대로 갔다

Codex로 전환했습니다. 옮기고 나서 확인한 것:

- **하네스가 문서로 남아 있어 규칙·절차가 그대로 이어졌습니다.** 재작성한 것은 커맨드 정의뿐이었습니다.
- Codex는 "꼼꼼히 하라"고 지정한 범위를 잘 지키는 대신, 검토·검증 단계가 길고 토큰 소모가 컸습니다.

**이 프로젝트에서 얻은 가장 중요한 결론입니다 — 자산은 도구가 아니라 하네스였습니다.**
서브에이전트, skills, 훅 같은 기능은 계속 바뀌겠지만 "무엇을 근거로 삼고, 어디서 멈추고, 무엇을 자동으로 검증하는가"는 도구를 갈아타도 그대로 옮겨갑니다.

---

## 화면 구현과 남은 부채

공식 역할 분담에서 UI/UX는 동료([@ghkim1632](https://github.com/ghkim1632))가 담당했고 목업을 기준으로 API·라우팅·기능을 구현했습니다.
마감 1.5주 전 디자인 개편이 결정되면서부터는 화면 개선에도 직접 참여했고 마감 3일 전 재개선 때는 인프라 담당자의 도움도 받았습니다.

일정 때문에 마무리하지 못한 것을 남겨둡니다.

- **반응형** — PC 기준으로만 검증했습니다
- **폰트 로딩** — 서브셋·WOFF2 파이프라인을 구성하려다 [라이선스 문제](https://github.com/Team-PinLog/front/blob/dev/docs/troubleshooting/2026-08-07-free-font-license-blocks-subset-pipeline.md)로 중단했고 대체안을 적용할 시간이 없었습니다
- **AI 응답 대기** — 자연어 검색, 사진 기반 장소 추출, 메모 추천은 응답에 수 초가 걸립니다. 스피너 외의 로딩 경험 설계와 응답 시간 단축은 일정상 다루지 못했습니다.

셋 다 인지하고 우선순위에서 밀어낸 것이지, 놓친 것은 아닙니다.

---

## 다음에 다르게 할 것

**1. 검토 대역폭을 먼저 재고 레인 수를 정한다.**
이번에는 레인부터 늘리고 병목을 나중에 발견했습니다. 다음에는 *에이전트가 커밋 전 보고까지 오는 시간*과 *내가 그것을 검토하는 시간*을 먼저 측정하겠습니다. 후자가 크면 레인을 늘려도 대기열만 길어집니다.

**2. 권한을 실행 주체와 묶는다.**
모델이나 세션 구성이 바뀌면 권한도 같이 재평가되도록 만들겠습니다.

**3. 자동 관문의 층을 하나 더 올린다.**
현재 CI는 lint·typecheck·build·test까지 잡아줍니다. 그 위의 도메인 규칙 위반과 죽은 코드는 여전히 제 눈이 유일한 관문이었고, 그게 검토 병목의 실체였습니다.

**4. 구현을 이해하는 속도를 따라붙인다.**
초반에 에이전트가 구조까지 잡아준 탓에 코드와 아키텍처를 이해하는 속도가 산출물 속도를 못 따라갔습니다. 프로젝트 후반에 구조를 따로 학습해 격차를 좁혔지만 다음에는 **생성 즉시 따라 읽는 것을 절차에 포함**시키겠습니다.

---

## 기술 스택

React 19 · TypeScript · Vite · TanStack Router/Query · Tailwind CSS · Axios · Zod · React Hook Form · Vitest
Nginx 정적 이미지 · Kubernetes 배포 (Infra 저장소 GitOps 경계)

구조와 데이터 흐름은 [`docs/architecture.md`](https://github.com/Team-PinLog/front/blob/dev/docs/architecture.md), 전체 트러블슈팅 15건은 [`docs/troubleshooting/`](https://github.com/Team-PinLog/front/blob/dev/docs/troubleshooting/README.md)에 있습니다.
