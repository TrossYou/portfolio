/**
 * 프로젝트 사실의 원본. 서술은 case-studies/*.md 에 있고, 여기에는 사실만 둔다.
 * 숫자에는 출처가 따라붙는다. 출처를 적을 수 없는 숫자는 싣지 않는다.
 */

export type Metric = {
  /** 히어로 등 다른 곳에서 이 숫자를 가리킬 때 쓰는 이름 */
  key?: string;
  /** 강조할 값 하나. 예: "510" */
  value: string;
  /** 전후 비교의 이전 값. 예: "913ms" */
  from?: string;
  /** 분모. 예: "/ 692" */
  of?: string;
  /** 단위. 예: "ms", "건" */
  unit?: string;
  label: string;
  source: string;
};

export type ProjectTag = { label: string; accent?: boolean };

/** 화면 캡처 한 장. dummy 는 더미 데이터로 찍은 화면 */
export type Screen = { src: string; alt: string; caption?: string; dummy?: boolean };

export type Project = {
  slug: string;
  name: string;
  /** 서비스 한 줄 소개. 이름보다 위에 온다 */
  tagline: string;
  /** 카드에 쓰는 한 문장. 평범한 문장으로 */
  summary?: string;
  /** 메타 줄 순서: 기간 · 기간 길이 · 인원 · 맥락 · 역할 */
  period: string;
  duration?: string;
  team: string;
  context: string;
  role: string;
  tags: ProjectTag[];
  /** 대표 셋. 홈에서 화면 · 숫자가 붙은 큰 카드로 그린다 */
  featured?: boolean;
  /** 프로젝트 페이지 머리의 키워드 셋 */
  keywords?: string[];
  /** 첫 장이 대표 화면. 나머지는 프로젝트 페이지에서 작게 */
  screens?: Screen[];
  /** 저장소가 비공개인 프로젝트는 repo 를 비운다 */
  links: { live?: string; demo?: string; repo?: string };
  /** 링크 옆에 붙는 짧은 설명 */
  linkNotes?: { live?: string; demo?: string };
  /** case-studies/<file>.md. 없으면 상세 페이지가 없다 */
  caseStudy?: string;
  /** 상세 머리의 사실 격자 */
  meta: { label: string; value: string }[];
  /** 앞의 둘이 홈 카드에 오른다 */
  metrics: Metric[];
  /** 작업량. 성과 숫자와 섞지 않고 따로 그린다 */
  scale?: Metric[];
  stack: string[];
  /** 스택 아래 한 줄. 고른 이유나 조건 */
  stackNote?: string;
};

export const metaLine = (p: Pick<Project, 'period' | 'duration' | 'team' | 'context' | 'role'>) =>
  [p.period, p.duration, p.team, p.context, p.role].filter(Boolean).join(' · ');

