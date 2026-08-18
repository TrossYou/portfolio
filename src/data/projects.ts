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
      '팀 6인 중 프론트엔드를 혼자 맡아 지도·검색·피드·인증 화면을 구현했다. 5주 안에 기획부터 발표까지 끝내야 해서 구현과 병행할 수 있도록 에이전트 작업 규칙과 검증 관문도 함께 만들었다.',
    metrics: [
      { value: '806ms', label: '폰트 준비 시점 앞당김' },
      { value: '178/206', label: '프론트엔드 저장소 커밋' },
      { value: '5주', label: '기획–구현–발표' },
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Router/Query',
      'Tailwind CSS',
      'Zod',
      'React Hook Form',
      'Vitest',
    ],
    links: [
      { label: '시연 영상', href: 'https://youtu.be/lD5MbHL9TZ8' },
      { label: '저장소', href: 'https://github.com/Team-PinLog/front' },
    ],
    note: '서비스는 2026.08 배포 종료. 화면은 종료 직전 기록입니다.',
    chapters: [
      {
        no: '01',
        title: '무엇을 만들었나',
        blocks: [
          {
            kind: 'lead',
            body: '팀 6인 중 프론트엔드를 혼자 맡았습니다. 프론트엔드 저장소 커밋 206건 중 178건이 제 작업입니다.',
          },
          {
            kind: 'list',
            items: [
              '**자연어 검색** — 저장해둔 맥락을 문장으로 다시 찾는 화면. 서비스의 핵심 기능',
              '**장소 추가** — 사진에서 장소를 추출하는 경로와 검색으로 찾는 경로 두 가지',
              '**지도와 레코드** — 마커에서 레코드 상세로 이어지는 흐름',
              '**피드·라이브러리·컬렉션** — 레코드 저장과 팔로우',
              '**인증** — 토큰 만료 시 재발급 처리',
            ],
          },
          {
            kind: 'text',
            body: 'UI/UX는 동료가 담당했고 목업을 기준으로 API·라우팅·기능을 구현했습니다. 마감 1.5주 전에 디자인 개편이 결정된 뒤로는 화면 개선에도 직접 참여했습니다.',
          },
        ],
      },
      {
        no: '02',
        title: '구현하면서 부딪힌 것',
        blocks: [
          {
            kind: 'text',
            body: '**손글씨체가 늦게 도착했다.** 검색 결과에 쓰는 웹폰트가 화면이 그려진 뒤에 적용돼 글자가 한 번 바뀌어 보였습니다. 폰트 요청을 검색창에 포커스가 들어가는 시점으로 앞당겨 폰트 준비가 결과 렌더보다 806ms 먼저 끝나게 했습니다. 요청 시작 시점을 913ms에서 149ms로 옮겼습니다.',
          },
          {
            kind: 'text',
            body: '**토큰이 만료되면 재발급이 여러 번 나갔다.** 화면 하나에서 API를 동시에 여러 개 호출하는데, 만료 시점에 그 요청들이 한꺼번에 401을 받으면 재발급도 그만큼 나갔습니다. 진행 중인 재발급이 있으면 뒤따르는 요청이 그 결과를 기다렸다가 재시도하도록 바꿨습니다. 동시 요청 상황을 Vitest 4건으로 확인했습니다.',
          },
          {
            kind: 'text',
            body: '**레코드를 만들어도 지도가 그대로였다.** 생성·삭제 후 지도와 컬렉션 화면이 예전 데이터를 그대로 보여줬습니다. 어떤 요청이 어떤 화면의 캐시를 무효화해야 하는지 mutation 단위로 정리했습니다.',
          },
        ],
      },
      {
        no: '03',
        title: '레인이 겹치면 충돌한다',
        blocks: [
          {
            kind: 'text',
            body: '혼자서 5주를 감당하려고 `git worktree`로 작업 레인을 여러 개 띄워 병렬로 진행했습니다. 처음에는 기능 단위로 나눴는데, 서로 다른 기능이 같은 파일을 건드리면서 충돌이 3건 났습니다.',
          },
          {
            kind: 'text',
            body: '레인을 나누는 기준을 기능이 아니라 **파일 소유권**으로 바꿨습니다. 한 파일은 한 레인만 건드리도록 미리 갈라두는 방식입니다. 이후 올린 PR 3건은 서로 겹치는 파일이 없었습니다.',
          },
          {
            kind: 'quote',
            body: '충돌은 레인을 몇 개 띄웠느냐가 아니라 레인끼리 같은 파일을 잡느냐에서 나왔습니다.',
          },
        ],
      },
      {
        no: '04',
        title: '규칙을 먼저 적어두고 시작했다',
        blocks: [
          {
            kind: 'text',
            body: '코드를 전부 직접 쓰는 선택지가 일정상 없었습니다. 그래서 에이전트가 지킬 규칙을 `AGENTS.md`에, 작업 절차를 `docs/conventions.md`에 적어두고 시작했습니다. lint·typecheck·build·test를 통과해야 이미지가 빌드되도록 CI도 걸었습니다.',
          },
          {
            kind: 'text',
            body: '규칙은 처음부터 있던 게 아니라 문제가 터질 때마다 붙였습니다. "프론트는 토큰을 저장하지 않는다"를 에이전트가 **"재발급 로직을 만들지 말라"로 읽어서** 401 복구가 통째로 빠진 적이 있습니다.',
          },
          {
            kind: 'text',
            body: '규칙 문장을 고치는 대신, 금지 옆에 **허용되는 인접 행위를 같이 적는 형식**으로 바꿨습니다. 재발급은 하되 토큰 값을 읽거나 보관하지 않는다는 두 문장을 한 항목에 붙였습니다. 같은 오독은 다시 나오지 않았습니다.',
          },
          {
            kind: 'text',
            body: '해결한 문제는 `docs/troubleshooting/`에 남겨 다음 세션이 먼저 읽게 했습니다. 프로젝트 중반에 도구를 Codex로 옮겼을 때 다시 쓴 것은 커맨드 정의뿐이었고, 규칙과 절차는 문서에 있어서 그대로 따라왔습니다.',
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
              ['규칙과 절차를 먼저 적고 착수한다', '규칙 문서의 문장'],
              ['레인을 파일 소유권으로 가른다', '각 레인의 구현 코드'],
              ['커밋 전 보고를 관문으로 둔다', '재발급·상태 관리 구현'],
              ['무엇을 기록할지, 언제 멈출지', '트러블슈팅 문서 본문'],
            ],
          },
          {
            kind: 'text',
            body: '초반에는 에이전트가 구조까지 잡아준 탓에 코드를 이해하는 속도가 산출물이 나오는 속도를 못 따라갔습니다. 후반에 구조를 따로 읽어 격차를 좁혔고, 다음에는 생성된 코드를 그 자리에서 읽는 것을 절차에 넣으려고 합니다.',
          },
        ],
      },
      {
        no: '06',
        title: '남겨둔 것',
        blocks: [
          {
            kind: 'list',
            items: [
              '**반응형** — PC 기준으로만 확인했습니다',
              '**폰트 서브셋** — WOFF2 파이프라인을 만들려다 라이선스 문제로 멈췄고 대체안을 넣을 시간이 없었습니다',
              '**AI 응답 대기** — 자연어 검색과 사진 기반 장소 추출은 응답에 몇 초가 걸립니다. 스피너 말고 다른 방법은 손대지 못했습니다',
            ],
          },
          {
            kind: 'text',
            body: '셋 다 알고 있었지만 순서에서 뒤로 밀었습니다.',
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
      '학부 동기 4인과 기능 단위로 나눠 맡았다. 인증, 팔로우, Spotify 연동, 그리고 컬럼이 추가되기 전에 쌓여 있던 데이터를 채우는 배치를 담당했다.',
    metrics: [
      { value: '2회', label: '인증 구조 재구성' },
      { value: '5개', label: '팔로우 기능 PR 분할' },
      { value: '53/186', label: '담당 커밋' },
    ],
    stack: ['Remix', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'GitHub Actions'],
    links: [{ label: '저장소', href: 'https://github.com/formalBridge/project_alpha' }],
    note: '담당 — 인증 · 팔로우 · Spotify 연동 · 데이터 백필',
    chapters: [
      {
        no: '01',
        title: '인증을 두 번 갈아엎었다',
        blocks: [
          {
            kind: 'lead',
            body: 'Google 로그인을 처음에는 클라이언트에서 처리했다가, 서버 세션으로 옮기고, 다시 JWT로 바꿨습니다. 두 번 다시 만들었고 처음 구현은 직접 지웠습니다.',
          },
          {
            kind: 'text',
            body: '되돌아보면 인증을 어디서 들고 있어야 하는지를 모르는 채로 시작한 것이 원인이었습니다. 클라이언트에 두면 서버가 요청자를 믿을 근거가 없고, 세션으로 옮기면 서버가 상태를 들고 있어야 합니다. 세 번째에서야 그 차이를 알고 골랐습니다.',
          },
        ],
      },
      {
        no: '02',
        title: '팔로우 기능을 PR 5개로 쪼갰다',
        blocks: [
          {
            kind: 'text',
            body: '팔로우는 데이터 모델부터 화면까지 한 번에 걸리는 기능이라 모델 · 서비스 · 로더 · UI · 목록 다섯 단계로 나눠 PR을 따로 올렸습니다.',
          },
          {
            kind: 'text',
            body: '한 덩어리로 올렸으면 리뷰가 늦어졌을 것이고, 어디서 잘못됐는지 찾기도 어려웠을 겁니다. 나눠 올리니 앞 단계가 머지된 상태에서 다음 단계를 얹을 수 있었습니다.',
          },
        ],
      },
      {
        no: '03',
        title: 'Spotify 데이터를 복제하지 않았다',
        blocks: [
          {
            kind: 'text',
            body: '곡 정보를 우리 DB에 통째로 복사해두는 대신 **참조 키만 저장하고, 화면에 그릴 때 Spotify oEmbed로 받아오는 방식**을 골랐습니다. 제목·아티스트를 복제해두면 원본이 바뀌었을 때 우리 쪽이 낡은 값을 들고 있게 됩니다.',
          },
          {
            kind: 'text',
            body: '대신 표시 경로가 참조 키 유무로 갈립니다. 키가 있으면 임베드 플레이어가 뜨고, 없으면 DB에 있는 제목·아티스트를 그대로 보여줍니다.',
          },
        ],
      },
      {
        no: '04',
        title: '컬럼을 추가하기 전 데이터를 채웠다',
        blocks: [
          {
            kind: 'text',
            body: 'Spotify 참조 키 컬럼을 추가하고, 그 뒤에 등록되는 곡은 저장 시점에 값이 채워지도록 해뒀습니다. 문제는 **그 전에 이미 쌓여 있던 레코드**였습니다. 이건 서비스 요청 흐름 안에서 처리할 수 없어서 따로 한 번 돌리는 배치로 분리했습니다.',
          },
          {
            kind: 'text',
            body: '곡 제목과 아티스트로 Spotify를 검색해 결과의 키를 가져오는 방식입니다. 그런데 검색에 넣을 제목과 아티스트를 **DB에서 제대로 읽어오고 있는지**부터 확인해야 했습니다. 여기가 어긋나면 이후 단계는 볼 것도 없습니다.',
          },
          {
            kind: 'text',
            body: '그래서 쓰기 없이 출력만 하는 모드를 먼저 만들었습니다. 어떤 곡을 어떤 값으로 조회했고 무엇이 들어갈 예정인지 한 줄씩 찍어봤습니다. 맞는 걸 확인한 다음 실제로 돌렸습니다.',
          },
          {
            kind: 'code',
            lang: 'text',
            body: `[91/100] Processing: "예술이야" by "싸이"
[DRY] would update songId=92 spotifyId=7rPEpMvt602Np1i7TFk3Hc`,
          },
          {
            kind: 'text',
            body: '기본값도 이 모드 쪽에 뒀습니다. 설정을 빠뜨린 채로 실행하면 데이터가 바뀌지 않는 쪽으로 실패합니다.',
          },
        ],
      },
      {
        no: '05',
        title: '지금이라면 다르게 할 것',
        blocks: [
          {
            kind: 'list',
            items: [
              '**자격증명을 개인 저장소에 두지 않는다.** 배치를 검증하려고 개인 fork에 팀 클러스터 접속 정보를 넣었습니다. 데이터를 바꾸지 않는 모드로 돌렸지만, 팀 인프라 자격증명이 팀의 통제 밖에 나가 있었던 건 잘못된 선택입니다',
              '**로그에서 비밀값 가리는 걸 한 곳만 하지 않는다.** DB 접속 문자열은 가려놓고 Spotify 토큰은 매번 그대로 찍고 있었습니다. 몰라서가 아니라 한 군데 빠뜨린 것이고, 그래서 사람 주의력에 맡기면 안 되는 일이었습니다',
              '**AI에게 묻는 방식을 바꿨다.** 여기서는 "이 에러 고쳐줘" 식으로 썼습니다. 동작은 했지만 왜 그런지 설명 못 하는 코드가 남았고, 같은 문제를 다시 만나면 처음부터 다시 물어야 했습니다. PinLog에서 반대로 간 이유가 여기에 있습니다',
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
      '처음 보는 JSP/Servlet으로 회원 인증과 게시글 관리를 맡았다. 첫 커밋에서 담당 기능 완료까지 6일이 걸렸다.',
    metrics: [
      { value: '6일', label: '첫 커밋 → 기능 완료' },
      { value: '13/64', label: '담당 커밋' },
      { value: 'A+', label: '과목 최종 (98점)' },
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
            body: 'JSP와 Servlet은 이 과목에서 처음 만졌습니다. 커밋 기록으로 보면 첫 커밋에서 담당 기능이 다 도는 데까지 6일이 걸렸습니다.',
          },
          {
            kind: 'list',
            items: [
              '**회원 인증** — 세션 기반 회원가입·로그인·로그아웃 (Servlet)',
              '**게시글** — 수정·삭제와 이미지 업로드',
            ],
          },
          {
            kind: 'text',
            body: '여기서 만진 세션 방식이 나중에 formalBridge에서 JWT로 옮겨갈 때 무엇이 달라지는지 이해하는 바탕이 됐습니다. 세션은 서버가 로그인 상태를 들고 있고, JWT는 토큰 자체가 그 정보를 들고 다닙니다.',
          },
        ],
      },
      {
        no: '02',
        title: '로그인 뒤 돌아갈 주소가 계속 쌓였다',
        blocks: [
          {
            kind: 'text',
            body: '로그인이 필요한 페이지에 들어가면 로그인 화면으로 보내면서 원래 주소를 `returnUrl`에 붙여 넘깁니다. 그런데 그 로그인 화면에서 다시 같은 처리가 걸리면서 `returnUrl` 안에 `returnUrl`이 들어가고, 그게 계속 겹쳐 주소가 끝없이 길어졌습니다.',
          },
          {
            kind: 'text',
            body: '이미 `returnUrl`을 달고 있는 주소는 다시 감싸지 않도록 막았습니다.',
          },
        ],
      },
      {
        no: '03',
        title: '기능이 끝난 뒤에 한 것',
        blocks: [
          {
            kind: 'text',
            body: '요구사항에는 없었지만 두 가지를 정리했습니다. 페이지마다 복사돼 있던 header를 한 곳으로 빼서 나눠 쓰게 했고, 이름만 다르고 내용이 겹치던 CSS 파일을 합쳤습니다.',
          },
          {
            kind: 'text',
            body: '팀 3인 중 인증과 게시글을 맡았고 전체 커밋 64건 중 13건이 제 작업입니다. 과목 최종 성적은 A+(98점)였습니다.',
          },
        ],
      },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
