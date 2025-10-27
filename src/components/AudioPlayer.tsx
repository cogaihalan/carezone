"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  frequency?: number;
  duration?: number;
  loop?: boolean;
  title?: string;
  className?: string;
}

export default function AudioPlayer({
  src,
  frequency = 528,
  duration = 45,
  loop = true,
  title = "Âm thanh thư giãn",
  className = "",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [loop]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary-blue/20 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            {title}
          </h3>
          <p className="font-body text-sm text-foreground/70">
            Tần số: {frequency}Hz • Thời lượng: {duration}s
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-primary-blue/20 hover:bg-primary-blue/30 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-primary-blue" />
            ) : (
              <Volume2 className="w-5 h-5 text-primary-blue" />
            )}
          </button>
          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-primary-blue hover:bg-primary-blue/80 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-primary-blue/20 rounded-full h-2 mb-2">
        <div
          className="bg-primary-blue h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-foreground/70 font-body">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <audio ref={audioRef} src={src} loop={loop} preload="metadata" />
    </div>
  );
}
