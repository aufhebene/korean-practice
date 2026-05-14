import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.koreanpractice.app',
  appName: 'Korean Practice',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      launchFadeOutDuration: 300,
      backgroundColor: '#a78bfa',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    FirebaseAuthentication: {
      // 네이티브 Firebase SDK를 건너뛰고 Web SDK만 사용 (이미 Web SDK 기반이라 일관성 유지)
      skipNativeAuth: true,
      providers: ['google.com'],
    },
  },
};

export default config;
