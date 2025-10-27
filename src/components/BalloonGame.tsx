'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Balloon {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  popped: boolean;
}

interface Particle {
  id: number;
  x: number;
  y;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

export default function BalloonGame() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const animationRef = useRef<number>(0);
  const lastSpawnTime = useRef<number>(0);
  const lastUpdateTime = useRef<number>(0);
  const balloonIdCounter = useRef<number>(0);

  // Tạo balloon mới - tối ưu với useRef để tránh re-render
  const createBalloon = useCallback((): Balloon => {
    const size = Math.random() * 40 + 30;
    const speed = Math.random() * 2 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      id: ++balloonIdCounter.current,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth - size : 800),
      y: typeof window !== 'undefined' ? window.innerHeight + size : 600,
      size,
      color,
      speed,
      popped: false
    };
  }, []);

  // Tạo particle effect - tối ưu
  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 6; i++) { // Giảm số particles để tăng performance
      newParticles.push({
        id: Date.now() + Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        life: 1,
        color
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Pop balloon - tối ưu với batch updates
  const popBalloon = useCallback((id: number) => {
    setBalloons(prev => {
      const balloon = prev.find(b => b.id === id);
      if (balloon && !balloon.popped) {
        createParticles(balloon.x + balloon.size / 2, balloon.y + balloon.size / 2, balloon.color);
        setScore(prevScore => prevScore + Math.floor(balloon.size / 10));
        return prev.map(b => b.id === id ? { ...b, popped: true } : b);
      }
      return prev;
    });
  }, [createParticles]);

  // Game loop tối ưu với throttling
  const gameLoop = useCallback((currentTime: number) => {
    if (!gameActive) return;

    // Throttle updates để giảm lag
    if (currentTime - lastUpdateTime.current < 16) { // ~60fps
      animationRef.current = requestAnimationFrame(gameLoop);
      return;
    }
    
    lastUpdateTime.current = currentTime;

    // Spawn balloons với throttling
    if (currentTime - lastSpawnTime.current > 1000) { // Tăng interval để giảm lag
      setBalloons(prev => [...prev, createBalloon()]);
      lastSpawnTime.current = currentTime;
    }

    // Batch update balloons và particles
    setBalloons(prev => {
      const updated = prev
        .map(balloon => ({
          ...balloon,
          y: balloon.y - balloon.speed
        }))
        .filter(balloon => balloon.y > -balloon.size && !balloon.popped);
      
      return updated;
    });

    setParticles(prev => {
      const updated = prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.2, // Giảm gravity để mượt hơn
          life: particle.life - 0.015
        }))
        .filter(particle => particle.life > 0);
      
      return updated;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameActive, createBalloon]);

  // Start game
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setBalloons([]);
    setParticles([]);
    balloonIdCounter.current = 0;
    lastSpawnTime.current = Date.now();
    lastUpdateTime.current = Date.now();
  };

  // Timer
  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  // Game loop effect - tối ưu
  useEffect(() => {
    if (gameActive) {
      animationRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameActive, gameLoop]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-blue-100 to-white relative overflow-hidden">
      {/* Background clouds */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full opacity-60"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-12 bg-white rounded-full opacity-50"
          animate={{ x: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-60 left-1/3 w-20 h-10 bg-white rounded-full opacity-40"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Game UI */}
      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🎈 Pop the Balloons! 🎈
            </motion.h1>
            <motion.p 
              className="text-lg text-blue-600 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Click on the balloons to pop them and score points!
            </motion.p>
          </div>

          {/* Game Stats */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <motion.div 
              className="bg-white rounded-full px-6 py-3 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-2xl font-bold text-blue-600">Score: {score}</span>
            </motion.div>
            <motion.div 
              className="bg-white rounded-full px-6 py-3 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="text-2xl font-bold text-red-500">Time: {timeLeft}s</span>
            </motion.div>
          </div>

          {/* Start Button */}
          {!gameActive && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                onClick={startGame}
                className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {timeLeft === 0 ? 'Play Again!' : 'Start Game!'}
              </motion.button>
            </motion.div>
          )}

          {/* Game Over */}
          {!gameActive && timeLeft === 0 && (
            <motion.div 
              className="text-center mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-blue-800 mb-4">Game Over!</h2>
                <p className="text-xl text-gray-600 mb-4">Final Score: {score}</p>
                <div className="text-4xl mb-4">
                  {score >= 50 ? '🎉' : score >= 30 ? '😊' : '😔'}
                </div>
                <p className="text-gray-500">
                  {score >= 50 ? 'Excellent!' : score >= 30 ? 'Good job!' : 'Try again!'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Balloons - Tối ưu với CSS transforms thay vì position */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: balloon.x,
                top: balloon.y,
                width: balloon.size,
                height: balloon.size,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: balloon.popped ? 0 : 1, 
                opacity: balloon.popped ? 0 : 1,
                rotate: balloon.popped ? 180 : 0
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }} // Giảm duration để mượt hơn
              onClick={() => popBalloon(balloon.id)}
              whileHover={{ scale: 1.05 }} // Giảm scale để mượt hơn
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-full h-full rounded-full shadow-lg relative"
                style={{ backgroundColor: balloon.color }}
              >
                {/* Balloon highlight */}
                <div className="absolute top-2 left-3 w-3 h-3 bg-white rounded-full opacity-60" />
                {/* Balloon string */}
                <div 
                  className="absolute bottom-0 left-1/2 w-0.5 bg-gray-400"
                  style={{ height: balloon.size * 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Particles - Tối ưu */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 rounded-full" // Giảm size để tăng performance
              style={{
                left: particle.x,
                top: particle.y,
                backgroundColor: particle.color,
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ 
                scale: particle.life,
                opacity: particle.life,
                x: particle.vx,
                y: particle.vy
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }} // Giảm duration
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      {gameActive && (
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-full px-6 py-2 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-gray-600 font-medium">
            Click balloons to pop them! 🎯
          </p>
        </motion.div>
      )}
    </div>
  );
}