# 로그인 시스템 기획서

## 1. 개요

### 1.1 목표
- 사용자 인증 시스템 구축
- 학습 진도 및 통계의 영구 저장
- 다양한 디바이스에서 동기화
- 게임화 요소 (연속 학습, 랭킹) 지원

### 1.2 현재 상태
- 인증 시스템 없음
- 모든 데이터가 클라이언트 메모리에만 존재
- 새로고침 시 진도 초기화

---

## 2. 인증 방식 선택

### 2.1 옵션 비교

| 방식 | 장점 | 단점 | 추천 |
|-----|-----|-----|-----|
| **소셜 로그인만** | 구현 간단, 비밀번호 관리 불필요 | 특정 소셜 계정 없는 사용자 불편 | ⭐⭐⭐ |
| **이메일/비밀번호만** | 범용적, 소셜 의존 없음 | 비밀번호 관리, 이메일 인증 필요 | ⭐⭐ |
| **소셜 + 이메일** | 사용자 선택권 제공 | 구현 복잡도 증가 | ⭐⭐⭐⭐ |
| **Magic Link** | 비밀번호 불필요, 보안 좋음 | 이메일 의존, 로그인 과정 다소 불편 | ⭐⭐⭐ |

### 2.2 권장안: 소셜 로그인 + 이메일/비밀번호

**우선순위:**
1. **Google 로그인** (필수) - 가장 범용적
2. **이메일/비밀번호** (필수) - 소셜 계정 없는 사용자 대응
3. **Apple 로그인** (선택) - iOS 사용자 대응
4. **Kakao 로그인** (선택) - 한국 사용자 대응

---

## 3. 기술 스택

### 3.1 인증 라이브러리

#### Option A: NextAuth.js (Auth.js) ⭐ 권장
```
장점:
- Next.js와 완벽한 통합
- 다양한 Provider 지원 (Google, Apple, Kakao 등)
- 세션 관리 자동화
- 서버/클라이언트 모두 사용 가능

단점:
- 커스터마이징 제한적
- v5 마이그레이션 진행 중
```

#### Option B: Supabase Auth
```
장점:
- 인증 + DB가 하나의 서비스
- Row Level Security 지원
- 실시간 기능 내장

단점:
- Supabase에 종속
- 자체 호스팅 복잡
```

#### Option C: Clerk
```
장점:
- 매우 쉬운 구현
- 미려한 기본 UI 제공
- 조직/팀 기능 내장

단점:
- 유료 (MAU 제한)
- 외부 서비스 의존
```

### 3.2 권장 스택

```
인증: NextAuth.js v5 (Auth.js)
데이터베이스: PostgreSQL (Supabase or Neon)
ORM: Prisma
호스팅: Vercel (현재)
```

---

## 4. 데이터베이스 스키마

