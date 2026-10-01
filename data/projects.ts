/**
 * 프로젝트 사실의 원본. 서술은 case-studies/*.md 에 있고, 여기에는 사실만 둔다.
 * 숫자에는 출처가 따라붙는다. 출처를 적을 수 없는 숫자는 싣지 않는다.
 */

export type Metric = {
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

export type Project = {
  slug: string;
  name: string;
  /** 서비스 한 줄 소개. 이름보다 위에 온다 */
  tagline: string;
  /** 메타 줄 순서: 기간 · 기간 길이 · 인원 · 맥락 · 역할 */
  period: string;
  duration?: string;
  team: string;
  context: string;
  role: string;
  tags: ProjectTag[];
  featured?: boolean;
  /** assets/ 아래 파일 이름. 경로 접두사는 화면에서 붙인다 */
  cover?: string;
  coverAlt?: string;
  links: { live?: string; demo?: string; repo: string };
  /** case-studies/<file>.md. 없으면 상세 페이지가 없다 */
  caseStudy?: string;
  /** 상세 머리의 사실 격자 */
  meta: { label: string; value: string }[];
  metrics: Metric[];
  stack: string[];
};

export const metaLine = (p: Pick<Project, 'period' | 'duration' | 'team' | 'context' | 'role'>) =>
  [p.period, p.duration, p.team, p.context, p.role].filter(Boolean).join(' · ');

export const projects: Project[] = [
  {
    slug: 'finch',
    name: 'FINCH',
    tagline: '내 계좌와 성향을 읽고 투자 판단을 돕는 AI 비서가 있는 증권 앱',
    period: '2026.08–09',
    duration: '6주',
    team: '5인',
    context: 'SSAFY 특화',
    role: '프론트엔드 구현 전반',
    tags: [{ label: '대표 프로젝트', accent: true }, { label: 'SSAFY 특화' }],
    featured: true,
    cover: 'finch-banner.png',
    coverAlt: 'FINCH 배너',
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
      { value: '510', of: '/ 692', label: '프론트엔드 영역 커밋 (74%)', source: 'finch-frontend 저장소, 2026.09.28 기준' },
      { value: '156', of: '/ 204', label: 'master에 머지된 작업 브랜치 (76%)', source: 'finch-frontend 저장소, 2026.09.28 기준' },
      { value: '105', unit: '건', label: '파트 간 문의 정리', source: 'FINCH 문의함 문서, 6주 누적' },
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'TanStack Query', 'Zustand', 'Zod', 'MSW', 'lightweight-charts', 'Tailwind CSS'],
  },
  {
    slug: 'pinlog',
    name: 'PinLog',
    tagline: '장소 이름이 기억나지 않아도 경험과 감정으로 다시 찾는 AI 장소 기록 서비스',
    period: '2026.07–08',
    duration: '5주',
    team: '6인',
    context: 'SSAFY 공통',
    role: '프론트엔드 기능 구현',
    tags: [{ label: 'SSAFY 공통' }],
    cover: 'pinlog-home.jpg',
    coverAlt: 'PinLog 홈 화면',
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
      { value: '178', of: '/ 206', label: '프론트엔드 저장소 커밋 (86%)', source: 'Team-PinLog/front 저장소' },
      { value: '149', from: '913ms', unit: 'ms', label: '검색 결과 서체 준비 시간', source: 'Chrome 성능 패널 측정' },
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
    tagline: 'AI 코딩 에이전트에게 일을 맡기되, 판단은 사람이 쥐는 운영 방식',
    period: '2026.07–',
    context: '개인 · PinLog에서 시작해 FINCH와 취업 준비까지',
    caseStudy: 'harness',
  },
];

/** 상세 페이지 이전·다음 순서. 케이스 스터디가 있는 프로젝트만 */
export const caseStudyOrder = ['finch', 'pinlog', 'formabridge'];
