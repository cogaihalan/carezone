"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import AudioPlayer from "@/components/AudioPlayer";
import Baymax from "@/components/Baymax";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 motion-gpu"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-blue-800 mb-6">
            Chào mừng đến với Carezone
          </h1>
          <p className="font-body text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Trước khi bắt đầu khám phá trang web này, hãy cùng chúng mình thư
            giãn một chút nhé
          </p>
        </motion.div>

        {/* Audio Player Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16 motion-gpu"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Relaxation Audio */}
            <div className="md:col-span-2">
              <div className="flex flex-col gap-4">
                <AudioPlayer
                  src="/audio/tieng_la_roi.mp3"
                  frequency={528}
                  duration={60}
                  loop={true}
                  title="Âm thanh thư giãn - Tiếng lá rơi"
                  className="h-full"
                />
                <AudioPlayer
                  src="/audio/tieng_mua_roi.mp3"
                  frequency={396}
                  duration={137}
                  loop={true}
                  title="Âm thanh thư giãn - Tiếng mưa"
                  className="h-full"
                />
              </div>
            </div>

            {/* Baymax Companion */}
            <div className="flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="motion-gpu"
              >
                <Baymax size="large" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16 motion-gpu"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-blue/20 text-center">
            <div className="w-16 h-16 bg-primary-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
              Chia sẻ tâm sự
            </h3>
            <p className="font-body text-foreground/70">
              Viết ra những áp lực của bạn và để chúng tan biến vào không gian
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-blue/20 text-center">
            <div className="w-16 h-16 bg-primary-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧘</span>
            </div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
              Góc tĩnh tâm
            </h3>
            <p className="font-body text-foreground/70">
              Tập trung vào một sự vật để làm dịu đi những suy nghĩ khác
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-blue/20 text-center">
            <div className="w-16 h-16 bg-primary-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎮</span>
            </div>
            <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
              Minigame thư giãn
            </h3>
            <p className="font-body text-foreground/70">
              Thả bong bóng và click để giải tỏa căng thẳng một cách vui vẻ
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
