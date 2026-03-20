"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  duration?: number;
}

export default function BorderBeam({
  children,
  className,
  size = 200,
  duration = 8,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-brew-border bg-card p-px",
        className
      )}
    >
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `conic-gradient(from 0deg, transparent, #4CAF50, transparent 40%)`,
          animation: `spin ${duration}s linear infinite`,
          width: `${size}%`,
          height: `${size}%`,
          top: `${-(size - 100) / 2}%`,
          left: `${-(size - 100) / 2}%`,
        }}
      />
      <div className="relative z-10 rounded-xl bg-card">{children}</div>
    </div>
  );
}
