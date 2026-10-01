# 사실 목록

사이트·README·시안에 들어가는 사실만 모았습니다. 여기 없는 숫자는 싣지 않습니다. 출처가 있는 숫자만 적고, 확인 중인 것은 (확인 필요)로 표시합니다. 원본은 `projects.ts`와 `skills.json`이고, 이 문서는 시안 작업에 붙여 넣기 위한 읽기용 사본입니다.

## 사람

- 이름: 유승주 (GitHub: TrossYou)
- 역할: 프론트엔드 개발자
- 이메일: seungju.you1@gmail.com
- 위치: 대한민국 서울, UTC+9
- 교육: 숭실대학교 컴퓨터학부 졸업 · SSAFY 15기 (2026.01.07 – 2026.12.01). 1학기 925시간 이수, 2학기 프로젝트 과정 진행 중
- 자격: 정보처리기사 · SQLD (2026.03) · TOPCIT 수준 3

## 프로젝트

### FINCH — 대표 프로젝트
- 한 줄: AI 투자 비서를 붙인 증권 서비스 (모바일 웹)
- 기간: 2026.08.19 – 09.28 (6주) · 5인 (프론트엔드 2) · SSAFY 특화 프로젝트 · 2026.09.28 발표
- 역할: 프론트엔드 구현 전반
- 맡은 것: 종목 상세 · 홈 · AI 채팅 · 예수금 · 주문 · 거래내역 · 문의함 화면. 백엔드가 중계하는 시세의 화면 단위 구독·해제, 기간별 캔들 차트, 수량 기반 시장가 매수·매도. API 계약 문서 · 목 서버(MSW) · 프론트 규약
- 숫자: 프론트엔드 영역 커밋 510 / 692 (74%), master에 머지된 작업 브랜치 156 / 204 (76%). 출처: finch-frontend 저장소, 2026.09.28 기준. 파트 간 문의 105건 정리. 출처: FINCH 문의함 문서, 6주 누적
- 링크: 서비스 https://finchapp.org · 시연 https://youtu.be/4Cbu0-vMve4 · 저장소 https://github.com/Team-FINCH/finch-frontend
- 스택: React 19 · TypeScript · Vite · TanStack Query · Zustand · Zod · MSW · lightweight-charts · Tailwind CSS

### PinLog
- 한 줄: 장소를 저장한 맥락을 기록하고 자연어로 다시 찾는 서비스
- 기간: 2026.07 – 08 (5주) · 6인 · SSAFY 공통 프로젝트 · 2026.08 배포 종료
- 역할: 프론트엔드 기능 구현
- 맡은 것: 지도 기반 기록 · 자연어 검색 결과 화면 · 컬렉션 피드
- 숫자: 프론트엔드 저장소 커밋 178 / 206 (86%). 검색 결과 서체 준비 시간 913ms → 149ms. 출처: PinLog 프론트 저장소, Chrome 성능 패널 측정
- 링크: 시연 https://youtu.be/lD5MbHL9TZ8 · 저장소 https://github.com/Team-PinLog/front
- 스택: React · TypeScript · TanStack Query · TanStack Router · Vitest · Tailwind CSS

### formabridge
- 한 줄: 좋아하는 음악을 기록하는 음악 SNS 서비스
- 기간: 2025.03 – 11 · 4인 (학부 동기) · K-PaaS 공모전 출품 · 배포 현재 중단
- 역할: 풀스택 · 배치 자동화
- 맡은 것: Google OAuth + JWT 인증, 메모 · 검색 · 팔로우 기능(Remix loader/action · Prisma 모델), Spotify API 연동, 모바일 반응형 UI. Spotify ID 백필 배치 스크립트와 GitHub Actions → K8s Job 공통 러너
- 링크: 저장소 https://github.com/formalBridge/project_alpha
- 스택: Remix · TypeScript · Prisma · PostgreSQL · Docker · Kubernetes · GitHub Actions

