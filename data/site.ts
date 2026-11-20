/**
 * 사람 · 이력 · 에이전트 운영 · AI 에이전트 도입 전 프로젝트 · 연락처. 전부 사실이며 출처가 있다.
 * 읽기용 사본은 facts.md. 스킬은 skills.json, 타임라인은 timeline.json.
 * 숫자는 여기 다시 적지 않고 projects.ts 의 Metric key 로 가리킨다.
 */
import timelineJson from './timeline.json';

export const person = {
  name: '유승주',
  handle: 'TrossYou',
  role: '프론트엔드 개발자',
  email: 'seungju.you1@gmail.com',
  github: 'https://github.com/TrossYou',
  /** 히어로 위 한 줄 */
  kicker: '프론트엔드 개발자 · SSAFY 15기 · 숭실대 컴퓨터학부 졸업',
  /** 한 줄 소개. 모든 산출물이 같은 문구를 쓴다. 가운데 조각에만 <Mark>를 깐다 */
  intro: ['AI 코딩 에이전트를 역할별로 나눠 운영하며, ', '수동 업무를 데이터로 연결하는', ' 프론트엔드 개발자'] as const,
  lead: '기업 연계 프로젝트 글로케어에서 직원용 관리자 화면(어드민)과 dev 서버 · CI를 맡았습니다. 무엇을 만들지 정하고 에이전트가 낸 안을 검토 · 승인한 뒤 측정으로 확인했습니다.',
  /** 히어로 숫자 셋. projects.ts 의 Metric key */
  heroStats: ['glocare-stage', 'glocare-dashboard', 'finch-commits'],
  /** 이력 섹션의 사실 격자 */
  about: [
    { label: '교육', value: 'SSAFY 15기 · 2026.01–12' },
    { label: '학력', value: '숭실대학교 컴퓨터학부 졸업' },
    { label: '자격', value: '정보처리기사 · SQLD · TOPCIT 수준 3' },
  ],
};

export type TimelineKind = '교육' | '프로젝트' | '자격' | '수상' | '활동';

export type TimelineItem = {
  date: string;
  kind: TimelineKind;
  title: string;
  desc?: string;
  details?: string[];
  now?: boolean;
  href?: string;
  /** 프로필 README 타임라인 SVG 의 기간 띠. 사이트는 쓰지 않는다 */
  span?: [string, string];
};

/** 배운 순서. 과거가 위. 원본은 timeline.json — 프로필 README 의 타임라인 SVG 도 같은 파일을 읽는다 */
export const timeline: TimelineItem[] = timelineJson as TimelineItem[];

/** 홈 이력 섹션에 올리는 종류. 프로젝트는 위 섹션들이 맡는다 */
export const historyKinds: TimelineKind[] = ['교육', '자격', '수상', '활동'];

/**
 * AI 에이전트 운영. 글로케어에서 쓴 세션 구성과 관문, AI가 쓴 코드를 검증한 방법.
 * 근거: 볼트 harness/ssafy-자율-glocare 의 세션운영.md 1 · 3절, 규칙 2 · 6 · 7장, docs/C11 · C51
 */