export const projects: Project[] = [
  {
    slug: 'glocare',
    name: '글로케어',
    tagline: '외국인 요양보호사의 교육부터 취업까지 한 곳에서 돕는 서비스',
    summary:
      '직원이 수동으로 입력하던 관리자 화면을 결제 · 배정 기록과 연결된 어드민으로 다시 만드는 일을 팀원 한 명과 맡았고, 팀의 dev 서버와 CI도 담당했습니다.',
    period: '2026.10–11',
    duration: '6주',
    team: '6인',
    context: 'SSAFY 자율 · 기업 연계',
    role: '어드민 · 인프라',
    tags: [{ label: '런칭 예정', accent: true }, { label: 'SSAFY 기업 연계' }],
    featured: true,
    keywords: ['업무 데이터 연결', 'AI 에이전트 운영', 'dev 서버 · CI'],
    screens: [
      {
        src: 'glocare/admin-student-after.jpg',
        alt: '글로케어 어드민 교육생 상세 화면. 진행 단계가 결제 · 배정 기록으로 판정되어 왼쪽에 표시됨',
        caption: '어드민 교육생 상세',
        dummy: true,
      },
      {
        src: 'glocare/admin-student-before.jpg',
        alt: '같은 교육생 상세 화면의 이전 판',
        caption: '교육생 상세의 이전 판',
        dummy: true,
      },
      {
        src: 'glocare/admin-stats.jpg',
        alt: '어드민 대시보드 통계 탭. 기간을 골라 보는 운영 지표',
        caption: '대시보드 통계 탭',
        dummy: true,
      },
      {
        src: 'glocare/platform-home-1440.jpg',
        alt: '팀이 만든 리뉴얼 교육생 웹 첫 화면',
        caption: '팀이 만든 교육생 웹(리뉴얼 시연)',
      },
    ],
    links: {
      demo: 'https://k15a401.p.ssafy.io/',
    },
    linkNotes: {
      demo: '리뉴얼 시연 · 팀이 만든 교육생 웹',
    },
    caseStudy: 'glocare',
    meta: [
      { label: '기간', value: '2026.10.06 – 11.18' },
      { label: '역할', value: '어드민 개발 · dev 서버 · CI' },
      { label: '규모', value: '6인 · 어드민 2' },
      { label: '작업 규모', value: '머지된 MR 285건 · Jira 완료 201건' },
    ],
    metrics: [
      {
        key: 'glocare-stage',
        value: '0',
        from: '14',
        unit: '칸',
        label: '직원이 수동으로 켜던 진행 단계 칸. 결제 · 배정 기록으로 자동 판정',
        source: '옛 관리자와 새 어드민 코드를 읽어 셈, 2026.11',
      },
      {
        key: 'glocare-dashboard',
        value: '659',
        from: '1,300',
        unit: 'ms',
        label: '배포 사이트 대시보드 첫 화면 문서 응답',
        source: '같은 브라우저 · 계정, 전 3회 · 후 10회 중앙값, 2026.11',
      },
      {
        value: '2',
        from: '74',
        unit: '클릭',
        label: '학습이 멈춘 교육생 찾기',
        source: 'dev 어드민 · 같은 관리자 계정, 전후 각 1회, 2026.11',
      },
      {
        value: '1',
        from: '4',
        unit: '클릭',
        label: '교육생 상세에서 문자 보내기',
        source: 'dev 어드민 · 같은 교육생, 3회 중앙값, 2026.11',
      },
      {
        value: '3',
        from: '12',
        of: '/ 63',
        label: '휴대폰(375px)에서 가로로 넘치는 어드민 화면',
        source: '어드민 화면 63개를 375px로 열어 셈, 2026.11',
      },
      {
        value: '122',
        from: '181',
        unit: '초',
        label: 'CI 파이프라인 전체 시간. 검사 러너 동시 실행 수를 늘린 뒤',
        source: 'GitLab 파이프라인 두 번의 기록 비교, 2026.10',
      },
    ],
    scale: [
      {
        key: 'glocare-mr',
        value: '285',
        unit: '건',
        label: '내가 올려 머지된 MR. 팀 전체 1,246건',
        source: 'SSAFY GitLab, 2026.10.19 – 11.20 머지분, 11.20 조회',
      },
      {
        key: 'glocare-review',
        value: '193',
        unit: '건',
        label: '리뷰어로 들어간 머지 MR',
        source: 'SSAFY GitLab, 2026.11.20 조회',
      },
      {
        key: 'glocare-jira',
        value: '201',
        unit: '건',
        label: '완료한 Jira 티켓. 팀 전체 831건',
        source: 'Jira, 2026.11.20 조회',
      },
      {
        key: 'glocare-reviewdoc',
        value: '129',
        unit: '건',
        label: '리뷰 기록 문서',
        source: '작업 문서 폴더 파일 수, 2026.10.28 – 11.17',
      },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Zod', 'Docker', 'nginx', 'GitLab CI'],
    stackNote: 'Next.js · Supabase · Vercel은 기업이 요구한 스펙이고 개발 기간에는 SSAFY 서버를 dev 서버로 따로 구성해 씀',
  },
  {
    slug: 'finch',
    name: 'FINCH',
    tagline: '내 계좌와 성향을 읽고 투자 판단을 돕는 AI 비서가 있는 증권 앱',
    summary: '프론트엔드 구현 전반을 맡아 종목 상세 · 주문 · AI 채팅 화면과 API 계약 문서 · 목 서버를 만들었습니다.',
    period: '2026.08–09',
    duration: '6주',
    team: '5인',
    context: 'SSAFY 특화',
    role: '프론트엔드 구현 전반',
    tags: [{ label: 'SSAFY 특화' }],
    featured: true,
    keywords: ['실시간 시세 화면', 'API 계약 · 목 서버', '파트 간 소통'],
    screens: [
      { src: 'finch-banner.png', alt: 'FINCH 배너' },
      { src: 'finch-stock-detail.gif', alt: 'FINCH 종목 상세 화면', caption: '종목 상세' },
      { src: 'finch-order.gif', alt: 'FINCH 주문 화면', caption: '시장가 주문' },
      { src: 'finch-ai-chat.gif', alt: 'FINCH AI 채팅 화면', caption: 'AI 채팅' },
    ],
    links: {
      live: 'https://finchapp.org',
      demo: 'https://youtu.be/4Cbu0-vMve4',
      repo: 'https://github.com/Team-FINCH/finch-frontend',
    },
    caseStudy: 'finch',
    meta: [
      { label: '기간', value: '2026.08.19 – 09.28' },
      { label: '역할', value: '프론트엔드 구현 전반' },
      { label: '규모', value: '5인 · FE 2' },
      { label: '기여', value: 'FE 커밋 510 / 692' },
    ],
    metrics: [
      {
        key: 'finch-commits',
        value: '510',
        of: '/ 692',
        label: '프론트엔드 영역 커밋 (74%)',
        source: 'finch-frontend 저장소, 2026.09.28 기준',
      },
      { value: '105', unit: '건', label: '파트 간 문의 이슈 (팀 5인 전원 작성)', source: 'FINCH GitLab 이슈 보드, 2026.08.21 – 09.24 (5주), 봇 1건 제외' },
      { value: '156', of: '/ 204', label: 'master에 머지된 작업 브랜치 (76%)', source: 'finch-frontend 저장소, 2026.09.28 기준' },
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'TanStack Query', 'Zustand', 'Zod', 'MSW', 'lightweight-charts', 'Tailwind CSS'],
  },
  {
    slug: 'pinlog',
    name: 'PinLog',
    tagline: '장소 이름이 기억나지 않아도 경험과 감정으로 다시 찾는 AI 장소 기록 서비스',
    summary: '지도 기반 기록 · 자연어 검색 결과 · 컬렉션 피드 화면을 맡았고, 검색 결과가 뜰 때 서체가 바뀌던 깜빡임은 미리 받는 안을 제안하고 측정으로 확인했습니다.',
    period: '2026.07–08',
    duration: '5주',
    team: '6인',
    context: 'SSAFY 공통',
    role: '프론트엔드 기능 구현',
    tags: [{ label: 'SSAFY 공통' }],
    featured: true,
    keywords: ['자연어 검색 화면', '서체 로딩', '토큰 재발급'],
    screens: [
      { src: 'pinlog-home.jpg', alt: 'PinLog 홈 화면' },
      { src: 'pinlog-search-result.jpg', alt: 'PinLog 자연어 검색 결과 화면', caption: '자연어 검색 결과' },
      { src: 'pinlog-feed.jpg', alt: 'PinLog 컬렉션 피드 화면', caption: '컬렉션 피드' },
    ],
    links: {
      demo: 'https://youtu.be/lD5MbHL9TZ8',
      repo: 'https://github.com/Team-PinLog/front',
    },
    caseStudy: 'pinlog',
    meta: [
      { label: '기간', value: '2026.07 – 08' },
      { label: '역할', value: '프론트엔드 기능 구현' },
      { label: '규모', value: '6인' },
      { label: '기여', value: 'FE 커밋 178 / 206' },
    ],
    metrics: [
      {
        value: '806',
        unit: 'ms',
        label: '검색 결과가 뜨기 전에 손글씨 서체를 준비해 둔 시간. 전에는 결과보다 약 11ms 늦었음',
        source: 'Chrome 성능 패널 측정',
      },
      { value: '178', of: '/ 206', label: '프론트엔드 저장소 커밋 (86%)', source: 'Team-PinLog/front 저장소' },
      {
        value: '149',
        from: '913ms',
        unit: 'ms',
        label: '페이지 진입 후 서체 요청 시점',
        source: 'Chrome 성능 패널 측정',
      },
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'TanStack Router', 'TanStack Query', 'Tailwind CSS', 'Zod', 'Vitest'],
  },
  {
    slug: 'formabridge',
    name: 'formabridge',
    tagline: '좋아하는 음악을 기록하는 음악 SNS 서비스',
    period: '2025.03–11',
    team: '4인',
    context: 'K-PaaS 공모전',
    role: '풀스택 · 배치 자동화',
    tags: [{ label: 'K-PaaS 공모전' }],
    links: { repo: 'https://github.com/formalBridge/project_alpha' },
    caseStudy: 'formabridge',
    meta: [
      { label: '기간', value: '2025.03 – 11' },
      { label: '역할', value: '풀스택 · 배치 자동화' },
      { label: '규모', value: '4인' },
      { label: '기여', value: '담당 커밋 53 / 184' },
    ],
    metrics: [
      { value: '53', of: '/ 184', label: '담당 커밋 (29%)', source: 'project_alpha main, 머지 커밋 제외. 2026.10.01 집계' },
      { value: '54', unit: '건', label: '머지된 PR. 전체 186건 중', source: 'project_alpha PR 목록. 2026.10.01 집계' },
    ],
    stack: ['Remix', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    slug: 'sorizip',
    name: 'Sorizip',
    tagline: '중고 악기 거래 플랫폼',
    period: '2025.11',
    team: '3인',
    context: '숭실대 웹프로그래밍',
    role: '회원 인증 · 게시글',
    tags: [{ label: '수업' }],
    links: { repo: 'https://github.com/dongcheolpark/sorizip' },
    meta: [
      { label: '기간', value: '2025.11' },
      { label: '역할', value: '회원 인증 · 게시글 관리' },
      { label: '규모', value: '3인' },
      { label: '기여', value: '담당 커밋 13 / 66' },
    ],
    metrics: [
      { value: '6', unit: '일', label: '첫 커밋에서 담당 기능 완료까지', source: 'sorizip 커밋 기록, 2025.11.24 – 30' },
      { value: '13', of: '/ 66', label: '담당 커밋', source: 'sorizip main, 머지 커밋 제외. 2026.10.01 집계' },
    ],
    stack: ['Java 17', 'JSP', 'Servlet', 'Tomcat', 'MySQL', 'HikariCP'],
  },
];

/** key 로 숫자 하나를 찾는다. 히어로 · 에이전트 운영 섹션이 프로젝트 숫자를 다시 적지 않고 가리킨다 */
export function findMetric(key: string): Metric | undefined {
  for (const p of projects) {
    const m = [...p.metrics, ...(p.scale ?? [])].find((x) => x.key === key);
    if (m) return m;
  }
  return undefined;
}

/** 프로젝트가 아닌 글. 가로지르는 기록 */
export type Note = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  context: string;
  caseStudy: string;
};

export const notes: Note[] = [
  {
    slug: 'harness',
    name: '에이전트 하네스',
    tagline: 'AI 코딩 에이전트에게 일을 맡기되, 판단은 사람이 하는 운영 방식',
    period: '2026.07–',
    context: '개인 · PinLog에서 시작해 FINCH · 글로케어까지',
    caseStudy: 'harness',
  },
];

/** 상세 페이지 이전·다음 순서. 케이스 스터디가 있는 프로젝트만 */
export const caseStudyOrder = ['glocare', 'finch', 'pinlog', 'formabridge'];
