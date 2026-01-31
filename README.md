# 16bit_frontend

헬스케어 X IT 해커톤 대회 참여를 위한 레포지토리 입니다.

### Team 16bit

| 역할         | 인원 |
| :----------- | :--- |
| **Designer** | 2명  |
| **Backend**  | 1명  |
| **Frontend** | 1명  |

## 제출 자료 (Submission Materials)

이 프로젝트는 해커톤 제출을 위한 결과물입니다.

- **발표 자료 (PDF)**: <br>[16bit_hackathon_presentation.pdf](./submission_assets/16bit_hackathon_presentation.pdf)
  <br>
  <br>
- **시연 영상 (MP4)**: <br>[demo_video.mp4](./submission_assets/demo_video.mp4)
  <br>
  (view raw 클릭 해주세요!)
  <br>
  <br>
- **스크린샷 1**:<br>
  <img src="./submission_assets/intro-a.jpg" width="45%" title="intro A" alt="intro A">
  <br>
  <br>
- **스크린샷 2**: <br> <img src="./submission_assets/intro-b.jpg" width="45%" title="intro B" alt="intro B">
  <br>
  <br>

## 기술 스택

| 분류            | 기술                                    |
| --------------- | --------------------------------------- |
| **프레임워크**  | React 19 + TypeScript                   |
| **빌드**        | Vite 6                                  |
| **스타일링**    | TailwindCSS 4 + ShadcnUI                |
| **라우팅**      | TanStack Router                         |
| **데이터 페칭** | TanStack Query + Axios                  |
| **상태 관리**   | Zustand                                 |
| **폼**          | React Hook Form + Zod                   |
| **코드 품질**   | ESLint + Prettier + Husky + lint-staged |

## 시작하기

### 필수 조건

- Node.js 20.x 이상
- pnpm 9.x 이상

### 설치 및 실행

```bash
# pnpm 설치 (없는 경우)
npm install -g pnpm

# 의존성 설치
pnpm install

# 환경 변수 설정 (.env)
cp .env.example .env

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 접속

## 프로젝트 구조

```text
src/
├── features/             # 기능별 모듈 (onboarding, search-map 등)
│   ├── onboarding/       # 온보딩 관련 (steps, logic)
│   └── search-map/       # 병원 찾기/지도 관련 (logic, components)
├── routes/               # 페이지 라우트 (TanStack Router)
├── components/           # 공통 컴포넌트
├── ui/                   # ShadcnUI 기본 컴포넌트
├── layout/               # 레이아웃 (Layout, Sidebar, Header)
├── hooks/                # 커스텀 훅
├── lib/                  # 유틸리티 (axios, utils 등)
├── stores/               # Zustand 상태 (sidebar 등)
└── styles/               # 글로벌 스타일 (Grayscale)
```

### Public Assets (`/public/assets`)

- `icons/`: UI 아이콘
- `images/`: 지도 등 일반 이미지
- `logos/`: 로고 파일
- `markers/`: 지도 마커 이미지
- `profiles/`: 프로필 아바타

## 라이선스 (License)

이 프로젝트는 **MIT 라이선스**를 따릅니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 확인해주세요.

Copyright (c) 2026 Yoon SangHwan
