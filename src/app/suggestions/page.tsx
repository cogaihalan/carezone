"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import Baymax from "@/components/Baymax";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function SuggestionsPage() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [isMeditating, setIsMeditating] = useState(false);

  // Meditation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMeditating) {
      interval = setInterval(() => {
        setMeditationTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMeditating]);

  const createBubble = () => {
    const newBubble: Bubble = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 100),
      y: window.innerHeight - 50,
      size: Math.random() * 30 + 20,
      color: ["#87ceeb", "#b0e0e6", "#add8e6"][Math.floor(Math.random() * 3)],
    };
    setBubbles((prev) => [...prev, newBubble]);
  };

  const popBubble = (id: number) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
    setScore((prev) => prev + 1);
  };

  const startMeditation = () => {
    setIsMeditating(true);
    setMeditationTime(0);
  };

  const stopMeditation = () => {
    setIsMeditating(false);
  };

  const startBubbleGame = () => {
    setScore(0);
    setBubbles([]);
    setShowCompletion(false);

    const interval = setInterval(() => {
      createBubble();
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setTimeout(() => {
        setShowCompletion(true);
      }, 2000);
    }, 30000); // 30 seconds game
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-primary-blue/5">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
            Gợi ý
          </h1>
          <p className="font-body text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Các hoạt động giải tỏa áp lực nhẹ nhàng
          </p>
        </motion.div>

        {/* Stream Audio Player */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <AudioPlayer
            src="/audio/stream-sounds.mp3"
            frequency={396}
            duration={300}
            loop={true}
            title="Tiếng suối thư giãn"
            className="max-w-2xl mx-auto"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Meditation Corner */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-blue/20"
          >
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-6 text-center">
              Góc tĩnh tâm
            </h3>

            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-lg"
                  animate={
                    isMeditating
                      ? {
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, -2, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: isMeditating ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-4xl">🍵</span>
                </motion.div>

                {/* Meditation timer */}
                {isMeditating && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-24 h-24 border-4 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin"></div>
                  </motion.div>
                )}
              </div>

              <p className="font-body text-foreground/70 mb-4">
                Nhìn vào hình ảnh tách trà và tập trung vào một sự vật để làm
                dịu đi các suy nghĩ khác
              </p>

              <div className="mb-6">
                <p className="font-heading font-semibold text-lg text-foreground">
                  Thời gian: {Math.floor(meditationTime / 60)}:
                  {(meditationTime % 60).toString().padStart(2, "0")}
                </p>
              </div>

              <div className="space-x-4">
                <button
                  onClick={startMeditation}
                  disabled={isMeditating}
                  className={`px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 ${
                    isMeditating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-primary-blue hover:bg-primary-blue/80 text-white transform hover:scale-105"
                  }`}
                >
                  Bắt đầu
                </button>
                <button
                  onClick={stopMeditation}
                  disabled={!isMeditating}
                  className={`px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 ${
                    !isMeditating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-red-400 hover:bg-red-500 text-white transform hover:scale-105"
                  }`}
                >
                  Dừng lại
                </button>
              </div>
            </div>
          </motion.div>

          {/* Bubble Game */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-blue/20"
          >
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-6 text-center">
              Minigame thả bong bóng
            </h3>

            <div className="text-center mb-6">
              <p className="font-body text-foreground/70 mb-4">
                Thả bong bóng và click để làm chúng nổ tung!
              </p>

              <div className="mb-4">
                <p className="font-heading font-semibold text-lg text-foreground">
                  Điểm số: {score}
                </p>
              </div>

              <button
                onClick={startBubbleGame}
                className="px-6 py-3 bg-primary-blue hover:bg-primary-blue/80 text-white font-heading font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Bắt đầu game
              </button>
            </div>
          </motion.div>
        </div>

        {/* Completion Message */}
        <AnimatePresence>
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-6"
                >
                  <Baymax size="large" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-heading font-semibold text-2xl text-foreground mb-4"
                >
                  Cảm ơn bạn đã dành thời gian quý báu cho mình
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-body text-lg text-foreground/80"
                >
                  Chúc bạn luôn vững vàng trên con đường học tập sắp tới! 💙
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => setShowCompletion(false)}
                  className="mt-6 px-6 py-3 bg-primary-blue hover:bg-primary-blue/80 text-white font-heading font-semibold rounded-xl transition-all duration-300"
                >
                  Đóng
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubbles */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute rounded-full cursor-pointer"
              style={{
                left: bubble.x,
                top: bubble.y,
                width: bubble.size,
                height: bubble.size,
                backgroundColor: bubble.color,
                opacity: 0.7,
              }}
              animate={{
                y: [bubble.y, -100],
                opacity: [0.7, 0],
                scale: [1, 1.2],
              }}
              transition={{
                duration: 4,
                ease: "easeOut",
              }}
              onClick={() => popBubble(bubble.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
