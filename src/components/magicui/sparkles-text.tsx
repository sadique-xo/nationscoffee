"use client";

import { useEffect, useRef } from "react";

interface SparklesTextProps {
  text: string;
  className?: string;
}

export default function SparklesText({
  text,
  className = "",
}: SparklesTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const colors = ["#FFD700", "#FF6B35", "#4CAF50"];

    function createSparkle() {
      if (!containerRef.current) return;
      const sparkle = document.createElement("span");
      sparkle.textContent = "\u2726";
      sparkle.style.cssText = `
        position: absolute;
        pointer-events: none;
        font-size: ${Math.random() * 10 + 6}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        animation: sparkle-fade 1s ease-out forwards;
        z-index: 20;
      `;
      containerRef.current.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }

    for (let i = 0; i < 3; i++) {
      setTimeout(() => createSparkle(), i * 300);
    }

    const interval = setInterval(createSparkle, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
    </span>
  );
}
