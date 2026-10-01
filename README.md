# 유승주 — 포트폴리오

프론트엔드 개발자 유승주의 프로젝트 기록입니다. 프로젝트마다 **무엇을 결정했고, 무엇이 틀렸고, 무엇을 남겼는지** 적습니다.

<a href="https://trossyou.github.io/portfolio/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/Visit_Site-4C6CB3?style=for-the-badge"><img src="https://img.shields.io/badge/Visit_Site-2E4A8B?style=for-the-badge" alt="Visit Site"></picture></a>
<a href="https://github.com/TrossYou"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/GitHub_Profile-4C6CB3?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/GitHub_Profile-2E4A8B?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Profile"></picture></a>

## 케이스 스터디

사실(기간 · 인원 · 링크)은 [GitHub 프로필](https://github.com/TrossYou)에 있고, 여기에는 글이 있습니다.

| 프로젝트 | 한 줄 소개 | 글에서 다루는 것 |
|---|---|---|
| [FINCH](case-studies/finch.md) | 내 계좌와 성향을 읽고 투자 판단을 돕는 AI 비서가 있는 증권 앱 | 묻는 판을 만들고, 기다리는 시간을 문서로 메웠다. 다른 파트의 답을 기다리는 동안 계약 문서와 목 서버를 먼저 만들었고, 제가 올리자고 한 이슈가 틀렸던 경위까지 적었습니다 |
| [PinLog](case-studies/pinlog.md) | 장소 이름이 기억나지 않아도 경험과 감정으로 다시 찾는 AI 장소 기록 서비스 | 규칙을 먼저 적어두고 시작했다. 병렬 작업이 실패한 뒤 파일 기준으로 다시 짠 과정과 서체 준비 시점 검증 |
| [formabridge](case-studies/formabridge.md) | 좋아하는 음악을 기록하는 음악 SNS 서비스 | 처음으로 배포까지 이어 간 서비스. 인증을 두 번 갈아엎었고, 컬럼을 추가하기 전 데이터를 채우는 배치에 먼저 출력만 해보는 모드를 넣었습니다 |
| [에이전트 하네스](case-studies/harness.md) | AI 코딩 에이전트에게 일을 맡기되, 판단은 사람이 쥐는 운영 방식 | 일은 맡기고, 판단은 남겼다. 세 프로젝트에서 무엇을 맡기고 무엇을 사람이 쥘지를 정해 온 기록 |

검증 전 원본은 [`case-studies/_archive/`](case-studies/_archive/README.md)에 그대로 보관합니다.

## 이 저장소

```
case-studies/   케이스 스터디 네 편과 검증 전 원본
assets/         이미지. 케이스 스터디와 사이트가 같은 파일을 쓴다
site/           포트폴리오 사이트 (React 19 · Vite)
design-system/  토큰과 React 컴포넌트
data/           기간 · 인원 · 별점 같은 사실의 원본
docs/design.md  표기 규격
```

원본과 복사본의 관계, 고치는 순서는 [MAINTENANCE.md](MAINTENANCE.md)에 있습니다.

사이트 개발은 `site/`에서 합니다.

```bash
cd site && npm install && npm run dev
```
