"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import Bubble from "@/components/Bubble";

export default function StoriesPage() {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      colorClass: string;
      randomOffset: number;
    }>
  >([]);

  const handleSubmit = () => {
    if (message.trim()) {
      setIsSubmitted(true);

      // Create bubbles
      const colors = [
        "from-blue-300 to-blue-500",
        "from-purple-300 to-purple-500",
        "from-pink-300 to-pink-500",
        "from-indigo-300 to-indigo-500",
        "from-teal-300 to-teal-500",
        "from-green-300 to-green-500",
        "from-yellow-300 to-yellow-500",
      ];

      const newBubbles = [...Array(25)].map((_, i) => ({
        id: Date.now() + i,
        x: 20 + Math.random() * 360, // More spread out horizontally (20-380px)
        y: 150 + Math.random() * 100, // Random vertical position (150-250px)
        size: 100 + Math.random() * 100, // Bigger bubbles (100-200px)
        colorClass: colors[Math.floor(Math.random() * colors.length)],
        randomOffset: (Math.random() - 0.5) * 20, // Increased random offset for more movement
      }));

      setBubbles(newBubbles);

      // Reset after animation
      setTimeout(() => {
        setMessage("");
        setIsSubmitted(false);
        setBubbles([]);
      }, 4000);
    }
  };

  const popBubble = (id: number) => {
    setBubbles((prevBubbles) =>
      prevBubbles.filter((bubble) => bubble.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blxue-50 to-white overflow-x-hidden">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 motion-gpu"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-blue-800 mb-6">
            Stories
          </h1>
          <p className="font-body text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Chia sẻ mọi áp lực của bạn vào đây nhé!
          </p>
        </motion.div>

        {/* Lofi Audio Player */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 motion-gpu"
        >
          <AudioPlayer
            src="/audio/lo-fi-alarm-clock.mp3"
            frequency={432}
            duration={59}
            loop={true}
            title="Nhạc Lofi thư giãn"
            className="max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Message Writing Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-2xl mx-auto motion-gpu"
        >
          <div className="relative overflow-hidden">
            {/* Balloon Container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-primary-blue/20 overflow-hidden">
              {/* Balloon Shape Background */}
              <div className="absolute inset-0 bg-linear-to-b from-pink-100 to-blue-100 rounded-3xl opacity-50"></div>

              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6 text-center relative z-10">
                Viết tâm sự vào bong bóng
              </h3>

              <div className="relative z-10">
                <motion.textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hãy viết ra những tâm sự, lo lắng hay bất kỳ điều gì bạn muốn chia sẻ với trời mây..."
                  className="w-full h-48 p-4 border-2 border-primary-blue/30 rounded-xl resize-none focus:outline-none focus:border-primary-blue font-body text-foreground placeholder-foreground/50 bg-white/70 backdrop-blur-sm motion-gpu"
                  disabled={isSubmitted}
                  animate={{
                    opacity: isSubmitted ? 0.3 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                />

                {/* Floating balloon particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-4 bg-linear-to-b from-pink-200 to-blue-200 rounded-full opacity-60 motion-gpu"
                      style={{
                        left: `${15 + i * 12}%`,
                        top: `${5 + (i % 3) * 15}%`,
                      }}
                      animate={{
                        y: [0, -25, 0],
                        rotate: [0, 5, -5, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 4 + i * 0.3,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                onClick={handleSubmit}
                disabled={!message.trim() || isSubmitted}
                className={`w-full mt-6 py-3 px-6 rounded-xl font-heading font-semibold text-lg transition-all duration-300 relative z-10 motion-gpu ${
                  message.trim() && !isSubmitted
                    ? "bg-linear-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white transform shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                whileHover={message.trim() && !isSubmitted ? { scale: 1 } : {}}
                whileTap={message.trim() && !isSubmitted ? { scale: 0.98 } : {}}
                animate={{
                  opacity: isSubmitted ? 0.5 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {isSubmitted
                  ? "Bong bóng đang bay..."
                  : "Thả bong bóng lên trời"}
              </motion.button>
            </div>

            {/* Bubble Animation */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none z-20 overflow-hidden motion-gpu"
                >
                  {bubbles.map((bubble, index) => (
                    <motion.div
                      key={bubble.id}
                      className="absolute motion-gpu"
                      style={{
                        left: `${bubble.x}px`,
                        top: `${bubble.y}px`,
                      }}
                      animate={{
                        y: [0, -1000],
                        x: [0, bubble.randomOffset],
                        scale: [1, 0.75],
                        opacity: [1, 0],
                      }}
                      transition={{
                        duration: 7,
                        ease: "easeOut",
                        delay: index * 0.01, // Use index for consistent delay
                      }}
                    >
                      <Bubble
                        bubble={bubble}
                        onPop={() => popBubble(bubble.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
