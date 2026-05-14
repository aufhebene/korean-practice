# Korean Practice — 모바일 앱 제작 TASK

웹 앱(Next.js)을 **Capacitor 기반**으로 Android / iOS 네이티브 앱으로 변환하기 위한 작업 목록.

- 우선순위: **네이티브 오디오/푸시 기능** 우선
- 진행 표기:
  - `[ ]` 진행 전
  - `[~]` 진행 중
  - `[x]` 완료

---

## 🤖 Android

### 1단계 — 기반 구축
- [x] **#1. Next.js 정적 export 설정 및 호환성 검토**
  - `next.config.ts`에 `output: 'export'` 추가
  - App Router의 dynamic routes/server actions 사용처 점검
  - FastAPI 백엔드 URL을 `NEXT_PUBLIC_API_BASE_URL` 환경변수로 분리
  - `Image` 컴포넌트 `unoptimized` 설정
  - `npm run build` 후 `out/` 디렉토리 생성 확인
- [x] **#2. Capacitor 초기 설치 및 Android 플랫폼 추가** _(blocked by #1)_
  - `@capacitor/core`, `@capacitor/cli`, `@capacitor/android` 설치
  - `npx cap init` (앱 이름 / 패키지 ID: `com.koreanpractice.app`)
  - `capacitor.config.ts`에 `webDir: 'out'`
  - `npx cap add android`
  - `.gitignore`에 `android/build/`, `android/app/build/` 추가
- [x] **#3. 빌드/동기화 워크플로 스크립트 정리** _(blocked by #2)_
  - `android:build`, `android:open`, `android:run` 스크립트 추가
  - README 또는 CLAUDE.md에 빌드 절차 문서화
- [x] **#4. 에뮬레이터/실기기 동작 테스트 (스모크)** _(blocked by #3)_
  - ✅ AVD `Medium_Phone`(emulator-5554) 부팅
  - ✅ APK 빌드 + 설치 + 실행 (`com.koreanpractice.app/.MainActivity`)
  - ✅ 메인 대시보드, 한글 폰트, Tailwind 스타일, 마스코트 정상
  - ✅ 모든 라우트 로드 확인 (study/vocabulary, grammar, listening, conversation, auth/login)
  - ✅ FastAPI 백엔드 통신 + JWT 인증 + 로그인 상태 UI 반영 검증
  - ⚠️ 뒤로가기는 현재 WebView 히스토리 없을 때 앱 종료 → #9에서 개선 예정
  - Android Studio AVD / 실기기 USB 디버깅
  - 메인 대시보드, 학습, 빈칸채우기, 단어조합, 학습 요약 모달 동작 확인
  - FastAPI JWT 로그인 / 진행도 저장 검증
  - 화면 회전, 뒤로가기, 세이프 에어리어, 폰트, 애니메이션 점검

### 2단계 — 네이티브 기능 (병렬 가능)
- [x] **#5. 한국어 TTS 오디오 기능 추가** _(blocked by #4)_
  - ✅ `@capacitor-community/text-to-speech@8.0.0` 설치
  - ✅ `src/lib/tts.ts` 통합 유틸 (네이티브: Capacitor TTS, 웹: Web Speech API, 동적 import로 SSR 안전)
  - ✅ `src/components/ui/SpeakButton.tsx` 재사용 컴포넌트 (size sm/md/lg, default/ghost variant)
  - ✅ 어휘 학습: 단어 + 예문에 발음 버튼
  - ✅ 회화 학습: 정답 표시 + 핵심 표현에 발음 버튼
  - ✅ 리스닝 학습: 기존 Web Speech 직접 호출을 통합 유틸로 교체
  - ✅ Android 에뮬레이터 실측 검증: ko-KR-language voice로 "여보세요" 합성 성공
  - ⚠️ 첫 사용 시 시스템 설정에서 Korean voice data 다운로드 필요 (실기기는 보통 자동)
