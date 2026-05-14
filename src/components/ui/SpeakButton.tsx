"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { speakKorean } from "@/lib/tts";

interface SpeakButtonProps {
  text: string;
  rate?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost";
  ariaLabel?: string;
  className?: string;
}

const sizeStyles = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const iconSizes = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export default function SpeakButton({
  text,
  rate = 0.9,
  size = "md",
  variant = "default",
  ariaLabel = "발음 듣기",
  className = "",
}: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) return;
    setIsSpeaking(true);
    try {
      await speakKorean(text, { rate });
    } catch (err) {
      console.warn("[TTS]", err);
    } finally {
      setTimeout(() => setIsSpeaking(false), 300);
    }
  };

  const baseStyle =
    variant === "ghost"
      ? "text-primary hover:bg-primary/10"
      : "bg-primary/10 text-primary hover:bg-primary/20";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
      transition={isSpeaking ? { duration: 0.6, repeat: Infinity } : {}}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full transition-colors ${sizeStyles[size]} ${baseStyle} ${className}`}
    >
      <Volume2 className={iconSizes[size]} />
    </motion.button>
  );
}
