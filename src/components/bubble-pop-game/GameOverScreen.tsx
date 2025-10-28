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
      className="text-center bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl md:w-3/5 w-full mx-auto motion-gpu"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-red-600 mb-4 motion-gpu"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        Kết thúc!
      </motion.h1>

      <motion.div
        className="mb-8 py-4 motion-gpu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-lg text-gray-700 mb-2">
          Cảm ơn bạn đã dành thời gian quý báu cho mình. Mỗi người là một hành
          trình khác nhau, bạn đang đi trên con đường chính mình. Chúc bạn luôn
          vững vàng và dịu dàng với chính mình!
        </p>
        <div className="text-3xl font-bold text-purple-700 mt-4">
          Điểm cuối: {score}
        </div>
      </motion.div>

      <div className="flex flex-col items-center space-y-4">
        <motion.button
          className="w-50 px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all motion-gpu"
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
          className="w-50 px-6 py-3 bg-white text-purple-700 border-2 border-purple-500 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all motion-gpu"
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
