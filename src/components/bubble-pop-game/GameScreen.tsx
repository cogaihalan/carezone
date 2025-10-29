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
  const [timeRemaining, setTimeRemaining] = useState(30);
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
    }, 800);

    return () => clearInterval(interval);
  }, [generateBubble]);

  // Timer countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          // Use a callback to get the current score when timer ends
          setScore((currentScore) => {
            onGameOver(currentScore);
            return currentScore;
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onGameOver]);

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

      {/* Timer and Score Display */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.div
          className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-sm text-gray-600">Time</div>
            <div className={`text-2xl font-bold ${timeRemaining <= 10 ? 'text-red-500' : 'text-purple-700'}`}>
              {timeRemaining}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="text-sm text-gray-600">Score</div>
            <div className="text-2xl font-bold text-green-600">{score}</div>
          </div>
        </motion.div>
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
