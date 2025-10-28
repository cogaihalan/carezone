"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bubble from "@/components/Bubble";
import { useSound } from "@/hooks/use-sound";
import { X } from "lucide-react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  colorClass: string;
  speedX: number;
  speedY: number;
}

export default function GameScreen({
  onGameOver,
  onExit,
}: {
  onGameOver: (score: number) => void;
  onExit: () => void;
}) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playSound } = useSound();

  const isMobile = window.innerWidth <= 768;
  const speedBoost = isMobile ? 2 : 1; // Boost speed on mobile

  // Generate a new bubble
  const generateBubble = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;

    const size = Math.floor(Math.random() * 60) + 50; // Size of bubble will be between 50 to 109
    const x = Math.floor(Math.random() * (containerWidth - size));

    const colors = [
      "from-blue-300 to-blue-500",
      "from-purple-300 to-purple-500",
      "from-pink-300 to-pink-500",
      "from-indigo-300 to-indigo-500",
      "from-teal-300 to-teal-500",
      "from-green-300 to-green-500",
      "from-yellow-300 to-yellow-500",
    ];

    const colorClass = colors[Math.floor(Math.random() * colors.length)];

    const newBubble = {
      id: Date.now() + Math.random(),
      x,
      y: containerHeight + size,
      size,
      colorClass,
      speedX: (Math.random() - 0.5) * 1,
      speedY: (-Math.random() * 1.5 - 0.5) * speedBoost, // Upward speed
    };

    setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
  }, [speedBoost]);

  // Pop a bubble
  const popBubble = (id: number) => {
    playSound("/audio/pop.mp3");
    setBubbles((prevBubbles) =>
      prevBubbles.filter((bubble) => bubble.id !== id)
    );
    setScore((prevScore) => prevScore + 1);
  };

  // Update bubble positions
  useEffect(() => {
    let animationFrameId: number;

    const updateBubbles = (): void => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;

      setBubbles((prevBubbles) => {
        let missedBubbles: number = 0;

        const updatedBubbles = prevBubbles
          .map((bubble: Bubble) => {
            const newX = bubble.x + bubble.speedX;
            const newY = bubble.y + bubble.speedY;
            let newSpeedX = bubble.speedX;
            let newSpeedY = bubble.speedY;

            // Bounce off walls
            if (newX <= 0 || newX >= containerWidth - bubble.size) {
              newSpeedX = -newSpeedX;
            }

            // If bubble goes off top, count as missed
            if (newY < -bubble.size) {
              missedBubbles++;
              return null;
            }

            // Slight randomness
            newSpeedX += (Math.random() - 0.5) * 0.1;
            newSpeedY += (Math.random() - 0.5) * 0.05;

            newSpeedX = Math.max(-2, Math.min(2, newSpeedX));
            newSpeedY = Math.max(-3, Math.min(-0.5, newSpeedY));

            return {
              ...bubble,
              x: newX,
              y: newY,
              speedX: newSpeedX,
              speedY: newSpeedY,
            };
          })
          .filter((b): b is Bubble => b !== null);

        if (missedBubbles > 0) {
          setLives((prev) => prev - missedBubbles);
        }

        return updatedBubbles;
      });

      animationFrameId = requestAnimationFrame(updateBubbles);
    };

    animationFrameId = requestAnimationFrame(updateBubbles);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Generate new bubbles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      generateBubble();
    }, 600);

    return () => clearInterval(interval);
  }, [generateBubble]);

  // Commenting this part cuz this game will never ends. Will Uncomment this part after adding the difficulty logic
  useEffect(() => {
    if (lives <= 0) {
      onGameOver(score);
    }
  }, [lives, score, onGameOver]);

  return (
    <div
      ref={containerRef}
      className="relative h-[80vh] overflow-hidden rounded-2xl bg-linear-to-b from-blue-50 to-purple-100 shadow-xl container"
    >
      <div className="absolute top-4 left-4 z-10">
        <motion.button
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md text-purple-700 hover:bg-white/90 transition-colors motion-gpu"
          onClick={onExit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>
      </div>

      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md flex items-center space-x-4">
        <span className="font-semibold text-purple-700">Score: {score}</span>
        <div className="flex items-center">
          <span className="font-semibold text-red-500">Lives: </span>
          <div className="flex ml-2">
            {lives > 0 &&
              [...Array(lives)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-red-500 mx-0.5"
                ></div>
              ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            bubble={bubble}
            onPop={() => popBubble(bubble.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
