export interface SpeakOptions {
  rate?: number;
  pitch?: number;
}

async function isNative(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const { Capacitor } = await import("@capacitor/core");
  return Capacitor.isNativePlatform();
}

export async function speakKorean(
  text: string,
  options: SpeakOptions = {},
): Promise<void> {
  const { rate = 0.9, pitch = 1.0 } = options;

  if (await isNative()) {
    const { TextToSpeech } = await import("@capacitor-community/text-to-speech");
    try {
      await TextToSpeech.stop();
    } catch {
      // 재생 중인 음성이 없을 때 발생하는 에러는 무시
    }
    await TextToSpeech.speak({
      text,
      lang: "ko-KR",
      rate,
      pitch,
      volume: 1.0,
      category: "ambient",
    });
    return;
  }

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    throw new Error("이 환경은 음성 합성을 지원하지 않습니다.");
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = rate;
  utterance.pitch = pitch;
  window.speechSynthesis.speak(utterance);
}

export async function stopSpeaking(): Promise<void> {
  if (await isNative()) {
    const { TextToSpeech } = await import("@capacitor-community/text-to-speech");
    try {
      await TextToSpeech.stop();
    } catch {
      // 무시
    }
    return;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export async function isKoreanTtsAvailable(): Promise<boolean> {
  if (await isNative()) {
    const { TextToSpeech } = await import("@capacitor-community/text-to-speech");
    try {
      const { languages } = await TextToSpeech.getSupportedLanguages();
      return languages.some((lang) => lang.toLowerCase().startsWith("ko"));
    } catch {
      return false;
    }
  }
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
