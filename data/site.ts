/**
 * 사람 · 이력 · 홈 문구 · AI를 쓰기 전 프로젝트 · 연락처. 전부 사실이며 출처가 있다.
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
  /** 첫 화면 큰 글씨. 줄마다 끊고, 마지막 줄에만 밑줄 띠를 깐다(2026-11-20 사용자가 고른 문구) */
  title: ['시키시면 어떻게든', '해옵니다.', 'AI 팀과 함께요.'] as const,
  /** 큰 글씨 아래 한 문장 */
  lead: '직접 코딩하던 때부터 AI 세션 여럿을 나눠 돌리는 지금까지, AI가 하는 몫은 커졌고 무엇을 할지 정하고 결과를 확인하는 일은 늘 제가 했습니다.',
  /** 검색 · 공유 미리보기 한 줄 */
  summary: 'AI 세션 여럿을 역할별로 나눠 일하고, 무엇을 할지와 결과 확인은 직접 하는 프론트엔드 개발자',
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
 * 홈 문구. 첫 화면의 「받았던 부탁」 · 일하는 방식 네 단계 · AI가 쓴 코드를 거르는 네 가지.
 * 부탁 문장은 보는 사람이 묻는다고 가정한 예시이고, 누가 실제로 그렇게 말했는지는 기록에 없다.
 * 결과 값은 projects.ts 의 Metric 과 같은 숫자다.
 * 단계 근거: case-studies/harness.md 「바뀌어 온 순서」
 */
export type Ask = { project: string; ask: string; result: string; href: string };

export const asks: Ask[] = [
  { project: '글로케어', ask: '교육생 진행 단계를 직원이 하나하나 바꾸고 있어요', result: '14칸 → 0칸', href: '#glocare' },
  { project: '글로케어', ask: '이력서 창 하나 여는 데 한참 걸려요', result: '4.41 → 2.33초', href: '#glocare' },
  { project: 'FINCH', ask: '백엔드가 아직인데, 화면부터 만들 수 있을까요?', result: 'API 계약 · 목 서버', href: '/work/finch' },
  { project: 'PinLog', ask: '검색 결과가 뜰 때 글씨체가 한 번 깜빡여요', result: '913 → 149ms', href: '/work/pinlog' },
];

export type Stage = { when: string; title: string; body: string; kind: 'solo' | 'one' | 'roles' | 'team' };

export const stages: Stage[] = [
  { when: '~ 2025', title: '직접 코딩', body: '음악 SNS, 중고 악기 거래, 운영체제 스케줄러까지 손으로 짰습니다.', kind: 'solo' },
  {
    when: '2026.07 · PinLog',
    title: 'AI와 한 작업씩',
    body: '규칙 문서를 두고 하나씩 지시하다가, 커밋 전에 보고받고 승인하는 절차를 거쳐 여럿을 동시에 돌렸습니다.',
    kind: 'one',
  },
  {
    when: '2026.08 · FINCH',
    title: '역할을 나눔',
    body: '작업을 지시하고 검토하는 대화와, 모르는 개념을 공부하는 대화를 따로 뒀습니다.',
    kind: 'roles',
  },
  {
    when: '2026.10 · 글로케어',
    title: 'AI 팀을 운영',
    body: '배분 · 감시 · 리뷰 세션과 기능 세션 최대 5개. 합치기 · 지우기 · 배포는 제가 허가해야 진행됩니다.',
    kind: 'team',
  },
];

/** AI가 쓴 코드를 거르는 네 가지. 자세한 것은 하네스 케이스 스터디 */
export const checks = [
  { title: '쓴 세션 말고 다른 세션이 검사', body: '실패했을 때의 처리와 범위 밖 값까지 체크리스트로 봅니다.' },
  { title: '리뷰는 코드 줄을 붙여서', body: '실행해서 확인한 것과 코드만 읽고 판단한 것을 나눠 적습니다.' },
  { title: '합치기 전 자동 검사', body: '전체 검사와 빌드를 통과하고 승인이 나야 합칩니다.' },
  { title: '화면은 제가 보고 나서', body: '미리보기로 직접 확인한 뒤에 올립니다.' },
];

/** 글로케어 블록의 속도 막대. projects.ts 의 Metric key */
export const glocareBars = ['glocare-dashboard', 'glocare-list', 'glocare-resume'];
/** 글로케어 블록 아래 작업 규모 한 줄. projects.ts 의 Metric key */
export const glocareScale = ['glocare-mr', 'glocare-jira'];

/** AI를 쓰기 전 직접 짠 프로젝트. 한 줄씩 */
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
