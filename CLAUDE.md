# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Korean Practice** - 게임화(Gamification) 기반 인터랙티브 한국어 학습 웹 애플리케이션

비복스 영어학습앱을 참고한 UI/UX로, 귀여운 마스코트 캐릭터와 파스텔 톤 디자인을 특징으로 합니다.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Commands

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

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

## TODO (미구현)
- 사용자 인증 (NextAuth)
- 간격 반복 알고리즘 (Spaced Repetition)
- 데이터베이스 연동 (Prisma + PostgreSQL)
- 리스닝 퀴즈 (Web Speech API)
- 상황별 회화 시나리오
- 학습 통계 대시보드
