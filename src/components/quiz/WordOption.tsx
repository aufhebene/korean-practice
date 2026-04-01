"use client";

import { motion } from "framer-motion";

interface WordOptionProps {
  word: string;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  correct?: boolean | null;
}

export default function WordOption({
  word,
  onClick,
  disabled = false,
  selected = false,
  correct = null,
}: WordOptionProps) {
  const getStyles = () => {
    if (correct === true) {
      return "bg-success text-white border-success";
    }
    if (correct === false) {
      return "bg-error text-white border-error";
    }
    if (selected) {
      return "bg-primary text-white border-primary";
    }
    return "bg-white text-foreground border-gray-200 hover:border-primary hover:bg-primary/5";
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-3 rounded-xl border-2 font-medium text-lg transition-colors ${getStyles()} ${
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
      }`}
    >
      {word}
    </motion.button>
  );
}
