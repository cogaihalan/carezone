"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import StartScreen from "@/components/bubble-pop-game/StartScreen";

export default function SuggestionsPage() {
  const router = useRouter();
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

  const startMeditation = () => {
    setIsMeditating(true);
    setMeditationTime(0);
  };

  const stopMeditation = () => {
    setIsMeditating(false);
  };

  const navigateToBubbleGame = () => {
    router.push("/bubble-pop-game");
  };

  const navigateToDrawing = () => {
    router.push("/drawing");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 motion-gpu"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-blue-800 mb-6">
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 motion-gpu"
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

        <div className="space-y-8">
          {/* Meditation Corner */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-blue/20 motion-gpu"
          >
            <h3 className="font-heading font-semibold text-2xl text-foreground mb-6 text-center">
              Góc tĩnh tâm
            </h3>

            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 relative">
                <motion.div
                  className="w-full h-full bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-lg motion-gpu"
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
                    className="absolute inset-0 flex items-center justify-center motion-gpu"
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
            {/* Video Container */}
            {isMeditating && (
              <div className="relative w-4/5 mx-auto h-full mt-8">
                <video
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                  onEnded={() => {
                    // Loop the video
                    const video = document.querySelector("video");
                    if (video) {
                      video.currentTime = 0;
                      video.play();
                    }
                  }}
                >
                  <source src="/video/tea.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay with meditation timer */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-6">
                  <div className="text-center text-white">
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      Thời gian thiền định
                    </h3>
                    <p className="font-heading font-bold text-2xl">
                      {Math.floor(meditationTime / 60)}:
                      {(meditationTime % 60).toString().padStart(2, "0")}
                    </p>
                    <p className="font-body text-sm mt-2 opacity-90">
                      Nhìn vào video và tập trung vào hơi thở của bạn
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Bubble Pop Game */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-lg border border-primary-blue/20 motion-gpu"
          >
            <div>
              <h3 className="font-heading font-semibold text-lg md:text-2xl text-foreground mb-2">
                Minigame thả bong bóng
              </h3>
              <button
                onClick={navigateToBubbleGame}
                className="mx-auto px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 bg-primary-blue hover:bg-primary-blue/80 text-white transform"
              >
                Chơi ngay
              </button>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg md:text-2xl text-foreground mb-2">
                Vẽ theo tâm trạng bạn hôm nay
              </h3>
              <button
                onClick={navigateToDrawing}
                className="mx-auto px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 bg-primary-blue hover:bg-primary-blue/80 text-white transform"
              >
                Cùng vẽ nào
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
