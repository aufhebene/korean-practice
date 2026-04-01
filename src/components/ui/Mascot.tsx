"use client";

import { motion, type Transition } from "framer-motion";

interface MascotProps {
  mood?: "happy" | "excited" | "thinking" | "sad" | "neutral";
  size?: "sm" | "md" | "lg";
  message?: string;
}

type MoodAnimation = {
  y?: number[];
  rotate?: number[];
  scale?: number[];
  transition: Transition;
};

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

  const expressions = {
    happy: "😊",
    excited: "🎉",
    thinking: "🤔",
    sad: "😢",
    neutral: "🐯",
  };

  const animations: Record<string, MoodAnimation> = {
    happy: {
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" as const },
    },
    excited: {
      rotate: [-5, 5, -5],
      scale: [1, 1.1, 1],
      transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" as const },
    },
    thinking: {
      rotate: [0, 5, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const },
    },
    sad: {
      y: [0, 2, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" as const },
    },
    neutral: {
      y: [0, -3, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const },
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
