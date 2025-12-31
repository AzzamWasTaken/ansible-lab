"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RainDrop {
  id: number;
  left: number;
  height: number;
  delay: number;
  duration: number;
  width: number;
  opacity: number;
  glow: boolean;
}

export default function RainCloud() {
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [isLightning, setIsLightning] = useState(false);

  useEffect(() => {
    const drops: RainDrop[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      height: Math.random() * 40 + 15,
      delay: Math.random() * 3,
      duration: Math.random() * 1.2 + 0.8,
      width: Math.random() > 0.8 ? 3 : Math.random() > 0.5 ? 2 : 1,
      opacity: Math.random() * 0.5 + 0.3,
      glow: Math.random() > 0.9,
    }));
    setRainDrops(drops);

    // Random lightning
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsLightning(true);
        setTimeout(() => setIsLightning(false), 150);
        setTimeout(() => {
          if (Math.random() > 0.5) {
            setIsLightning(true);
            setTimeout(() => setIsLightning(false), 100);
          }
        }, 200);
      }
    }, 4000);

    return () => clearInterval(lightningInterval);
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Lightning flash overlay */}
      <motion.div
        className="fixed inset-0 bg-white/5 pointer-events-none z-50"
        animate={{ opacity: isLightning ? 1 : 0 }}
        transition={{ duration: 0.05 }}
      />

      {/* Main Cloud */}
      <motion.div
        className="relative float-animation"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <svg
          viewBox="0 0 200 100"
          className="w-80 h-40 md:w-[500px] md:h-[250px] cloud-glow"
          fill="none"
        >
          <defs>
            <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="cloudHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="dropGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Cloud body */}
          <ellipse cx="60" cy="65" rx="45" ry="30" fill="url(#cloudGradient)" />
          <ellipse cx="100" cy="55" rx="50" ry="35" fill="url(#cloudGradient)" />
          <ellipse cx="145" cy="65" rx="40" ry="28" fill="url(#cloudGradient)" />
          <ellipse cx="80" cy="45" rx="35" ry="25" fill="url(#cloudGradient)" />
          <ellipse cx="120" cy="42" rx="38" ry="28" fill="url(#cloudGradient)" />

          {/* Highlight overlay */}
          <ellipse cx="60" cy="65" rx="45" ry="30" fill="url(#cloudHighlight)" />
          <ellipse cx="100" cy="55" rx="50" ry="35" fill="url(#cloudHighlight)" />
          <ellipse cx="145" cy="65" rx="40" ry="28" fill="url(#cloudHighlight)" />
          <ellipse cx="80" cy="45" rx="35" ry="25" fill="url(#cloudHighlight)" />
          <ellipse cx="120" cy="42" rx="38" ry="28" fill="url(#cloudHighlight)" />

          {/* Glowing edge */}
          <ellipse
            cx="100"
            cy="55"
            rx="85"
            ry="45"
            fill="none"
            stroke="url(#cloudHighlight)"
            strokeWidth="1"
            filter="url(#glow)"
          />
        </svg>

        {/* Lightning bolt */}
        <motion.div
          className="absolute left-1/2 top-full -translate-x-1/2"
          animate={{ opacity: isLightning ? 1 : 0 }}
          transition={{ duration: 0.05 }}
        >
          <svg width="40" height="80" viewBox="0 0 40 80" fill="none" className="drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]">
            <path
              d="M20 0 L28 28 L18 28 L26 55 L10 35 L18 35 L12 80 L30 40 L20 40 L20 0"
              fill="#fbbf24"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Rain container */}
      <div className="absolute top-32 md:top-48 left-1/2 -translate-x-1/2 w-72 md:w-[450px] h-72 overflow-hidden">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className="rain-drop"
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              width: `${drop.width}px`,
              opacity: drop.opacity,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
              filter: drop.glow ? "drop-shadow(0 0 3px #06b6d4)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
