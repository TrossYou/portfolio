export type Metric = { value: string; label: string };

export type Block =
  | { kind: 'text'; body: string }
  | { kind: 'lead'; body: string }
  | { kind: 'quote'; body: string }
  | { kind: 'code'; lang: string; body: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] };

export type Chapter = {
  no: string;
  title: string;
  blocks: Block[];
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  period: string;
  team: string;
  role: string;
  context: string;
  cover?: string;
  accent: string;
  hoverPreview?: string;
  summary: string;
  metrics: Metric[];
  stack: string[];
  links: { label: string; href: string }[];
  note?: string;
  chapters: Chapter[];
};

export const projects: Project[] = [
  {
    slug: 'pinlog',
    name: 'PinLog',
    tagline: '장소를 저장한 이유를 기록하고, 자연어로 다시 찾는 서비스',
    year: '2026',
    period: '2026.07–08 · 5주',
    team: '6인',
    role: '프론트엔드',
    context: 'SSAFY 자율 프로젝트',
    cover: 'assets/pinlog-home.jpg',
    hoverPreview: 'assets/pinlog-natural-search.gif',
    accent: '#dc4527',
    summary:
      '5주 안에 기획부터 발표까지, 프론트엔드는 사실상 1인. 코드를 전부 직접 쓰는 선택지가 없어서 에이전트가 지켜야 할 규칙과 그것을 자동으로 검증하는 관문을 먼저 만들었다.',
    metrics: [
      { value: '5주', label: '기획–구현–발표' },
      { value: '3', label: '병렬 작업 레인' },
      { value: '15건', label: '트러블슈팅 문서' },
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Router/Query',
      'Tailwind CSS',
      'Vitest',
      'Kubernetes',
    ],
    links: [
      { label: '시연 영상', href: 'https://youtu.be/lD5MbHL9TZ8' },
      { label: '저장소', href: 'https://github.com/Team-PinLog/front' },
      {
        label: '전체 기록',
        href: 'https://github.com/TrossYou/portfolio/blob/main/pinlog.md',
      },
    ],
    note: '서비스는 2026.08 배포 종료. 화면은 종료 직전 기록입니다.',
    chapters: [
      {
        no: '01',
        title: '하네스를 먼저 만들었다',
        blocks: [
          {
            kind: 'lead',
            body: '코드를 전부 직접 작성하는 선택지는 일정상 없었습니다. 그래서 **에이전트가 지켜야 할 규칙과, 규칙이 지켜졌는지 자동으로 검증하는 관문**을 먼저 만들었습니다.',
          },
          {
            kind: 'table',
            head: ['층위', '역할'],
            rows: [
              ['`AGENTS.md`', '실제 실패를 금지 규칙으로 고정 (6항목)'],
              ['`docs/conventions.md`', '티켓 → 브랜치 → 커밋 전 보고 → PR → 머지'],
              ['CI', 'lint · typecheck · build · test 통과해야 이미지 빌드'],
              ['`docs/troubleshooting/`', '다음 세션이 먼저 읽는 자산'],
            ],
          },
          {
            kind: 'text',
            body: '규칙은 처음부터 있던 게 아니라 문제가 터질 때마다 하나씩 붙인 것입니다. "프론트는 토큰을 저장하지 않는다"를 에이전트가 **"재발급 로직을 만들지 말라"로 오독**해 401 복구가 통째로 빠진 적이 있습니다.',
          },
          {
            kind: 'text',
            body: '규칙을 고치는 대신 **반례를 명시하는 형태**로 바꿨습니다 — 금지만 쓰지 않고, 혼동되기 쉬운 인접 행위 중 허용되는 것을 함께 쓴다. 같은 오독은 재발하지 않았습니다.',
          },
        ],
      },
      {
        no: '02',
        title: '병렬화의 대가는 검토 대역폭이었다',
        blocks: [
          {
            kind: 'text',
            body: '직렬 지시가 너무 느려 `git worktree`로 레인을 3개로 나눴습니다. 처리량은 늘었지만 **병목이 사라진 게 아니라 검토 대역폭으로 이동했습니다.** 제가 한 레인을 보는 동안 나머지 둘은 대기했고, 레인의 시야가 좁아 중복 구현과 죽은 코드가 나왔습니다.',
          },
          {
            kind: 'quote',
            body: '병렬화의 이득은 명확했지만 공짜가 아니었고, 그 비용을 문서로 남긴 것이 이 프로젝트에서 가장 값이 나간 작업이었습니다.',
          },
          {
            kind: 'text',
            body: '다음에는 레인부터 늘리지 않고, **에이전트가 보고까지 오는 시간과 내가 검토하는 시간을 먼저 재겠습니다.** 후자가 크면 레인을 늘려도 대기열만 길어집니다.',
          },
        ],
      },
      {
        no: '03',
        title: '권한을 상수로 뒀던 것이 실수였다',
        blocks: [
          {
            kind: 'text',
            body: '일정이 급해지며 조율 세션의 권한을 계속 넓혔습니다. Opus로 운용하는 동안은 문제가 없었는데, **토큰이 부족해 모델을 낮추자 지시하지 않은 범위까지 수정된 채로 머지·배포됐습니다.**',
          },
          {
            kind: 'text',
            body: '처음에는 "약한 모델에 권한을 너무 줬다"고 정리했는데 정확하지 않았습니다. **결함은 권한이 모델과 무관하게 고정돼 있었다는 점입니다.** 신뢰의 근거가 사라졌는데 신뢰의 결과만 남아 있었던 겁니다.',
          },
          {
            kind: 'quote',
            body: '이후로는 권한을 상수가 아니라 실행 주체에 종속된 값으로 다룹니다.',
          },
        ],
      },
      {
        no: '04',
        title: '남은 것과 남긴 것',
        blocks: [
          {
            kind: 'text',
            body: '도구를 Codex로 옮겼을 때 재작성한 것은 커맨드 정의뿐이었습니다. 규칙과 절차는 문서로 남아 있어 그대로 따라왔습니다. **자산은 도구가 아니라 하네스였습니다.**',
          },
          {
            kind: 'list',
            items: [
              '**반응형** — PC 기준으로만 검증했습니다',
              '**폰트 로딩** — 서브셋 파이프라인을 구성하려다 라이선스 문제로 중단했습니다',
              '**AI 응답 대기** — 스피너 외의 로딩 경험 설계는 일정상 다루지 못했습니다',
            ],
          },
          {
            kind: 'text',
            body: '셋 다 인지하고 우선순위에서 밀어낸 것이지, 놓친 것은 아닙니다.',
          },
        ],
      },
      {
        no: '05',
        title: '기여의 범위',
        blocks: [
          {
            kind: 'text',
            body: '저장소 커밋 대부분이 제 작업이지만, **코드의 상당 부분은 제가 직접 타이핑한 것이 아니라 에이전트가 생성한 것**입니다.',
          },
          {
            kind: 'table',
            head: ['제가 결정한 것', '에이전트가 생성한 것'],
            rows: [
              ['규칙 문서를 먼저 만들고 착수한다', '규칙 문서의 문장'],
              ['`git worktree`로 레인을 나눈다', '각 레인의 구현 코드'],
              ['커밋 전 보고를 관문으로 둔다', '인증 재발급·상태 관리 구현'],
              ['권한을 넓혔다가 되돌린다', '트러블슈팅 문서 본문'],
              ['무엇을 기록할지, 언제 멈출지', ''],
            ],
          },
          {
            kind: 'quote',
            body: '구현 세부의 설계자는 제가 아닙니다. 오케스트레이션 구조의 설계자는 저입니다.',
          },
        ],
      },
    ],
  },

  {
    slug: 'formabridge',
    name: 'formalBridge',
    tagline: '좋아하는 음악을 기록하는 서비스',
    year: '2025',
    period: '2025.04–11',
    team: '4인',
    role: '풀스택',
    context: '사이드 프로젝트',
    accent: '#2f6f5e',
    summary:
      '워크플로 한 줄을 고치고 결과를 보기까지 몇 시간이 걸렸다. 리뷰 대기가 반복 주기를 지배하는 구조에서는 원인을 좁힐 수 없어서, 개인 저장소에 같은 조건을 재현해 검증 환경을 따로 만들었다.',
    metrics: [
      { value: '80분', label: '8회 실행 (팀 저장소였다면 며칠)' },
      { value: '30시간', label: '최종 통합' },
      { value: '5', label: '배치 안전장치' },
    ],
    stack: ['Remix', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions'],
    links: [
      { label: '저장소', href: 'https://github.com/formalBridge/project_alpha' },
      {
        label: '전체 기록',
        href: 'https://github.com/TrossYou/portfolio/blob/main/formabridge.md',
      },
    ],
    note: '담당 — 인증(Google OAuth + JWT) · Spotify 연동 · 팔로우 · 반응형 UI · 배치 파이프라인 · 배포 워크플로',
    chapters: [
      {
        no: '01',
        title: '스크립트만 올리면 배포까지 끝나게 만들었다',
        blocks: [
          {
            kind: 'lead',
            body: '첫 요구는 곡 레코드에 Spotify ID를 채우는 일회성 작업이었지만, 비슷한 일괄 작업이 계속 생길 것이 분명했습니다. 그래서 스크립트 하나를 돌리는 대신 **배치를 추가하는 절차 자체**를 만들었습니다.',
          },
          {
            kind: 'code',
            lang: 'text',
            body: `scripts/에 TS 파일 작성 → push
  → Build Batch Image (tsup 번들 → GHCR, 태그: sha-<commit>)
    → Deploy And Run Batch Job (K8s Job 실행 → 완료 대기 → 로그)`,
          },
          {
            kind: 'text',
            body: '핵심은 **범용 실행기**입니다. `job-runner.ts`가 `JOB_NAME`으로 받은 경로의 모듈을 동적 import해 실행하고, `JOB_NAME`은 파일 경로에서 자동으로 결정됩니다. 다음 배치를 추가할 때 워크플로·Dockerfile·매니페스트를 손댈 필요가 없습니다.',
          },
        ],
      },
      {
        no: '02',
        title: '되돌릴 수 없는 작업에 DRY RUN을 먼저 붙였다',
        blocks: [
          {
            kind: 'text',
            body: '이 배치는 컬럼 추가 이전 레코드의 공백을 소급해 채우는 작업이었는데, **매칭이 틀려도 티가 안 났습니다.** 구현이 검색 결과의 첫 번째를 그대로 쓰기 때문에 동명이곡·커버가 상위에 오면 엉뚱한 ID가 박힙니다.',
          },
          {
            kind: 'text',
            body: '위험한 이유는 **화면 표시 경로가 `spotifyId` 유무로 갈리기 때문**입니다. 값이 있으면 Spotify 임베드를 렌더하고 DB 필드는 쓰지 않습니다. 컬럼 하나가 채워지는 순간 표시가 전환되고, 잘못된 ID면 **엉뚱한 곡의 플레이어가 뜹니다.**',
          },
          {
            kind: 'code',
            lang: 'text',
            body: `[91/100] Processing: "예술이야" by "싸이"
[DRY] would update songId=92 spotifyId=7rPEpMvt602Np1i7TFk3Hc`,
          },
          {
            kind: 'text',
            body: '**기본값을 시뮬레이션 쪽에 두어**, 설정을 빠뜨렸을 때 데이터가 바뀌지 않는 방향으로 실패하게 했습니다. 그 밖에 접속 대상 출력, 재실행 안전성(`spotifyId: null` 조건), 접속 정보 마스킹, 레이트리밋과 건별 `try/catch`를 넣었습니다.',
          },
        ],
      },
      {
        no: '03',
        title: '30시간의 실제 원인',
        blocks: [
          {
            kind: 'code',
            lang: 'text',
            body: `워크플로가 main push에서만 트리거됨
  → main은 브랜치 보호 + 리뷰 필수
    → 새벽, 리뷰해줄 사람이 없음
      → 머지 불가 → 검증 불가 → 한 사이클에 몇 시간`,
          },
          {
            kind: 'text',
            body: '개인 저장소에 fork를 만들어 같은 조건을 재현했습니다. 브랜치 보호가 없으니 직접 push하고 `workflow_dispatch`로 즉시 실행할 수 있었습니다. **80분 동안 8회 실행** — 팀 저장소에서였다면 며칠이 걸렸을 사이클입니다.',
          },
          {
            kind: 'text',
            body: '그런데도 최종 통합에 30시간이 걸렸습니다. 시간을 잡아먹은 것은 난이도가 아니라 **원인을 볼 수 있는 수단이 없었던 것**입니다. 템플릿에 환경변수를 치환해 매니페스트를 만드는 구조인데 치환 결과를 볼 수 없으니, `apply` 실패의 원인이 템플릿인지 변수인지 구분할 수 없었습니다.',
          },
          {
            kind: 'code',
            lang: 'bash',
            body: `envsubst < k8s/jobs/batch-job-template.yml > .out/job.yaml
echo "--- Rendered manifest ---"
cat .out/job.yaml`,
          },
          {
            kind: 'quote',
            body: '관측 수단을 먼저 만들지 않고 시도 횟수로 밀어붙인 것이 30시간의 실제 원인이었습니다.',
          },
        ],
      },
      {
        no: '04',
        title: '지금이라면 다르게 할 것',
        blocks: [
          {
            kind: 'list',
            items: [
              '**자격증명을 개인 저장소에 두지 않는다.** fork Secret에 팀 클러스터 `KUBECONFIG`를 넣어 검증했습니다. 팀 인프라 자격증명이 팀의 접근 통제 밖에 놓인 잘못된 선택이었습니다',
              '**로그의 credential 취급을 일관되게 한다.** DB 접속 문자열은 마스킹해놓고 Spotify 토큰은 매 반복 그대로 출력하고 있었습니다. 인식이 없었던 게 아니라 한 곳에 적용하지 못한 누락입니다',
              '**AI 사용 방식을 바꿨다.** 여기서는 "이 에러 고쳐줘" 식으로 썼고, 왜 그렇게 동작하는지 설명할 수 없는 코드가 남았습니다. PinLog에서 반대로 접근한 이유가 이 프로젝트에 있습니다',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'sorizip',
    name: 'Sorizip',
    tagline: '중고 악기 거래 플랫폼',
    year: '2025',
    period: '2025.11 · 1개월',
    team: '3인',
    role: '인증 · 게시글',
    context: '숭실대학교 웹프로그래밍',
    accent: '#3a5ba0',
    summary:
      '처음 접한 JSP/Servlet 스택을 커밋 기준 6일 만에 익혀 담당 기능을 구현했다. 기능이 끝난 뒤에도 header 컴포넌트를 분리하고 CSS를 정리했다.',
    metrics: [
      { value: '6일', label: '새 스택 습득 → 기능 완료' },
      { value: '13/64', label: '담당 커밋' },
      { value: 'A+', label: '전공 과목 최종 (98점)' },
    ],
    stack: ['Java 17', 'JSP', 'Servlet', 'Tomcat 10.1', 'MySQL', 'HikariCP'],
    links: [{ label: '저장소', href: 'https://github.com/dongcheolpark/sorizip' }],
    chapters: [
      {
        no: '01',
        title: '처음 보는 스택을 6일 만에',
        blocks: [
          {
            kind: 'lead',
            body: 'JSP/Servlet은 이 과목에서 처음 접했습니다. 커밋 기록 기준 첫 커밋에서 담당 기능 완료까지 6일이 걸렸습니다.',
          },
          {
            kind: 'list',
            items: [
              '세션 기반 회원가입·로그인·로그아웃 (Servlet)',
              '게시글 수정·삭제, 이미지 업로드',
              '`returnUrl` 무한 누적 버그 발견·수정',
            ],
          },
          {
            kind: 'text',
            body: '기능이 동작한 뒤에도 요구사항에 없던 정리를 했습니다. 페이지마다 복사돼 있던 header를 컴포넌트로 분리하고, 이름만 다르고 내용이 겹치던 CSS 파일을 합쳤습니다. 여기서 익힌 세션 기반 인증은 이후 formalBridge에서 JWT로 옮겨가는 과정을 이해하는 바탕이 됐습니다.',
          },
        ],
      },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
