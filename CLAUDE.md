# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Korean Practice** - 게임화(Gamification) 기반 인터랙티브 한국어 학습 웹 애플리케이션

비복스 영어학습앱을 참고한 UI/UX로, 귀여운 마스코트 캐릭터와 파스텔 톤 디자인을 특징으로 합니다.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript, 정적 export)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Firebase Auth (이메일/비밀번호 + Google) + Cloud Firestore (서버리스, FastAPI 제거됨)
- **Mobile**: Capacitor 8 (Android, iOS 예정), Capacitor Community TTS

## Commands

```bash
npm run dev            # 개발 서버 실행 (localhost:3000)
npm run build          # 프로덕션 빌드 (정적 export → out/)
npm run lint           # ESLint 실행

# Android (Capacitor)
npm run android:sync   # 웹 빌드 후 android/로 동기화
npm run android:open   # Android Studio 열기
npm run android:run    # 빌드 + 동기화 + 디바이스/에뮬레이터 실행
```

## Backend (Firebase)

서버 없는 구조입니다. 모든 데이터 접근은 클라이언트가 Firebase Web SDK로 직접 수행하며, 권한은 Firestore Security Rules로 강제됩니다.

- 인증: Firebase Auth (이메일/비밀번호 + Google OAuth)
- 데이터: Cloud Firestore — `users/{uid}` 하위에 `vocabularyProgress`, `studySessions`, `lessonProgress` 서브컬렉션
- 보안 규칙: `firestore.rules` (각 사용자는 자기 데이터만 read/write, 세션은 append-only)
- 비즈니스 로직: `src/lib/srs.ts`에 순수 함수로 (간격 반복, mastery, streak)

### Firebase 설정
1. [Firebase Console](https://console.firebase.google.com)에서 프로젝트 생성
2. Authentication → Sign-in method: **Email/Password** + **Google** 활성화
3. Firestore Database를 production mode로 생성 (region: `asia-northeast3` 권장)
4. Project settings → Add Web app → 6개 config 값 복사
5. `.env.local.example`을 `.env.local`로 복사하고 값 채우기
6. (필요 시) `npm run firebase:rules:deploy`로 보안 규칙 배포

### 핵심 코드
- `src/lib/firebase.ts` — lazy getter (SSR/build time에 평가되지 않도록)
- `src/lib/firestore.ts` — 데이터 액세스 레이어 (전 API 함수 대체)
- `src/lib/srs.ts` — 간격 반복/mastery/streak 순수 함수
- `src/stores/useAuthStore.ts` — Zustand store, Firebase User 기반
- `src/components/providers/AuthProvider.tsx` — `onAuthStateChanged` 구독

## Mobile App (Capacitor)

웹 앱은 정적 export(`output: 'export'`)로 빌드되며, Capacitor를 통해 네이티브 WebView로 래핑됩니다.

- `capacitor.config.ts`: appId `com.koreanpractice.app`, webDir `out`
- 동적 라우트(`study/conversation/[id]`)는 `generateStaticParams()`로 빌드 타임에 모든 시나리오 페이지 사전 생성
- Firebase는 Web SDK 그대로 WebView 안에서 동작. **단 Google Sign-In은 웹에서만 활성**, 네이티브에서는 버튼 자동 숨김 (네이티브 Google은 향후 `@codetrix-studio/capacitor-google-auth`로 추가 예정)

### Android 빌드 절차
1. `npm run android:sync` 로 웹 자산 동기화
2. `npm run android:open` 으로 Android Studio 실행
3. 에뮬레이터/실기기 선택 후 Run
   - 또는 `npm run android:run` 으로 CLI에서 바로 실행

## Project Structure

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx           # 메인 대시보드 (홈)
│   └── study/page.tsx     # 학습/퀴즈 페이지
├── components/
│   ├── ui/                # 공통 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Mascot.tsx     # 마스코트 캐릭터
│   │   ├── StreakBadge.tsx
│   │   └── StudySummaryModal.tsx
│   ├── quiz/              # 퀴즈 컴포넌트
│   │   ├── FillBlankQuiz.tsx    # 빈칸 채우기
│   │   ├── WordArrangeQuiz.tsx  # 단어 조합
│   │   └── WordOption.tsx
│   └── layout/
│       └── BottomNav.tsx
├── stores/                # Zustand 상태 관리
│   └── useStudyStore.ts
├── types/                 # TypeScript 타입 정의
│   └── index.ts
├── data/                  # 정적 데이터
│   └── vocabulary.ts      # 어휘 데이터 (샘플 30개)
└── lib/                   # 유틸리티 함수
```

## Design System

### Colors (CSS Variables)
- `--primary`: #7c3aed (보라색)
- `--primary-light`: #a78bfa
- `--secondary`: #06b6d4 (청록색)
- `--accent`: #f59e0b (주황색)
- `--success`: #10b981 (녹색)
- `--error`: #ef4444 (빨간색)

### Quiz Types
1. **빈칸 채우기 (fill-blank)**: 문장 속 빈칸에 알맞은 단어 선택
2. **단어 조합 (word-arrange)**: 단어 카드를 순서대로 배치해 문장 완성
3. **리스닝 (listening)**: 오디오 듣고 문장 조합 (미구현)
4. **객관식 (multiple-choice)**: 보기 중 정답 선택 (미구현)

## Key Features (구현됨)
- 메인 대시보드 (마스코트, 스트릭 배지, 학습 메뉴)
- 오늘의 학습 요약 모달
- 빈칸 채우기 퀴즈
- 단어 조합 퀴즈
- 학습 완료 화면

## Key Features (추가 구현)
- 사용자 인증 (Firebase Auth - 이메일/비밀번호 + Google)
- 간격 반복 알고리즘 (`src/lib/srs.ts`)
- Firestore 기반 학습 통계 (streak, mastery, accuracy)
- 한국어 TTS (`@capacitor-community/text-to-speech`, Web Speech API fallback)
- 리스닝 퀴즈, 회화 시나리오 (15개)

## TODO (미구현)
- 상세 통계 대시보드 (`/stats` 페이지)
- 네이티브 Google Sign-In (Capacitor plugin)
- 푸시 알림 (FCM, 동일 Firebase 프로젝트 활용)
- iOS 플랫폼 지원
