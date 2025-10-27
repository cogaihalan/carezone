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
            src="/audio/lo-fi-alarm-clock.mp3"
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
          <div className="relative">
            {/* Balloon Container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-primary-blue/20 overflow-hidden">
              {/* Balloon Shape Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-blue-100 rounded-3xl opacity-50"></div>
              
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6 text-center relative z-10">
                Viết tâm sự vào bong bóng
              </h3>

              <div className="relative z-10">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hãy viết ra những tâm sự, lo lắng hay bất kỳ điều gì bạn muốn chia sẻ với trời mây..."
                  className="w-full h-48 p-4 border-2 border-primary-blue/30 rounded-xl resize-none focus:outline-none focus:border-primary-blue font-body text-foreground placeholder-foreground/50 bg-white/70 backdrop-blur-sm"
                  disabled={isSubmitted}
                />

                {/* Floating balloon particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-4 bg-gradient-to-b from-pink-200 to-blue-200 rounded-full opacity-60"
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
                className={`w-full mt-6 py-3 px-6 rounded-xl font-heading font-semibold text-lg transition-all duration-300 relative z-10 ${
                  message.trim() && !isSubmitted
                    ? "bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white transform hover:scale-105 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                whileHover={message.trim() && !isSubmitted ? { scale: 1.02 } : {}}
                whileTap={message.trim() && !isSubmitted ? { scale: 0.98 } : {}}
              >
                {isSubmitted ? "Bong bóng đang bay..." : "Thả bong bóng lên trời"}
              </motion.button>
            </div>

            {/* Balloon Animation */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 0 }}
                  animate={{ 
                    opacity: [1, 1, 0], 
                    scale: [1, 1.2, 0.5],
                    y: [0, -100, -200]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 2,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 pointer-events-none z-20"
                >
                  {/* Multiple balloons floating up */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-16 h-20 bg-gradient-to-b from-pink-200 to-blue-200 rounded-full opacity-80"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: "50%",
                      }}
                      animate={{
                        y: [0, -150 - i * 50],
                        x: [0, (i - 1) * 20],
                        rotate: [0, 360],
                        scale: [1, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        ease: "easeOut"
                      }}
                    >
                      {/* Balloon string */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-400"></div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
