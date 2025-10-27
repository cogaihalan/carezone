"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BaymaxProps {
  size?: "small" | "medium" | "large";
  showHeart?: boolean;
  className?: string;
}

export default function Baymax({
  size = "medium",
  showHeart = true,
  className = "",
}: BaymaxProps) {
  const [isHugging, setIsHugging] = useState(false);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  };

  const heartSizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHugging(true);
      setTimeout(() => setIsHugging(false), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} bg-white rounded-full border-4 border-primary-blue/30 flex items-center justify-center relative overflow-hidden`}
        animate={{
          scale: isHugging ? 1.1 : 1,
          rotate: isHugging ? [0, -5, 5, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {/* Baymax body */}
        <div className="w-full h-full bg-gradient-to-b from-white to-primary-blue/10 rounded-full flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-2 mb-2">
            <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
            <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
          </div>

          {/* Smile */}
          <div className="w-6 h-3 border-b-2 border-primary-blue rounded-full"></div>
        </div>

        {/* Heart */}
        {showHeart && (
          <motion.div
            className={`absolute ${heartSizeClasses[size]} text-red-400`}
            animate={{
              scale: isHugging ? [1, 1.2, 1] : 1,
              opacity: isHugging ? [0.7, 1, 0.7] : 0.7,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        )}

        {/* Hugging arms */}
        {isHugging && (
          <>
            <motion.div
              className="absolute w-8 h-2 bg-white rounded-full border border-primary-blue/30"
              style={{ top: "20%", left: "-10%" }}
              animate={{
                rotate: [0, -30, 0],
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-8 h-2 bg-white rounded-full border border-primary-blue/30"
              style={{ top: "20%", right: "-10%" }}
              animate={{
                rotate: [0, 30, 0],
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-blue/40 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
