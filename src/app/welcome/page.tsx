"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Baymax from "@/components/Baymax";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Baymax Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 motion-gpu"
        >
          <Baymax size="large" className="flex justify-center" />
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 motion-gpu"
        >
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-blue-800 mb-6">
            Chào mừng bạn đến với
            <span className="block text-primary-blue mt-3">
              hành trình của riêng mình!
            </span>
          </h1>

          <p className="font-body text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Carezone là không gian an toàn của bạn, nơi bạn có thể tìm thấy sự
            bình yên và sức mạnh để tiếp tục hành trình học tập phía trước.
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="motion-gpu"
        >
          <Link
            href="/home"
            className="inline-flex items-center px-8 py-4 bg-primary-blue hover:bg-primary-blue/80 text-white font-heading font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">Bắt đầu nhé</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="motion-gpu"
            >
              →
            </motion.div>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-blue/30 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
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
    </div>
  );
}
