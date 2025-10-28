"use client";

import Image from "next/image";

interface BaymaxProps {
  size?: "small" | "medium" | "large";
  showHeart?: boolean;
  className?: string;
  variant?: "hello" | "hug";
  objectFit?: "cover" | "contain";
  rounded?: "full" | "none";
}

export default function Baymax({
  size = "medium",
  className = "",
  variant,
  objectFit = "cover",
  rounded = "full",
}: BaymaxProps) {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-32 h-32",
    large: "w-48 h-48",
  };

  // Determine which image to show based on variant or hugging state
  const getImageSrc = () => {
    if (variant === "hug") {
      return "/images/baymax-hug.png";
    }
    return "/images/baymax-hello.webp";
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} relative overflow-hidden bg-white rounded-${rounded}`}
      >
        {/* Baymax Image */}
        <Image
          src={getImageSrc()}
          alt="Baymax"
          className={`object-${objectFit}`}
          priority
          fill
        />
      </div>
    </div>
  );
}
