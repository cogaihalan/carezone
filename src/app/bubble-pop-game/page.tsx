"use client"

import { useState } from "react"
import GameScreen from "@/components/bubble-pop-game/GameScreen"
import StartScreen from "@/components/bubble-pop-game/StartScreen"
import GameOverScreen from "@/components/bubble-pop-game/GameOverScreen"

export default function BubblePopGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const handleGameOver = (score: number) => {
    setFinalScore(score)
    setGameOver(true)
    setGameStarted(false)
  }

  const handlePlayAgain = () => {
    setGameOver(false)
    setGameStarted(true)
  }

  const handleExit = () => {
    setGameStarted(false)
    setGameOver(false)
  }

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-between bg-linear-to-b from-purple-100 to-blue-200 p-4">
      <div className="grow flex items-center justify-center w-full">
        {!gameStarted && !gameOver && <StartScreen onStart={() => setGameStarted(true)} />}
        {gameStarted && <GameScreen onGameOver={handleGameOver} onExit={handleExit} />}
        {gameOver && <GameOverScreen score={finalScore} onPlayAgain={handlePlayAgain} onExit={handleExit} />}
      </div>
    </main>
  )
}
