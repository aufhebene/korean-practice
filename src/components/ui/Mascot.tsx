"use client";

import { motion } from "framer-motion";

interface MascotProps {
  mood?: "happy" | "excited" | "thinking" | "sad" | "neutral";
  size?: "sm" | "md" | "lg";
  message?: string;
}

export default function Mascot({
  mood = "neutral",
  size = "md",
  message,
}: MascotProps) {
  const sizes = {
    sm: "w-16 h-16 text-4xl",
    md: "w-24 h-24 text-6xl",
    lg: "w-32 h-32 text-7xl",
  };

  // 호랑이 이모지를 마스코트로 사용 (추후 커스텀 일러스트로 교체 가능)
  const expressions = {
    happy: "😊",
    excited: "🎉",
    thinking: "🤔",
    sad: "😢",
    neutral: "🐯",
  };

  const animations = {
    happy: {
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
    excited: {
      rotate: [-5, 5, -5],
      scale: [1, 1.1, 1],
      transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" },
    },
    thinking: {
      rotate: [0, 5, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
    sad: {
      y: [0, 2, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
    neutral: {
      y: [0, -3, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className={`${sizes[size]} flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100 rounded-full shadow-lg`}
        animate={animations[mood]}
      >
        <span role="img" aria-label="mascot">
          {expressions[mood]}
        </span>
      </motion.div>
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white px-4 py-2 rounded-2xl shadow-md border border-gray-100 max-w-xs text-center"
        >
          <p className="text-foreground font-medium">{message}</p>
        </motion.div>
      )}
    </div>
  );
}
