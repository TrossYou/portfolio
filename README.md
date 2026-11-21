# 유승주 — 포트폴리오

AI 코딩 에이전트를 역할별로 나눠 운영하며, 수동 업무를 데이터로 연결하는 프론트엔드 개발자 유승주의 프로젝트 기록입니다. 케이스 스터디마다 무엇을 결정했고, 무엇이 틀렸고, 무엇을 남겼는지 적었습니다

<a href="https://trossyou.github.io/portfolio/"><img src="https://img.shields.io/badge/Visit_Site-2A7D62?style=for-the-badge" alt="Visit Site"></a>
<a href="https://github.com/TrossYou"><img src="https://img.shields.io/badge/GitHub_Profile-2A7D62?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile"></a>

## 케이스 스터디

사실(기간 · 인원 · 링크)은 [GitHub 프로필](https://github.com/TrossYou)에 있고, 여기에는 글이 있음

| 프로젝트 | 한 줄 소개 | 글에서 다루는 것 |
|---|---|---|
| [글로케어](case-studies/glocare.md) | 외국인 요양보호사의 교육부터 취업까지 한 곳에서 돕는 서비스(런칭 예정) | 기업 직원이 쓰는 관리자 화면과 dev 서버 · CI 담당. 직원이 수동으로 켜던 진행 단계 칸 14 → 0, 대시보드 첫 화면 1,300 → 659ms, CI가 느린 원인이 대기였던 것까지 |
| [에이전트 하네스](case-studies/harness.md) | AI 코딩 에이전트에게 일을 맡기되, 판단과 승인은 사람이 하는 운영 방식 | 세션을 배분 · 감시 · 리뷰 · 기능으로 나눈 구성, AI가 쓴 코드를 어떻게 검증했나, 토큰이 닳는 원인을 잰 기록 |
| [FINCH](case-studies/finch.md) | 내 계좌와 성향을 읽고 투자 판단을 돕는 AI 비서가 있는 증권 앱 | 다른 파트의 답을 기다리는 동안 확정과 가정을 계약 문서에 나눠 두고 먼저 개발했고, 내가 올리자고 한 이슈가 틀렸던 경위까지 |
| [PinLog](case-studies/pinlog.md) | 장소 이름이 기억나지 않아도 경험과 감정으로 다시 찾는 AI 장소 기록 서비스 | 병렬 작업이 실패한 뒤 파일 기준으로 다시 짠 과정과 서체 준비 시점 검증 |
| [formabridge](case-studies/formabridge.md) | 좋아하는 음악을 기록하는 음악 SNS 서비스 | AI 에이전트 도입 전 프로젝트. 직접 코딩한 풀스택 · 배치 자동화 |

검증 전 원본은 [`case-studies/_archive/`](case-studies/_archive/README.md)에 그대로 보관함

## 이 저장소

```
case-studies/   케이스 스터디 다섯 편과 검증 전 원본
assets/         이미지. 케이스 스터디와 사이트가 같은 파일을 씀
site/           포트폴리오 사이트 (React 19 · Vite)
deck/           제출용 PDF 장표 원본 (1920×1080, 헤드리스 Chrome으로 인쇄)
design-system/  토큰과 React 컴포넌트
data/           기간 · 인원 · 별점 같은 사실의 원본
docs/design.md  표기 규격
```

원본과 복사본의 관계, 고치는 순서는 [MAINTENANCE.md](MAINTENANCE.md)에 있음

사이트 개발은 `site/`에서 함

```bash
cd site && npm ci && npm run dev
```
