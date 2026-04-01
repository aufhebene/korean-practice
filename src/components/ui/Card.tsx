"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ className = "", hover = false, children }: CardProps) {
  const baseStyles = "bg-card rounded-2xl shadow-sm border border-gray-100";
  const hoverStyles = hover ? "hover:shadow-md transition-shadow" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseStyles} ${hoverStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
