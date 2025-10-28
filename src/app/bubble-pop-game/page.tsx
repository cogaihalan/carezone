"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import StartScreen from "@/components/bubble-pop-game/StartScreen";
import GameScreen from "@/components/bubble-pop-game/GameScreen";
import GameOverScreen from "@/components/bubble-pop-game/GameOverScreen";

type GameState = "start" | "playing" | "gameOver";

export default function BubblePopGamePage() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);

  // Game flow handlers
  const startGame = () => {
    setGameState("playing");
    setScore(0);
  };

  const endGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState("start");
  };

  const exitGame = () => {
    router.push("/suggestions");
  };

  const playAgain = () => {
    setGameState("playing");
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Game Container */}

        <div className="flex justify-center items-center min-h-[500px]">
          <AnimatePresence mode="wait">
            {gameState === "start" && (
              <StartScreen key="start" onStart={startGame} />
            )}
            {gameState === "playing" && (
              <GameScreen
                key="playing"
                onGameOver={endGame}
                onExit={exitGame}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
