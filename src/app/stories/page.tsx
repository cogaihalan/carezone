"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import Baymax from "@/components/Baymax";

export default function StoriesPage() {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBaymax, setShowBaymax] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      setIsSubmitted(true);
      setShowBaymax(true);

      // Reset after animation
      setTimeout(() => {
        setMessage("");
        setIsSubmitted(false);
        setShowBaymax(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-primary-blue/5">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
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
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <AudioPlayer
            src="/audio/lofi-music.mp3"
            frequency={432}
            duration={240}
            loop={true}
            title="Nhạc Lofi thư giãn"
            className="max-w-2xl mx-auto"
          />
        </motion.div>

        {/* Message Writing Area */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-blue/20">
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-6 text-center">
              Viết tâm sự của bạn
            </h3>

            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hãy viết ra những áp lực, lo lắng hay bất kỳ điều gì bạn muốn chia sẻ..."
                className="w-full h-48 p-4 border-2 border-primary-blue/30 rounded-xl resize-none focus:outline-none focus:border-primary-blue font-body text-foreground placeholder-foreground/50 bg-white/50"
                disabled={isSubmitted}
              />

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-blue/40 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + (i % 3) * 20}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleSubmit}
              disabled={!message.trim() || isSubmitted}
              className={`w-full mt-6 py-3 px-6 rounded-xl font-heading font-semibold text-lg transition-all duration-300 ${
                message.trim() && !isSubmitted
                  ? "bg-primary-blue hover:bg-primary-blue/80 text-white transform hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              whileHover={message.trim() && !isSubmitted ? { scale: 1.02 } : {}}
              whileTap={message.trim() && !isSubmitted ? { scale: 0.98 } : {}}
            >
              {isSubmitted ? "Đang gửi..." : "Gửi tâm sự"}
            </motion.button>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
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
                  Cảm ơn bạn đã gửi tâm sự vào trời mây
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-body text-lg text-foreground/80"
                >
                  Bạn đã làm tốt rồi! 💙
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Baymax Comfort Animation */}
        <AnimatePresence>
          {showBaymax && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="fixed bottom-8 right-8 z-40"
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Baymax size="medium" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-blue/20 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 15}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
