/**
 * 사람 · 활동 타임라인 · 성향 근거 · 연락처. 전부 사실이며 출처가 있다.
 * 읽기용 사본은 facts.md. 스킬 별점은 skills.json.
 */

export const person = {
  name: '유승주',
  handle: 'TrossYou',
  role: '프론트엔드 개발자',
  email: 'seungju.you1@gmail.com',
  github: 'https://github.com/TrossYou',
  location: '서울, UTC+9',
  /** 히어로 한 문장. 핵심 단어 하나에만 <Mark>를 깐다 */
  thesis: ['무엇을 결정했고, 무엇이 ', '틀렸고', ', 무엇을 남겼는지 적어 두는 프론트엔드 개발자입니다.'] as const,
  lead: 'React와 TypeScript로 화면을 만들고, 프로젝트가 끝나면 남길 것을 고릅니다.',
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
};

/** 배운 순서. 과거가 위 */
export const timeline: TimelineItem[] = [
  { date: '2025.03 – 11', kind: '프로젝트', title: 'formabridge', desc: 'K-PaaS 공모전 출품. 풀스택 · 배치 자동화', href: '/work/formabridge' },
  { date: '2025.11', kind: '프로젝트', title: 'Sorizip', desc: '숭실대 웹프로그래밍, 3인. JSP·Servlet 회원 인증과 게시글' },
  {
    date: '2026.01.07 – 06',
    kind: '교육',
    title: 'SSAFY 15기 1학기',
    desc: '925시간 이수',
    details: ['Java · 웹 프레임워크 · 데이터베이스 · AI', 'DataBase 과목 100점'],
  },
  { date: '2026.03', kind: '자격', title: 'SQLD' },
  { date: '2026.07 – 08', kind: '프로젝트', title: 'PinLog', desc: 'SSAFY 공통, 6인. 프론트엔드 기능 구현', href: '/work/pinlog' },
  { date: '2026.08 – 09', kind: '프로젝트', title: 'FINCH', desc: 'SSAFY 특화, 5인. 프론트엔드 구현 전반 · 2026.09.28 발표', now: true, href: '/work/finch' },
];

export type Trait = {
  trait: string;
  evidence: string;
  sourceLabel: string;
  sourceHref: string;
};

export const traits: Trait[] = [
  {
    trait: '스스로 일을 찾아서 한다',
    evidence: '백엔드 응답을 기다리는 동안 API 계약 문서와 목 서버를 먼저 만들어 팀 전원이 썼습니다.',
    sourceLabel: 'FINCH · 확정된 것과 가정한 것을 문서로 갈라 두고 먼저 만들었다',
    sourceHref: '/work/finch#확정된-것과-가정한-것을-문서로-갈라-두고-먼저-만들었다',
  },
  {
    trait: '파트 간 의사소통',
    evidence: '6주 동안 파트 간 문의 105건을 한 문서에 정리하고, 답이 어긋나면 고치기 전에 왜 어긋났는지부터 물었습니다.',
    sourceLabel: 'FINCH · 어긋난 것을 고치기 전에, 왜 어긋났는지부터 물었다',
    sourceHref: '/work/finch#어긋난-것을-고치기-전에-왜-어긋났는지부터-물었다',
  },
  {
    trait: '틀린 것을 기록한다',
    evidence: '제가 올리자고 한 이슈가 틀렸던 경위를 케이스 스터디에 그대로 남겼습니다.',
    sourceLabel: 'FINCH · 제가 올리자고 한 이슈가 틀렸다',
    sourceHref: '/work/finch#제가-올리자고-한-이슈가-틀렸다',
  },
];

/** harness.md 의 30초 요약과 같은 문장 */
export const harnessSummary =
  '에이전트는 구현·커밋·초안 작성까지 합니다. 무엇을 할지, 팀에 무엇을 보낼지, 어떤 경험을 지원서에 쓸지는 제가 정합니다. 경계는 에이전트의 실력이 아니라 되돌릴 수 있는가로 그었습니다.';