### Sorizip
- 한 줄: 중고 악기 거래 플랫폼
- 기간: 2025.11 · 3인 · 숭실대학교 웹프로그래밍 수업
- 역할: 회원 인증 · 게시글 관리 (처음 다룬 JSP/Servlet)
- 숫자: 담당 커밋 64건 중 13건 · 첫 커밋에서 담당 기능 완료까지 6일 · 과목 최종 A+ (98점)
- 링크: 저장소 https://github.com/dongcheolpark/sorizip
- 스택: Java 17 · JSP · Servlet · Tomcat · MySQL · HikariCP

### 그 외 (사이트에는 올리지 않음, GitHub 프로필에만)
- 학습 로그 대시보드 (Vanilla JS, https://trossyou.github.io/algorithm/)
- mood-music-recommender (CLIP · YOLOv8, 31장 평가셋 가중치 4:6 → 8:2에서 0.2903 → 0.6129)
- xv6 MLFQ 스케줄러 (C, 2024)

## 가로지르는 기록

- 에이전트 하네스: 2026.07 – 진행 중 · 개인 · PinLog에서 시작해 FINCH와 취업 준비까지. AI 코딩 에이전트에게 구현·문서·기록을 맡기면서 무엇을 맡기고 무엇을 사람이 쥘지를 정해 둔 운영 방식. 운영 문서 템플릿은 비공개

## 활동 타임라인 (배운 순서)

| 날짜 | 종류 | 제목 | 한 줄 |
|---|---|---|---|
| 2025.03 – 11 | 프로젝트 | formabridge | K-PaaS 공모전 출품. 풀스택 · 배치 자동화 |
| 2025.11 | 프로젝트 | Sorizip | 숭실대 웹프로그래밍, 3인. JSP·Servlet 회원 인증과 게시글 |
| 2026.01.07 – 06 | 교육 | SSAFY 15기 1학기 | 925시간 이수. Java · 웹 프레임워크 · 데이터베이스 · AI. DataBase 과목 100점 |
| 2026.03 | 자격 | SQLD | |
| 2026.07 – 08 | 프로젝트 | PinLog | SSAFY 공통, 6인. 프론트엔드 기능 구현 |
| 2026.08 – 09 (진행 중 표시) | 프로젝트 | FINCH | SSAFY 특화, 5인. 프론트엔드 구현 전반 · 2026.09.28 발표 |

정보처리기사·TOPCIT 취득 시점은 (확인 필요). 확인되면 자격 행으로 추가합니다.

## 스킬 별점

`skills.json` 참조. 묶음은 프론트엔드 · 백엔드 둘. React 4 · TypeScript 4 · Tailwind CSS 3 · TanStack Query 3 · Zustand 3 · Router 3 · MSW 3 · Vite 3 · Java 3 · Remix 3. 써 본 것: Spring Boot · Prisma · PostgreSQL · Docker · Kubernetes · GitHub Actions · Vitest · JSP. AI 코딩 에이전트 운영 4는 How I Work에 둔다.

## 성향 카드 (근거 문장)

- 스스로 일을 찾아서 한다 — 백엔드 응답을 기다리는 동안 API 계약 문서와 목 서버를 먼저 만들어 팀 전원이 썼습니다. 근거: FINCH 케이스 스터디 「확정된 것과 가정한 것을 문서로 갈라 두고 먼저 만들었다」
- 파트 간 의사소통 — 6주 동안 파트 간 문의 105건을 한 문서에 정리하고, 답이 어긋나면 고치기 전에 왜 어긋났는지부터 물었습니다. 근거: FINCH 케이스 스터디 「어긋난 것을 고치기 전에, 왜 어긋났는지부터 물었다」
- 틀린 것을 기록한다 — 제가 올리자고 한 이슈가 틀렸던 경위를 케이스 스터디에 그대로 남겼습니다. 근거: FINCH 케이스 스터디 「제가 올리자고 한 이슈가 틀렸다」
