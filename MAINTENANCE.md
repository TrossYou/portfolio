# 운영 규칙

이 저장소를 고치는 사람이 읽는 문서입니다. 방문자는 README와 케이스 스터디만 보면 됩니다. 시각 규격은 [`docs/design.md`](docs/design.md)에 따로 있습니다.

## 원칙 하나

**사실은 한 파일에만 적고, 나머지 표면은 그 파일을 읽거나 가리킨다.** 같은 내용을 두 곳에 적으면 어긋났을 때 어느 쪽이 진실인지 다투게 됩니다.

## 원본

여기서 먼저 고칩니다.

- **프로젝트 사실** (기간 · 인원 · 역할 · 링크 · 지표) — `src/data/projects.ts`. 사이트가 읽고, README와 프로필 카드는 여기서 생성한다. 구조 이동 뒤에는 `data/projects.ts`.
- **스킬 별점** — `data/skills.json`. 등급, 기준, "써 본 것" 목록.
- **프로젝트 서술** (무엇을 결정했고, 무엇이 틀렸고, 무엇을 배웠는지) — `finch.md` · `pinlog.md` · `formabridge.md` · `harness.md`. 구조 이동 뒤에는 `case-studies/` 아래.
- **하네스 이야기** — `harness.md` 한 곳. 다른 문서에서는 두 문장 이내 요약과 링크만.
- **시각 규격** — Claude Design의 「TrossYou 디자인 시스템」. `docs/design.md`는 그 사본이다.

## 복사본

원본을 고친 뒤 따라 고칩니다.

- **포트폴리오 사이트** ([trossyou.github.io/portfolio](https://trossyou.github.io/portfolio/)) — 사실은 데이터 파일에서, 서술은 케이스 스터디 md를 직접 렌더한다. 따로 적는 본문이 없어야 한다.
- **GitHub 프로필 README** ([github.com/TrossYou](https://github.com/TrossYou)) — 처음 들어오는 곳. 프로젝트 카드 블록은 데이터 파일에서 생성해 마커 사이에 붙여 넣는다. About 이미지와 스킬 SVG는 `docs/design.md` 규격으로 그린다.
- **이 저장소의 README** — 케이스 스터디 색인. 프로젝트 사실을 반복하지 않는다.
- **포트폴리오 PPT** (준비 중) — 제출·면접용. 사이트 요약을 더 줄인 것.
- **개인 레포 README** (`algorithm` · `mood-music-recommender` · `xv6-mlfq-scheduler`) — 머리 블록만 규격을 따르고 본문은 각자 둔다.
- **각 팀 저장소 README** — 팀이 관리한다. 여기서 고치지 않고 링크만 건다.

## 고치는 순서

1. 기간·인원 같은 사실이 바뀌면 데이터 파일을 먼저 고치고, README와 프로필 카드를 다시 생성한다.
2. 서술이 바뀌면 케이스 스터디 md를 고친다. 사이트는 md를 렌더하므로 따라온다.
3. 색·서체·배지 같은 규격이 바뀌면 디자인 시스템을 먼저 고치고 `docs/design.md`를 맞춘 뒤, 프로필 README의 SVG를 다시 그린다.
4. 숫자를 새로 적을 때는 출처를 함께 적는다. 출처를 적을 수 없는 숫자는 싣지 않는다.

## 어디에 무엇을 두나

```
portfolio/
├── README.md              방문자용 색인
├── MAINTENANCE.md         이 문서
├── docs/design.md         표기 규격
├── data/                  사실의 원본. projects.ts, skills.json
├── case-studies/          서술의 원본. 네 편과 _archive/
├── assets/                이미지 단일 저장소. md와 사이트가 같이 쓴다
└── site/                  Vite 앱. 사실은 data에서, 서술은 case-studies에서
```

2026-10-01 기준으로 `data/`만 만들어졌고 나머지는 이동 전입니다. 케이스 스터디와 사이트 소스가 아직 루트에 섞여 있습니다. 이동이 끝나면 이 문단을 지웁니다.

## 지키는 것

- `_archive/`는 고쳐 쓰지 않는다. 검증 전 원본을 그대로 남기는 자리다. 확인된 내용은 살아 있는 문서에 넣는다.
- 케이스 스터디의 지난 서술을 조용히 바꾸지 않는다. 사실이 뒤집히면 그 사실을 적고 어느 판에서 바뀌었는지 남긴다.
- 팀 프로젝트의 고유색과 팀 README 문구를 가져오지 않는다. 링크만 건다.
- 프로필 README의 Case Study 링크와 agent-harness README의 링크는 이 저장소의 파일 경로를 가리킨다. 파일을 옮기면 같은 날 그 링크를 고친다.
