"use client";

import { motion } from "framer-motion";
import Baymax from "@/components/Baymax";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 motion-gpu"
        >
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-blue-800 mb-6">
            Contact
          </h1>
          <p className="font-body text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Thông tin liên hệ của nhóm phát triển Carezone
          </p>
        </motion.div>
        <div className="space-y-8">
          {/* Baymax and Message */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center justify-center space-y-8 motion-gpu"
          >
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

            <div className="text-center">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-4">
                Cảm ơn bạn đã tin tưởng Carezone!
              </h3>
              <p className="font-body text-lg text-foreground/70 leading-relaxed">
                Nếu bạn có bất kỳ góp ý nào hoặc muốn chia sẻ trải nghiệm của
                mình, đừng ngần ngại liên hệ với chúng tôi nhé!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-primary-blue/20 rounded-full flex items-center justify-center hover:bg-primary-blue/30 transition-colors cursor-pointer">
                <span className="text-lg">📧</span>
              </div>
              <div className="w-12 h-12 bg-primary-blue/20 rounded-full flex items-center justify-center hover:bg-primary-blue/30 transition-colors cursor-pointer">
                <span className="text-lg">📱</span>
              </div>
              <div className="w-12 h-12 bg-primary-blue/20 rounded-full flex items-center justify-center hover:bg-primary-blue/30 transition-colors cursor-pointer">
                <span className="text-lg">💬</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8 motion-gpu"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-blue/20">
              <h3 className="font-heading font-semibold text-2xl text-foreground mb-6">
                Thông tin liên hệ
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-blue/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-blue" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-lg text-foreground">
                      Email
                    </p>
                    <p className="font-body text-foreground/70">
                      <a
                        href="mailto:Dh1740895@gmail.com"
                        className="text-primary-blue hover:underline"
                      >
                        Dh1740895@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-blue/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-blue" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-lg text-foreground">
                      Điện thoại
                    </p>
                    <p className="font-body text-foreground/70">
                      <a
                        href="tel:+84929365816"
                        className="text-primary-blue hover:underline"
                      >
                        0929365816
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-blue/20 rounded-full motion-gpu"
              style={{
                left: `${15 + i * 15}%`,
                top: `${25 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
