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
  /**
   * 첫 화면 큰 글씨. 줄마다 끊고, 마지막 줄에만 밑줄 띠를 깐다.
   * 2026.11.27 SSAFY 포트폴리오 장표(deck/ssafy.html)의 캐치프레이즈로 바꿈. 옛 문구는 「시키시면 합니다. / AI 팀과 함께요.」(2026.11.20)
   */
  title: ['기준을 먼저 정하고,', '바뀐 것은 숫자로 확인하는', '프론트엔드 개발자'] as const,
  /** 큰 글씨 아래 한 문장. 장표 자기소개와 같은 뜻 */
  lead: '화면이 느리거나 업무가 번거로운 곳을 찾으면 바꾸기 전과 뒤를 재고, 같은 조건에서 다시 재서 확인된 것만 개선으로 남깁니다. 구현은 AI 에이전트에게 나눠 맡기고, 무엇을 만들지와 어떤 기준으로 동작할지는 직접 정합니다.',
  /** 검색 · 공유 미리보기 한 줄 */
  summary: '기준을 먼저 정하고, 바뀐 것은 숫자로 확인하는 프론트엔드 개발자',
  /** 이력 섹션의 사실 격자 */
  about: [
    { label: '교육', value: 'SSAFY 15기 · 2026.01–12' },
    { label: '학력', value: '숭실대학교 컴퓨터학부 졸업' },
    { label: '자격', value: '정보처리기사 · SQLD · TOPCIT 수준 3 · TOEIC Speaking IH' },
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
 * 홈 문구. 첫 화면의 「해결한 문제」 · 일하는 방식 네 단계 · AI가 쓴 코드를 거르는 네 가지.
 * 「해결한 문제」는 직접 찾은 일과 명세에 있던 일이 섞여 있다. 누가 시켰는지가 아니라 내가 했다는 것을 보인다(2026.11.20 사용자 설명).
 * 숫자는 projects.ts 의 Metric 과 같은 값이다.
 * 단계 근거: case-studies/harness.md 「바뀌어 온 순서」
 */
export type Found = { project: string; problem: string; from?: string; to: string; unit?: string; href: string };

export const found: Found[] = [
  { project: '글로케어', problem: '직원이 교육생 진행 단계를 하나하나 켜고 있었어요', from: '14', to: '0', unit: '칸', href: '#glocare' },
  { project: '글로케어', problem: '이력서 창 하나 여는 데 4초 넘게 걸렸어요', from: '4.41', to: '2.33', unit: '초', href: '#glocare' },
  { project: 'FINCH', problem: '백엔드 API가 나오기 전에는 화면을 만들 수 없었어요', to: 'API 계약 · 목 서버', href: '/work/finch' },
  { project: 'PinLog', problem: '검색 결과가 뜰 때 글씨체가 한 번 깜빡였어요', from: '913', to: '149', unit: 'ms', href: '/work/pinlog' },
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

/**
 * AI가 쓴 코드를 거르는 네 가지(2026.11.20 사용자 설명으로 고침).
 * 근거: case-studies/harness.md 「팀 리뷰」 · 「리뷰는 코드 발췌로」, glocare.md CI 장
 */
export const checks = [
  { title: '올리기 전에 체크리스트로 검사', body: '실패했을 때의 처리와 범위 밖 값까지 체크리스트대로 보고, 고친 뒤에 올립니다.' },
  { title: '테스트도 함께 올려 CI로', body: '기능과 테스트 파일을 같은 MR에 올리고, 자동 검사(CI)를 통과해야 합칩니다.' },
  { title: '팀원에게 리뷰를 받고 고침', body: '같이 관리자 화면을 만든 팀원이 스레드로 단 지적을 하나씩 고쳐 해결했습니다.' },
  { title: '팀원 코드도 같은 기준으로', body: '문제 되는 줄을 발췌해 달고, 실행해서 확인한 것과 코드만 읽고 판단한 것을 나눠 적었습니다.' },
];

/**
 * 기능보다 먼저 정한 기준. 비교한 안 → 고른 안 → 몫.
 * 문장은 장표 deck/ssafy.html 8 · 12쪽 판단 카드와 같은 뜻이고, 근거는 각 케이스 스터디의 장(chapter 제목 그대로 — 앵커가 된다).
 * share 줄은 AI 에이전트 · 팀원 몫이라 빼지 않는다.
 */
export type Decision = {
  project: string;
  /** 케이스 스터디 slug 와 장 제목. 앵커는 site/src/lib/markdown.ts 의 slugify 로 만든다 */
  slug: string;
  chapter: string;
  question: string;
  rejected: string;
  chosen: string;
  result?: string;
  share: string;
};

export const decisions: Decision[] = [
  {
    project: '글로케어',
    slug: 'glocare',
    chapter: '교육생의 진행 단계를 큰 단계 9개와 실제 기록으로 판정하게 정함',
    question: '진행 단계를 무엇으로 판정할까',
    rejected: '옛 단계의 이름만 바꿔 유지 — 비자 진행이 큰 단계에서 보이지 않음',
    chosen: '결제 · 교육원 배정 · 날짜 · 문자 기록에서 큰 단계 9개를 계산 — 직원이 켜는 표시 대신 실제 기록이 단계가 됨',
    result: '직원이 켜고 끄던 칸 14 → 0',
    share: '판정 후보 · 코드 · 테스트는 AI 에이전트, 기준 선택은 직접',
  },
  {
    project: '글로케어',
    slug: 'glocare',
    chapter: '다른 언어 저장이 실패해도 한국어 원문이 저장되면 글을 올리기로 정함',
    question: '다른 언어 저장이 실패하면 글을 올릴까',
    rejected: '모든 언어가 저장돼야 공개(팀원 리뷰 제안)',
    chosen: '한국어 원문이 저장되면 공개, 실패한 언어는 배지 · 저장 안내 · 이력으로 알림 — 지원 언어가 늘어나도 언어 하나의 실패가 글 전체를 막지 않게 함',
    share: '저장 순서 코드 · README는 AI 에이전트, 정책과 근거는 직접',
  },
  {
    project: '글로케어',
    slug: 'glocare',
    chapter: '권한은 역할별로 제안하고 DB 반영 전 머지는 멈춤',
    question: '권한을 직원마다 줄까, 역할마다 줄까',
    rejected: '직원마다 메뉴 권한 지정(DB 문서의 방식)',
    chosen: '역할별 권한, 운영 설정은 관리자만 — 직원 두세 명이 거의 같은 일을 하는 실제 운영에 맞춤',
    result: 'DB 담당에게 제안 → 다음 DB 문서에 역할별 권한 반영',
    share: '기술 근거 · 제안 글은 AI 에이전트, DB 문서와 최종 결정은 DB 담당',
  },
  {
    project: 'FINCH',
    slug: 'finch',
    chapter: '401만 보고 사용자를 로그아웃시키면 안 됐음',
    question: '401이 오면 바로 로그아웃시킬까',
    rejected: 'AI 요청을 공통 처리에서 빼기(에이전트 첫 안) — 예외 경로 목록을 잊으면 방어가 조용히 뚫림',
    chosen: '인터셉터는 하나로, 사용자 인증 오류 코드 셋일 때만 세션 처리 — 모르는 401은 세션을 건드리지 않음',
    share: '문제를 처음 짚은 것은 백엔드 · 기준은 구현 전에 정함 · 구현은 다른 프론트엔드 팀원',
  },
  {
    project: 'FINCH',
    slug: 'finch',
    chapter: '시세 받는 방식을 화면 밖으로 숨긴 안을 승인했지만, 바꿔 보지는 못함',
    question: '시세를 받는 방식이 바뀌면 화면도 고쳐야 할까',
    rejected: '보고받은 자리에서 바로 고치기',
    chosen: '이행 티켓을 따로 열고, 화면은 구독 · 해지만 아는 공용 훅으로 모음',
    share: '대조 요청 · 티켓 결정은 직접, 구조 설계 · 구현은 AI 에이전트 안을 승인 · 웹소켓으로 실제 교체는 해 보지 못함',
  },
];

/** 글로케어 블록의 속도 비교. key 는 projects.ts 의 Metric, note 는 막대 아래 짧은 기준 */
export const glocareBars = [
  { key: 'glocare-dashboard', note: '배포 사이트 · 10회 중앙값' },
  { key: 'glocare-list', note: '같은 PC · 5회 중앙값 · 개선 여러 건을 합친 효과' },
  { key: 'glocare-resume', note: '같은 PC · 개선 두 건만 되돌린 판과 비교' },
];
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