### 4.1 사용자 테이블

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // 프로필 정보
  nickname      String?
  nativeLanguage String?  @default("en")
  koreanLevel   Int       @default(1)  // 1: 초급, 2: 중급, 3: 고급

  // 게임화 정보
  totalXp       Int       @default(0)
  currentStreak Int       @default(0)
  longestStreak Int       @default(0)
  lastStudyDate DateTime?

  // 관계
  accounts      Account[]
  sessions      Session[]
  progress      UserProgress[]
  studyHistory  StudyHistory[]
  achievements  UserAchievement[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### 4.2 학습 진도 테이블

```prisma
model UserProgress {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // 학습 항목 정보
  itemType  String   // "vocabulary" | "grammar" | "conversation" | "listening"
  itemId    String   // 어휘/문법/회화/듣기 항목 ID

  // 학습 상태
  status    String   @default("new") // "new" | "learning" | "mastered"
  correctCount   Int  @default(0)
  incorrectCount Int  @default(0)
  lastReviewedAt DateTime?
  nextReviewAt   DateTime?  // 간격 반복용
  easeFactor     Float  @default(2.5)  // SM-2 알고리즘용
  interval       Int    @default(0)    // 복습 간격 (일)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, itemType, itemId])
}
```

### 4.3 학습 기록 테이블

```prisma
model StudyHistory {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // 세션 정보
  module    String   // "vocabulary" | "grammar" | "conversation" | "listening"
  startedAt DateTime @default(now())
  endedAt   DateTime?

  // 결과
  totalQuestions Int
  correctAnswers Int
  xpEarned       Int @default(0)

  // 상세 기록
  answers   StudyAnswer[]
}

model StudyAnswer {
  id        String   @id @default(cuid())
  historyId String
  history   StudyHistory @relation(fields: [historyId], references: [id], onDelete: Cascade)

  itemType  String
  itemId    String
  isCorrect Boolean
  timeSpent Int      // 밀리초
  answeredAt DateTime @default(now())
}
```

### 4.4 업적 테이블

```prisma
model Achievement {
  id          String   @id @default(cuid())
  code        String   @unique  // "first_lesson", "streak_7", etc.
  name        String
  description String
  icon        String
  xpReward    Int      @default(0)

  users UserAchievement[]
}

model UserAchievement {
  id            String   @id @default(cuid())
  userId        String
  achievementId String
  unlockedAt    DateTime @default(now())

  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievement Achievement @relation(fields: [achievementId], references: [id])

  @@unique([userId, achievementId])
}
```

---

## 5. UI/UX 설계

### 5.1 로그인 화면

```
┌─────────────────────────────────────┐
│                                     │
│         [마스코트 캐릭터]            │
│        "환영합니다! 🎉"              │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🔵 Google로 계속하기        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🍎 Apple로 계속하기         │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  💬 카카오로 계속하기         │   │
│  └─────────────────────────────┘   │
│                                     │
│         ─────── 또는 ───────        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  📧 이메일로 계속하기         │   │
│  └─────────────────────────────┘   │
│                                     │
│  처음이신가요? 회원가입             │
│                                     │
└─────────────────────────────────────┘
```

### 5.2 온보딩 플로우 (신규 회원)

```
[1단계: 환영]
     ↓
[2단계: 닉네임 설정]
     ↓
[3단계: 모국어 선택]
     ↓
[4단계: 한국어 레벨 테스트 (선택)]
     ↓
[5단계: 학습 목표 설정]
     ↓
[완료: 메인 화면]
```

### 5.3 프로필 화면

```
┌─────────────────────────────────────┐
│  ←  프로필                          │
│                                     │
│       ┌─────────┐                   │
│       │  🖼️    │  김민수            │
│       │ Avatar │  minsu@email.com  │
│       └─────────┘                   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  🔥 연속 학습         12일          │
│  ⭐ 총 경험치         2,450 XP      │
│  📚 학습한 단어       156개         │
│  🏆 획득 업적         8개           │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  ⚙️ 설정                            │
│  📊 상세 통계                       │
│  🏆 업적 목록                       │
│  ❓ 도움말                          │
│  🚪 로그아웃                        │
│                                     │
└─────────────────────────────────────┘
```

---

## 6. 인증 플로우

### 6.1 소셜 로그인 플로우

```
[사용자] → [로그인 버튼 클릭]
              ↓
[NextAuth] → [OAuth Provider로 리다이렉트]
              ↓
[Provider] → [사용자 인증]
              ↓
[NextAuth] → [콜백 처리]
              ↓
          ┌───────────────┐
          │ 기존 사용자?   │
          └───────┬───────┘
                  │
     ┌────────────┴────────────┐
     │                         │
   [예]                       [아니오]
     ↓                         ↓
[세션 생성]              [계정 생성]
     ↓                         ↓
[메인 화면]              [온보딩 플로우]
```

### 6.2 이메일 로그인 플로우

```
[사용자] → [이메일/비밀번호 입력]
              ↓
[서버] → [자격 증명 검증]
              ↓
          ┌───────────────┐
          │    유효?      │
          └───────┬───────┘
                  │
     ┌────────────┴────────────┐
     │                         │
   [예]                       [아니오]
     ↓                         ↓
[세션 생성]              [에러 표시]
     ↓
[메인 화면]
```

---

## 7. 보안 고려사항

### 7.1 필수 보안 조치

1. **HTTPS 강제**
   - Vercel에서 자동 적용됨

2. **CSRF 보호**
   - NextAuth에서 자동 처리

3. **세션 관리**
   - JWT 또는 Database 세션 선택
   - 적절한 만료 시간 설정 (7일 권장)

4. **비밀번호 정책** (이메일 가입 시)
   - 최소 8자
   - 영문 + 숫자 조합 권장
   - bcrypt 해싱

5. **Rate Limiting**
   - 로그인 시도 제한 (5회/분)
   - API 요청 제한

### 7.2 개인정보 보호

1. **최소 수집 원칙**
   - 이메일, 이름, 프로필 사진만 수집
   - 불필요한 정보 요청 금지

2. **데이터 삭제**
   - 계정 삭제 시 모든 데이터 삭제
   - 30일 유예 기간 후 영구 삭제

3. **개인정보처리방침**
   - 명확한 약관 제공
   - 동의 절차 구현

---

## 8. 구현 로드맵

### Phase 1: 기본 인증 (1주)

```
Day 1-2: 환경 설정
- [ ] NextAuth.js 설치 및 설정
- [ ] Prisma 설정 및 DB 연결
- [ ] 기본 스키마 마이그레이션

Day 3-4: 소셜 로그인
- [ ] Google OAuth 설정
- [ ] 로그인/로그아웃 UI 구현
- [ ] 세션 관리 테스트

Day 5-7: 이메일 로그인
- [ ] 이메일/비밀번호 인증 구현
- [ ] 회원가입 폼 구현
- [ ] 비밀번호 재설정 (선택)
```

### Phase 2: 사용자 프로필 (1주)

```
- [ ] 온보딩 플로우 구현
- [ ] 프로필 페이지 구현
- [ ] 닉네임/설정 변경 기능
- [ ] 계정 삭제 기능
```

### Phase 3: 학습 데이터 연동 (1주)

```
- [ ] UserProgress 테이블 연동
- [ ] 학습 완료 시 데이터 저장
- [ ] 진도 불러오기 구현
- [ ] 로컬 → 서버 데이터 마이그레이션
```

### Phase 4: 게임화 요소 (1주)

```
- [ ] XP 시스템 구현
- [ ] 연속 학습 (Streak) 로직
- [ ] 업적 시스템 구현
- [ ] 랭킹 시스템 (선택)
```

---

## 9. 파일 구조 (예상)

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts      # NextAuth API 라우트
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx          # 로그인 페이지
│   │   ├── register/
│   │   │   └── page.tsx          # 회원가입 페이지
│   │   └── onboarding/
│   │       └── page.tsx          # 온보딩 페이지
│   └── profile/
│       └── page.tsx              # 프로필 페이지
│
├── lib/
│   ├── auth.ts                   # NextAuth 설정
│   ├── prisma.ts                 # Prisma 클라이언트
│   └── actions/
│       ├── auth.ts               # 인증 관련 서버 액션
│       └── user.ts               # 사용자 관련 서버 액션
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── SocialLoginButtons.tsx
│   │   └── UserMenu.tsx
│   └── profile/
│       ├── ProfileCard.tsx
│       └── SettingsForm.tsx
│
└── prisma/
    └── schema.prisma             # 데이터베이스 스키마
```

---

## 10. 비용 예상

### 무료 티어로 시작 가능

| 서비스 | 무료 티어 | 초과 시 비용 |
|-------|----------|-------------|
| Vercel | 100GB 대역폭 | $20/월~ |
| Supabase (DB) | 500MB, 2개 프로젝트 | $25/월~ |
| Neon (DB 대안) | 3GB, 무제한 프로젝트 | $19/월~ |
| Google OAuth | 무료 | 무료 |
| Apple OAuth | 개발자 계정 ($99/년) | - |
| Kakao OAuth | 무료 | 무료 |

**초기 예상 비용: $0** (무료 티어 내)

---

## 11. 결정 필요 사항

### 11.1 인증 방식
- [ ] Google만 vs Google + 이메일 vs 전체

### 11.2 데이터베이스
- [ ] Supabase vs Neon vs PlanetScale

### 11.3 세션 방식
- [ ] JWT (빠름, 서버리스 친화) vs Database (보안, 무효화 용이)

### 11.4 추가 기능
- [ ] 소셜 로그인 제공자 (Apple, Kakao)
- [ ] 이메일 인증 필수 여부
- [ ] 비밀번호 재설정 기능

---

## 12. 설정 가이드

### 12.1 Supabase 설정

1. https://supabase.com 에서 새 프로젝트 생성
2. Project Settings > Database > Connection string (URI) 복사
3. `.env` 파일에 DATABASE_URL 설정

### 12.2 Google OAuth 설정

1. https://console.cloud.google.com 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. APIs & Services > Credentials > Create Credentials > OAuth 2.0 Client ID
4. Application type: Web application
5. Authorized JavaScript origins:
   - `http://localhost:3000` (개발)
   - `https://your-domain.vercel.app` (프로덕션)
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (개발)
   - `https://your-domain.vercel.app/api/auth/callback/google` (프로덕션)
7. Client ID와 Client Secret을 `.env`에 설정

### 12.3 환경 변수 설정

```bash
# .env 파일
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
AUTH_SECRET="openssl rand -base64 32 로 생성"
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
```

### 12.4 데이터베이스 마이그레이션

```bash
npx prisma migrate dev --name init
```

### 12.5 Vercel 환경 변수

Vercel Dashboard > Project > Settings > Environment Variables에 위 변수들 추가

---

*작성일: 2024년*
*버전: 1.0*
