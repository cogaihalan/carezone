"use client";

import { motion } from "framer-motion";

interface GameOverScreenProps {
  score: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function GameOverScreen({
  score,
  onPlayAgain,
  onExit,
}: GameOverScreenProps) {
  return (
    <motion.div
      className="text-center bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-red-600 mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        Kết thúc!
      </motion.h1>

      <motion.div
        className="mb-8 py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-lg text-gray-700 mb-2">
          Bạn đã bỏ lỡ quá nhiều bong bóng!
        </p>
        <div className="text-3xl font-bold text-purple-700 mt-4">
          Điểm cuối: {score}
        </div>
      </motion.div>

      <div className="flex flex-col items-center space-y-4">
        <motion.button
          className="w-50 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          onClick={onPlayAgain}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Chơi lại
        </motion.button>

        <motion.button
          className="w-50 px-6 py-3 bg-white text-purple-700 border-2 border-purple-500 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all"
          onClick={onExit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Thoát
        </motion.button>
      </div>
    </motion.div>
  );
}
