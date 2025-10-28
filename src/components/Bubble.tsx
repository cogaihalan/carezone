"use client";

import { motion } from "framer-motion";

interface BubbleProps {
  bubble: {
    id: number;
    x: number;
    y: number;
    size: number;
    colorClass: string;
  };
  onPop: () => void;
}

export default function Bubble({ bubble, onPop }: BubbleProps) {
  return (
    <motion.div
      className={`absolute rounded-full bg-gradient-to-br ${bubble.colorClass} cursor-pointer`}
      style={{
        width: bubble.size,
        height: bubble.size,
        left: bubble.x,
        top: bubble.y,
      }}
      initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        scale: 1.5,
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.1 },
      }}
      onClick={onPop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute w-[30%] h-[30%] rounded-full bg-white/50 top-[15%] left-[15%]" />
      <div className="absolute w-[15%] h-[15%] rounded-full bg-white/70 top-[25%] left-[25%]" />
    </motion.div>
  );
}