- [x] **#6. 로컬 알림으로 스트릭 리마인더 구현** _(blocked by #4)_
  - ✅ `@capacitor/local-notifications@8.1.0` 설치
  - ✅ AndroidManifest 권한: `POST_NOTIFICATIONS`(API 33+), `SCHEDULE_EXACT_ALARM`, `USE_EXACT_ALARM`, `RECEIVE_BOOT_COMPLETED`
  - ✅ `src/lib/notifications.ts`: 권한 요청/확인, 매일 반복 스케줄(`schedule.on.{hour, minute}`), 취소. 동적 import + 웹 no-op
  - ✅ Firestore `UserDoc.reminder { enabled, hour, minute }` 필드, `getReminderSettings`/`setReminderSettings` 헬퍼
  - ✅ `ReminderSettings` 컴포넌트: on/off 토글 + 시간(시 24개·분 0/15/30/45) 선택, 변경 즉시 OS 스케줄 + Firestore 동기화
  - ✅ `/profile`에 통합 (Profile Card 다음 섹션)
  - ✅ `NativeBootstrap`이 사용자 reminder 설정을 구독해서 자동 재적용 (앱 재설치/새 기기/OS 정리 대응)
  - ⚠️ 학습 완료 시 "오늘은 끄고 내일 다시" 로직은 아직 없음 — 매일 같은 시간 단순 반복
- [~] **#7. FCM 푸시 알림 연동** _(blocked by #4)_
  - ✅ `@capacitor/push-notifications@8.0.4` 설치 (총 10개 plugin)
  - ✅ Firestore rules: 기존 update 규칙이 fcmTokens 변경 자동 허용 (email만 금지)
  - ✅ `UserDoc.fcmTokens.{android|ios|web}: { token, updatedAt }` 필드 추가
  - ✅ `src/lib/push.ts`: `requestPushPermission`, `registerPush(uid)` (권한 → register → 토큰 → Firestore 저장 → 이벤트 리스너 부착), `unregisterPushListeners`
  - ✅ `NativeBootstrap`이 로그인된 네이티브 사용자 감지 → 자동 푸시 등록 (uid 변경 시 cleanup)
  - ⚠️ **사용자 액션 필요**: Firebase Console → 프로젝트 설정 → "내 앱"에서 Android 앱(패키지명 `com.koreanpractice.app`) 등록 → `google-services.json` 다운로드 → `android/app/google-services.json`에 배치. 그 후 `npm run android:run`으로 빌드해야 푸시가 동작 (Gradle 플러그인은 이미 `google-services.json` 존재 시 자동 활성화되도록 구성됨)
  - ⚠️ **서버 측 발송 (별도 작업)**: Cloud Functions 또는 Admin SDK로 Firestore의 fcmTokens를 읽어 메시지 전송하는 백엔드는 이번 범위가 아님
