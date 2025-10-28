"use client";

import { motion } from "framer-motion";
import Baymax from "./Baymax";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/welcome' || pathname === '/') {
    return null;
  }
  return (
    <footer className="bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 border-t border-primary-blue/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex flex-col gap-4 items-center justify-center mb-4 md:flex-row">
            <Baymax
              size="medium"
              variant="hug"          
              objectFit="contain"
              rounded="none"
            />
            <p className="font-heading font-semibold text-2xl text-foreground">
              We are here to hug you 💙
            </p>
          </div>
          <p className="font-body text-foreground/60">
            Carezone - Không gian an toàn cho hành trình học tập của bạn
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
