"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import { Moon, Sun, Volume2, VolumeX, Play, Pause } from "lucide-react";

export default function SafeSpacePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rippleAnimation, setRippleAnimation] = useState<{
    x: number;
    y: number;
    isDark: boolean;
  } | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setRippleAnimation({
      x,
      y,
      isDark: !isDarkMode,
    });

    // Delay the theme change to allow ripple animation to start
    setTimeout(() => {
      setIsDarkMode(!isDarkMode);
    }, 100);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Clean up ripple animation after it completes
  useEffect(() => {
    if (rippleAnimation) {
      const timer = setTimeout(() => {
        setRippleAnimation(null);
      }, 1000); // Match the animation duration
      return () => clearTimeout(timer);
    }
  }, [rippleAnimation]);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-b from-blue-50 to-white"
      }`}
    >
      {/* Ripple animation overlay */}
      <AnimatePresence>
        {rippleAnimation && (
          <motion.div
            className="fixed pointer-events-none z-50"
            style={{
              left: rippleAnimation.x,
              top: rippleAnimation.y,
              transformOrigin: "center",
            }}
            initial={{
              scale: 0,
              opacity: 0.6,
            }}
            animate={{
              scale: 50,
              opacity: 0,
            }}
            exit={{
              scale: 50,
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                rippleAnimation.isDark ? "bg-gray-800" : "bg-white"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Theme toggle */}
        <div className="flex justify-center mb-12">
          <button
            onClick={toggleDarkMode}
            className={`flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-5 h-5" />
                <span className="font-medium">Chế độ sáng</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span className="font-medium">Chế độ tối</span>
              </>
            )}
          </button>
        </div>

        {/* Main content */}
        <div className="text-center">
          {/* Page title */}
          <div className="mb-16 fade-in">
            <h1
              className={`text-5xl md:text-6xl font-bold mb-6 transition-colors duration-500 ${
                isDarkMode ? "text-white" : "text-blue-800"
              }`}
            >
              Safe Space
            </h1>
            <p
              className={`text-2xl transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Góc nghỉ ngơi
            </p>
          </div>

          {/* Audio player */}
          <div
            className={`rounded-2xl shadow-lg p-8 mb-12 max-w-2xl mx-auto transition-all duration-500 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-center mb-6">
              <h2
                className={`text-2xl font-semibold mb-2 transition-colors duration-500 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Pink Noise
              </h2>
              <p
                className={`transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Âm thanh nhẹ nhàng ru ngủ
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={togglePlay}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-600 hover:bg-gray-500 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </button>
            </div>

            <audio ref={audioRef} loop preload="auto" className="hidden">
              <source src="/audio/pink-noise.mp3" type="audio/mpeg" />
              <source src="/audio/pink-noise.ogg" type="audio/ogg" />
              Trình duyệt của bạn không hỗ trợ phát âm thanh.
            </audio>
          </div>

          {/* Rest message */}
          <div
            className={`rounded-2xl shadow-lg p-12 max-w-3xl mx-auto transition-all duration-500 ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`text-3xl font-semibold mb-6 transition-colors duration-500 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              🌙 Hãy nghỉ ngơi và thư giãn
            </div>
            <p
              className={`text-lg leading-relaxed transition-colors duration-500 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Đây là không gian an toàn của bạn. Không có gì cần phải làm,
              <br />
              chỉ cần thở đều và để tâm trí được nghỉ ngơi.
            </p>
          </div>

          {/* Floating elements for ambiance */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div
              className={`absolute top-20 left-10 w-4 h-4 rounded-full opacity-60 animate-pulse ${
                isDarkMode ? "bg-purple-400" : "bg-blue-300"
              }`}
            ></div>
            <div
              className={`absolute top-40 right-20 w-6 h-6 rounded-full opacity-40 animate-pulse delay-1000 ${
                isDarkMode ? "bg-purple-300" : "bg-blue-200"
              }`}
            ></div>
            <div
              className={`absolute bottom-32 left-20 w-3 h-3 rounded-full opacity-50 animate-pulse delay-2000 ${
                isDarkMode ? "bg-purple-500" : "bg-blue-400"
              }`}
            ></div>
            <div
              className={`absolute bottom-20 right-10 w-5 h-5 rounded-full opacity-60 animate-pulse delay-500 ${
                isDarkMode ? "bg-purple-400" : "bg-blue-300"
              }`}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
}