- [x] **#8. 스플래시 화면 및 앱 아이콘 적용** _(blocked by #2)_
  - ✅ `scripts/generate-icons.mjs` (sharp + Apple SD Gothic Neo)로 1024×1024 아이콘 + 2732×2732 splash 생성
  - ✅ `@capacitor/assets generate --android`로 mipmap/drawable 74개 자동 생성 (라이트/다크 모두)
  - ✅ `@capacitor/splash-screen@8.0.1` 설치 + `capacitor.config.ts`에 SplashScreen 설정 (배경 #a78bfa, 1.5초)
  - ✅ Adaptive icon: foreground(흰색 "한") + background(보라 #a78bfa) 분리, 16.7% inset
  - ✅ npm script `icons:generate` 추가 (PNG 재생성 → assets generate)
  - 아이콘 디자인: "한" 글자 (마스코트 이모지 대신, 폰트 의존성 회피)
- [x] **#9. 상태바/세이프에어리어 및 모바일 UX 보정** _(blocked by #4)_
  - ✅ 4개 plugin 설치: `@capacitor/status-bar@8.0.2`, `@capacitor/keyboard@8.0.3`, `@capacitor/browser@8.0.3`, `@capacitor/app@8.1.0`
  - ✅ `viewport-fit=cover` + `themeColor=#a78bfa` (`layout.tsx`의 Viewport export)
  - ✅ `globals.css`에 safe-area 유틸 (pt-safe, pb-safe, pl/pr-safe, top-safe, bottom-safe, h-safe-bottom)
  - ✅ `NativeBootstrap` 컴포넌트: StatusBar 색상(#a78bfa) + 흰색 아이콘, 키보드 show/hide 시 body 패딩 조정, 하드웨어 BackButton 처리 (루트면 종료, 아니면 router.back())
  - ✅ `BottomNav` 정비: 라우트를 실제 경로(`/`, `/study/vocabulary`, `/study/conversation`, `/study/grammar`, `/profile`)로 수정, `pb-safe` 적용, body에 `has-bottom-nav` 클래스 토글로 콘텐츠 가림 방지, 로그인/회화 상세 페이지에선 자동 숨김
  - ✅ AuthProvider 에러 배너에도 `pt-safe` 적용 (notch 가림 방지)
  - ✅ `src/lib/external.ts`: 네이티브에선 Capacitor Browser, 웹에선 `window.open` 폴백
  - ⚠️ 안드로이드 실기기/에뮬레이터 검증은 다음 빌드 시
- [x] **#10. Firebase Auth persistence 강화 (재정의됨)** _(blocked by #4)_
  - ✅ Firebase Auth `setPersistence(auth, indexedDBLocalPersistence)` 명시 + `browserLocalPersistence` 폴백 (`firebase.ts`)
  - ✅ `@capacitor/preferences@8.0.1` 설치 (총 9개 plugin)
  - ✅ `src/lib/authBackup.ts`: 사용자 식별 정보 (uid, email, name) OS 보안 저장소 미러링. 네이티브: Capacitor Preferences (Android SharedPreferences / iOS UserDefaults), 웹: localStorage 폴백. **토큰은 저장하지 않음** (Firebase가 관리)
  - ✅ `useAuthStore`: `setFirebaseUser` 시 `saveAuthBackup`, `signOut` 시 `clearAuthBackup`, 새 액션 `hydrateFromBackup` (콜드 스타트용)
  - ✅ `AuthProvider`: Firebase 초기화 전에 `hydrateFromBackup` 먼저 호출해 UI 깜빡임 방지
  - 효과: (1) 콜드 스타트 시 Firebase 로드 전 즉시 "로그인됨" 상태 표시, (2) IndexedDB 손상/초기화 시에도 식별 정보 보존, (3) 향후 native Firebase Persistence 어댑터의 발판
  - 향후 follow-up: Capacitor Preferences 기반 Firebase 공식 `Persistence` 어댑터 구현 (토큰 자체를 OS 보안 저장소에 저장)
- [x] **#11. 오프라인 모드 기본 지원** _(blocked by #4)_
  - ✅ Firestore offline persistence: `initializeFirestore(app, { localCache: persistentLocalCache(...) })` 적용 (Modern API, deprecated된 `enableIndexedDbPersistence` 대신). 폴백 로직 포함
  - ✅ `@capacitor/network@8.0.1` 설치 (총 8개 plugin)
  - ✅ `useNetworkStore` (Zustand): `connected`, `connectionType`, `lastDisconnectedAt`
  - ✅ `NetworkProvider`: 네이티브는 Capacitor Network listener, 웹은 `navigator.onLine` + online/offline 이벤트
  - ✅ `OfflineBanner`: 오프라인 시 상단에 안내 (framer-motion 슬라이드인, safe-area 적용)
  - ✅ `layout.tsx`에 NetworkProvider + OfflineBanner 통합
  - 결과: 오프라인 상태에서 캐시된 어휘/문법/회화/통계 read 가능, 학습 세션 write는 큐잉 후 온라인 복귀 시 자동 sync

### 3단계 — 출시 준비
- [ ] **#12. 릴리스 빌드 서명 및 AAB 생성** _(blocked by #5, #6, #8, #9, #10)_
  - keystore 생성 (`keytool -genkey`) + 안전 보관
  - `signingConfigs` 설정 (env 변수로 패스워드 주입)
  - `versionCode` / `versionName` 정책
  - `./gradlew bundleRelease` → `.aab` 생성
  - ProGuard/R8 minify 검토
- [ ] **#13. Play Console 등록 및 내부 테스트 트랙 배포** _(blocked by #12)_
  - Google Play Console 개발자 계정 등록 ($25)
  - 앱 등록: 설명, 카테고리(교육), 등급, 개인정보처리방침
  - 스크린샷, 피처 그래픽 1024x500, 아이콘 512x512
  - 내부 테스트 트랙 → 프로덕션 트랙

---

## 🍎 iOS

### 1단계 — 기반 구축
- [ ] **#14. 개발 환경 사전 점검 (macOS / Xcode / CocoaPods)**
  - Xcode 최신 + Command Line Tools
  - CocoaPods 설치
  - Apple Developer 계정 ($99/년)
  - Xcode에 Apple ID 로그인
- [ ] **#15. Capacitor iOS 플랫폼 추가** _(blocked by #1, #14)_
  - `@capacitor/ios` 설치
  - `npx cap add ios` → `ios/` 생성
  - `npx cap sync ios` (Pod install 자동)
  - Bundle Identifier 확인 (`com.koreanpractice.app`)
  - `.gitignore`에 `ios/App/Pods/`, `ios/App/build/` 추가
- [ ] **#16. 빌드/동기화 스크립트 추가** _(blocked by #15)_
  - `ios:build`, `ios:open`, `ios:run`
  - macOS 필요 명시
- [ ] **#17. 시뮬레이터/실기기 동작 테스트 (스모크)** _(blocked by #16)_
  - iOS Simulator (iPhone 15/16 + 구형 1대)
  - Signing & Capabilities → Team 선택
  - 실기기: USB + Trust + 개발자 모드 (iOS 16+)
  - 전 페이지 동작 / FastAPI / Safe Area / 회전 / 폰트 / 애니메이션 검증

### 2단계 — 네이티브 기능 검증 (Android 작업 결과 재사용)
- [ ] **#18. 한국어 TTS 동작 검증 및 Info.plist 설정** _(blocked by #5, #17)_
  - AVSpeechSynthesizer ko-KR 음성 검증
  - 음소거 상태 재생 정책 (AVAudioSession)
  - 백그라운드 오디오 모드 검토
- [ ] **#19. 로컬 알림 권한 및 동작 설정** _(blocked by #6, #17)_
  - `UNUserNotificationCenter` 권한 요청 UX
  - foreground 배너 표시 옵션
- [ ] **#20. APNs 푸시 알림 연동** _(blocked by #7, #17)_
  - APNs Authentication Key (.p8) 생성
  - Push Notifications + Background Modes capability
  - Firebase에 APNs key 등록 (FCM 통합 채널 활용 시)
  - Firestore `users/{uid}.fcmTokens` 필드에 device token 저장 (플랫폼 구분)
- [ ] **#21. 앱 아이콘 및 런치 스크린 적용** _(blocked by #8, #15)_
  - `AppIcon.appiconset` 자동 생성
  - LaunchScreen.storyboard (배경 #a78bfa)
  - 마케팅 아이콘 1024x1024 (알파 없음) 보관
- [ ] **#22. Safe Area / 상태바 / 키보드 / 스와이프 백 UX** _(blocked by #9, #17)_
  - StatusBar 다크/라이트
  - 홈 인디케이터 / Dynamic Island 검증
  - Keyboard resize 모드 설정
  - 스와이프 뒤로가기 제스처
  - SFSafariViewController로 외부 링크
- [ ] **#23. Firebase Auth Keychain persistence (재정의됨, iOS)** _(blocked by #10, #17)_
  - 기존: JWT Keychain 저장
  - 변경: Firebase는 기본 IndexedDB persistence 사용. iOS WebView에서도 동작 확인. 향후 Keychain 기반 custom persistence 검토
- [ ] **#24. 오프라인 모드 iOS 동작 검증** _(blocked by #11, #17)_
  - `@capacitor/network` Wi-Fi/Cellular/None 이벤트
  - 비행기 모드 토글 시뮬레이션
- [ ] **#25. App Tracking Transparency / 개인정보 권한 검토** _(blocked by #15)_
  - Info.plist Usage Description (한/영)
  - `PrivacyInfo.xcprivacy` 작성 (2024+ 필수)
  - third-party SDK privacy manifest 확인
  - 개인정보처리방침 URL

### 3단계 — 출시 준비
- [ ] **#26. 인증서 / 프로비저닝 프로파일 / 아카이브 빌드** _(blocked by #18, #19, #21, #22, #23, #24, #25)_
  - Distribution Certificate / Provisioning Profile
  - Bundle version / Build number 정책
  - Xcode → Product → Archive
  - Organizer Validate App 통과
- [ ] **#27. App Store Connect 등록 및 TestFlight 배포** _(blocked by #26)_
  - 앱 생성: 이름, SKU, Bundle ID 매칭
  - 카테고리(교육), 설명(한/영), 키워드, URL, 개인정보처리방침
  - 스크린샷 (6.7" iPhone 필수)
  - 연령 등급 / 콘텐츠 권한
  - TestFlight 내부 테스터 → 심사 제출 → 출시

---

## 📊 진행 현황

| 플랫폼 | 진행 전 | 진행 중 | 완료 | 합계 |
|---|---:|---:|---:|---:|
| Android | 8 | 0 | 5 | 13 |
| iOS | 14 | 0 | 0 | 14 |
| Firebase 마이그레이션 | 0 | 1 | 9 | 10 |
| **합계** | **22** | **1** | **14** | **37** |

---

## 🔥 Firebase 마이그레이션 (FastAPI/Render → Firebase Auth + Firestore)

> Render 콜드 스타트 제거, 인프라 단순화, 50K MAU 무료. 계획서: `~/.claude/plans/dynamic-dancing-starfish.md`

- [x] **#28. Bootstrap: 패키지 설치 + firebase.ts + 설정 파일**
  - `firebase@12.12.1` 설치
  - `src/lib/firebase.ts` lazy getter (SSR 안전)
  - `firestore.rules`, `firebase.json`, `.env.local.example`, `.gitignore` 갱신
- [x] **#29. srs.ts 순수 helper 추가**
  - `nextReviewDate`, `isMastered`, `ymdUTC`, `bumpStreak`, `categorizeItemId`
- [x] **#30. firestore.ts 데이터 액세스 레이어**
  - `ensureUserDoc`, `getUserDoc`, `updateUserName`, `getStats`, `getRecentStudySessions`, `submitStudySession` (runTransaction)
- [x] **#31. useAuthStore + AuthProvider 재작성**
  - Firebase User 기반, dynamic import (SSR 안전)
- [x] **#32. Login 페이지 재작성**
  - 아이디 → 이메일, Google 로그인 버튼 (네이티브에선 자동 숨김)
- [x] **#33. Study/홈/Profile 페이지 update**
  - 모든 호출 token → uid, snake_case → camelCase (item_id→itemId, quiz_type→quizType)
- [x] **#34. Dead code 제거 + server/ 삭제 + deps 정리**
  - 삭제: `server/`, `prisma/`, `prisma.config.ts`, `requirements.txt`, `SessionProvider.tsx`, `lib/api.ts`
  - 제거된 deps: next-auth, @auth/*, @supabase/*, @prisma/*, pg, @types/pg
- [~] **#35. Capacitor sync + 에뮬레이터 검증** ⚠️ Firebase Console 설정 + `.env.local` 필요
- [x] **#36. 문서 업데이트 (CLAUDE.md, tasks.md)**
- [~] **#37. 네이티브 Google Sign-In (Capacitor plugin)** _(follow-up)_
  - ✅ `@capacitor-firebase/authentication@8.2.0` 설치 (Capacitor 8 + firebase 12 지원). 총 11개 plugin
    - 처음에 `@codetrix-studio/capacitor-google-auth` 시도했으나 peer deps이 Capacitor 6 고정이라 교체
  - ✅ `capacitor.config.ts`에 `FirebaseAuthentication { skipNativeAuth: true, providers: ['google.com'] }` 설정 — 네이티브 Firebase SDK 건너뛰고 Web SDK로 일관 처리
  - ✅ `useAuthStore.signInGoogle` 분기:
    - 네이티브: `FirebaseAuthentication.signInWithGoogle({ skipNativeAuth: true })` → `idToken` → `GoogleAuthProvider.credential(idToken)` → `signInWithCredential(auth, credential)`
    - 웹: 기존 `signInWithPopup` 유지
  - ✅ `signOut`에서 네이티브 `FirebaseAuthentication.signOut()`도 호출 (다음 로그인 시 계정 선택 다이얼로그 표시)
  - ✅ `login` 페이지에서 네이티브 분기 제거 — Google 버튼이 모든 플랫폼에 노출
  - ⚠️ **사용자 액션 필요** (외부 의존성):
    1. Firebase Console → Authentication → Sign-in method → Google **활성화** (이미 됐으면 패스)
    2. **#7 작업의 google-services.json**이 `android/app/google-services.json`에 있어야 함
    3. **SHA-1 fingerprint** 등록: 디버그 키 → `cd android && ./gradlew signingReport` 출력의 SHA1 → Firebase Console → 프로젝트 설정 → Android 앱 → "지문 추가". 릴리스 빌드도 별도 SHA-1 필요
    4. 등록 후 새 `google-services.json` 다운로드해서 다시 배치 (OAuth client_id가 추가됨)
    5. `npm run android:run` 으로 빌드 + 실행