export const agentOps = {
  lead: '글로케어 6주 동안 Claude Code 세션을 역할별로 나눠 돌렸습니다. 에이전트는 구현부터 MR · 리뷰 답글까지 하고, 되돌리기 어려운 작업은 훅이 멈추고 직접 승인합니다.',
  /** 사람 칸 */
  human: { name: '나', does: '무엇을 만들지 정하고, 관문에서 허가' },
  sessions: [
    { name: '배분 세션', count: '1', does: '새 티켓의 첫 지시를 쓰고 끝 보고를 모음' },
    { name: '감시 세션', count: '1', does: '5분마다 MR · Jira 새 소식을 보고 담당 세션에 지시' },
    { name: '리뷰 세션', count: '1', does: '팀원 MR 리뷰. 문제 줄을 코드에서 발췌해 답글' },
    { name: '기능 세션', count: '최대 5', does: '티켓 하나씩 구현 → MR → 리뷰 반영' },
  ],
  /** 사람이 쥔 관문. 훅이 이 명령에서 멈추고 허가 창을 띄운다 */
  gates: ['MR 생성 · 머지', '삭제 · force push', '배포 · 외부 공개', '의존성 추가', '담당 폴더 밖 수정'],
  /** AI가 쓴 코드를 어떻게 검증했나 */
  checks: [
    {
      title: '쓴 에이전트와 검사하는 에이전트를 나눔',
      body: 'MR을 올리기 전에 그 코드를 쓰지 않은 에이전트가 체크리스트를 돌립니다. 실패 경로의 오류 처리, 라이브러리 기본값, URL에 범위 밖 값 넣기, 새 규칙을 일부러 뚫어 보기까지 봅니다.',
    },
    {
      title: '리뷰는 코드 발췌로',
      body: '리뷰 글에는 문제 되는 줄을 파일 · 행과 함께 발췌하고, 실행해서 확인한 것과 코드만 읽고 판단한 것을 나눠 적습니다. 코드에서 확인하지 못한 추측은 달지 않습니다.',
    },
    {
      title: 'main 앞에서 CI가 한 번 더',
      body: '로컬에서는 lint · 타입 · 고친 파일의 테스트만 돌리고 전체 검사와 빌드는 MR 파이프라인이 맡습니다. 승인 · 미해결 스레드 0을 직접 조회한 뒤에만 머지합니다.',
    },
    {
      title: '맥락이 차면 인계하고 비움',
      body: '턴이 끝날 때마다 훅이 맥락 크기를 잽니다. 500k 토큰을 넘으면 인계를 적게 하고 세션을 비우며, 다시 시작한 세션은 인계 문서부터 읽고 일을 계속합니다.',
    },
  ],
  /** 리뷰 지적 수. 전 값이 없어 전후 비교가 아니다 */
  reviewStat: {
    value: '71',
    unit: '%',
    label: '체크리스트를 둔 뒤 내가 올린 어드민 MR 91개 중 리뷰 [수정 요청]이 0건인 MR. MR당 중앙값 0건',
    source: 'SSAFY GitLab 리뷰 글 머리표를 셈, 2026.10.20 – 11.10',
  },
  /** 작업 규모. projects.ts 의 Metric key */
  scale: ['glocare-mr', 'glocare-review', 'glocare-jira', 'glocare-reviewdoc'],
  scaleNote: '글로케어는 SSAFY GitLab · Jira에서 진행해 GitHub 기여 그래프에는 남지 않습니다.',
};

/** AI 에이전트 도입 전 프로젝트. 한 줄씩 */
export type HandItem = { name: string; period: string; line: string; href: string };

export const handCoded: HandItem[] = [
  {
    name: 'formabridge',
    period: '2025.03–11',
    line: '음악 기록 SNS. K-PaaS 공모전, 4인. Remix 풀스택과 Spotify ID 백필 배치',
    href: '/work/formabridge',
  },
  {
    name: 'Sorizip',
    period: '2025.11',
    line: '중고 악기 거래 플랫폼. 수업 3인 팀에서 JSP · Servlet 회원 인증과 게시글',
    href: 'https://github.com/dongcheolpark/sorizip',
  },
  {
    name: 'algorithm',
    period: '2022–',
    line: '프로그래머스 · 백준 · SWEA 풀이(Java)와 학습 로그 대시보드(Vanilla JS)',
    href: 'https://trossyou.github.io/algorithm/',
  },
  {
    name: 'mood-music-recommender',
    period: '2025.06',
    line: '이미지의 인물 · 배경 분위기를 CLIP으로 따로 읽어 음악을 추천. 컴퓨터비전 수업 개인 프로젝트',
    href: 'https://github.com/TrossYou/mood-music-recommender',
  },
  {
    name: 'xv6 MLFQ 스케줄러',
    period: '2024',
    line: '교육용 운영체제 xv6 커널에 4단계 MLFQ 스케줄러와 Aging을 C로 구현',
    href: 'https://github.com/TrossYou/xv6-mlfq-scheduler',
  },
  {
    name: 'Yacht Dice',
    period: '2021.12–2022.02',
    line: '처음 코딩을 배우던 때의 팀 프로젝트. C++ 터미널 주사위 게임, TCP 소켓 대전',
    href: 'https://github.com/dongcheolpark/Yacht_Dice_C',
  },
];
