interface FoodDoodlesProps {
  className?: string;
  variant?: "hero" | "scattered";
}

/** Floating coffee-themed background accents (cups, beans, steam). */
export default function FoodDoodles({ className = "", variant = "hero" }: FoodDoodlesProps) {
  if (variant === "hero") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        {/* Coffee cup — top left */}
        <svg className="absolute top-[10%] left-[5%] w-10 h-10 opacity-20" viewBox="0 0 40 40" fill="none" style={{ animation: "float 4s ease-in-out infinite" }}>
          <rect x="8" y="12" width="18" height="18" rx="3" stroke="#8BA62B" strokeWidth="2" fill="none" />
          <path d="M26 16 Q32 18 32 22 Q32 26 26 26" stroke="#8BA62B" strokeWidth="1.5" fill="none" />
          <path d="M13 10 Q12 5 15 4" stroke="#8BA62B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M18 9 Q17 3 20 2" stroke="#8BA62B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>

        {/* Steam wisp — top right */}
        <svg className="absolute top-[14%] right-[10%] w-8 h-12 opacity-15" viewBox="0 0 32 48" fill="none" style={{ animation: "float 5s ease-in-out infinite 0.5s" }}>
          <path d="M16 44 Q12 34 16 24 Q20 14 16 4" stroke="#5D4037" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 44 Q26 32 22 22 Q18 12 22 6" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </svg>

        {/* Coffee bean — middle left */}
        <svg className="absolute top-[42%] left-[4%] w-6 h-6 opacity-20" viewBox="0 0 20 20" fill="none" style={{ animation: "float 3.8s ease-in-out infinite 1s" }}>
          <ellipse cx="10" cy="10" rx="6" ry="8" stroke="#8BA62B" strokeWidth="1.5" />
          <path d="M7 6 Q10 10 7 14" stroke="#8BA62B" strokeWidth="1" />
        </svg>

        {/* Coffee bean — bottom left */}
        <svg className="absolute bottom-[22%] left-[12%] w-7 h-7 opacity-15" viewBox="0 0 20 20" fill="none" style={{ animation: "float 4.5s ease-in-out infinite 1.2s" }}>
          <ellipse cx="10" cy="10" rx="6" ry="8" stroke="#5D4037" strokeWidth="1.4" transform="rotate(12 10 10)" />
          <path d="M7 7 Q10 10 7 13" stroke="#3E2723" strokeWidth="0.9" />
        </svg>

        {/* Small cup — bottom right */}
        <svg className="absolute bottom-[26%] right-[8%] w-9 h-9 opacity-15" viewBox="0 0 40 40" fill="none" style={{ animation: "float 5.2s ease-in-out infinite 0.7s" }}>
          <rect x="10" y="14" width="14" height="16" rx="2" stroke="#6B8A1F" strokeWidth="1.8" fill="none" />
          <path d="M24 18 Q30 20 30 24 Q30 28 24 28" stroke="#6B8A1F" strokeWidth="1.5" fill="none" />
          <path d="M16 12 Q15 8 18 6" stroke="#9E9E9E" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        {/* Coffee bean — middle right */}
        <svg className="absolute top-[52%] right-[11%] w-5 h-5 opacity-20" viewBox="0 0 20 20" fill="none" style={{ animation: "float 4s ease-in-out infinite 2s" }}>
          <ellipse cx="10" cy="10" rx="6" ry="8" stroke="#8BA62B" strokeWidth="1.5" />
          <path d="M7 6 Q10 10 7 14" stroke="#8BA62B" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg className="absolute top-[8%] right-[15%] w-5 h-5 opacity-10" viewBox="0 0 20 20" fill="none" style={{ animation: "float 4s ease-in-out infinite" }}>
        <ellipse cx="10" cy="10" rx="6" ry="8" stroke="#8BA62B" strokeWidth="1.5" />
        <path d="M7 6 Q10 10 7 14" stroke="#8BA62B" strokeWidth="1" />
      </svg>
      <svg className="absolute bottom-[12%] left-[8%] w-4 h-4 opacity-10" viewBox="0 0 20 20" fill="none" style={{ animation: "float 5s ease-in-out infinite 1s" }}>
        <ellipse cx="10" cy="10" rx="5" ry="7" stroke="#5D4037" strokeWidth="1.3" />
        <path d="M7 7 Q10 10 7 13" stroke="#3E2723" strokeWidth="0.8" />
      </svg>
    </div>
  );
}
