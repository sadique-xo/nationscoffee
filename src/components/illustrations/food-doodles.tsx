interface FoodDoodlesProps {
  className?: string;
  variant?: "hero" | "scattered";
}

export default function FoodDoodles({ className = "", variant = "hero" }: FoodDoodlesProps) {
  if (variant === "hero") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        {/* Coffee cup - top left */}
        <svg className="absolute top-[10%] left-[5%] w-10 h-10 opacity-20" viewBox="0 0 40 40" fill="none" style={{ animation: "float 4s ease-in-out infinite" }}>
          <rect x="8" y="12" width="18" height="18" rx="3" stroke="#4CAF50" strokeWidth="2" fill="none" />
          <path d="M26 16 Q32 18 32 22 Q32 26 26 26" stroke="#4CAF50" strokeWidth="1.5" fill="none" />
          <path d="M13 10 Q12 5 15 4" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M18 9 Q17 3 20 2" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>

        {/* Burger - top right */}
        <svg className="absolute top-[15%] right-[8%] w-9 h-9 opacity-15" viewBox="0 0 40 40" fill="none" style={{ animation: "float 5s ease-in-out infinite 0.5s" }}>
          <path d="M8 20 Q8 10 20 10 Q32 10 32 20Z" stroke="#FF6B35" strokeWidth="2" fill="none" />
          <line x1="6" y1="22" x2="34" y2="22" stroke="#FF6B35" strokeWidth="2" />
          <path d="M8 24 L32 24 Q32 30 20 30 Q8 30 8 24Z" stroke="#FF6B35" strokeWidth="2" fill="none" />
        </svg>

        {/* Star - middle left */}
        <svg className="absolute top-[45%] left-[3%] w-6 h-6 opacity-20" viewBox="0 0 24 24" fill="#FF6B35" style={{ animation: "float 3.5s ease-in-out infinite 1s" }}>
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
        </svg>

        {/* Pizza slice - bottom left */}
        <svg className="absolute bottom-[20%] left-[10%] w-8 h-8 opacity-15" viewBox="0 0 40 40" fill="none" style={{ animation: "float 4.5s ease-in-out infinite 1.5s" }}>
          <path d="M20 6 L8 34 L32 34Z" stroke="#4CAF50" strokeWidth="2" fill="none" strokeLinejoin="round" />
          <circle cx="18" cy="22" r="2" fill="#4CAF50" opacity="0.5" />
          <circle cx="24" cy="28" r="2" fill="#4CAF50" opacity="0.5" />
        </svg>

        {/* Fries - bottom right */}
        <svg className="absolute bottom-[25%] right-[5%] w-8 h-8 opacity-15" viewBox="0 0 40 40" fill="none" style={{ animation: "float 5.5s ease-in-out infinite 0.8s" }}>
          <rect x="12" y="20" width="16" height="16" rx="2" stroke="#FF6B35" strokeWidth="2" fill="none" />
          <rect x="14" y="8" width="3" height="14" rx="1" stroke="#FF6B35" strokeWidth="1.5" fill="none" />
          <rect x="19" y="6" width="3" height="16" rx="1" stroke="#FF6B35" strokeWidth="1.5" fill="none" />
          <rect x="24" y="9" width="3" height="13" rx="1" stroke="#FF6B35" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Coffee bean - middle right */}
        <svg className="absolute top-[55%] right-[12%] w-5 h-5 opacity-20" viewBox="0 0 20 20" fill="none" style={{ animation: "float 4s ease-in-out infinite 2s" }}>
          <ellipse cx="10" cy="10" rx="6" ry="8" stroke="#4CAF50" strokeWidth="1.5" />
          <path d="M7 6 Q10 10 7 14" stroke="#4CAF50" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg className="absolute top-[8%] right-[15%] w-5 h-5 opacity-10" viewBox="0 0 24 24" fill="#4CAF50" style={{ animation: "float 4s ease-in-out infinite" }}>
        <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
      </svg>
      <svg className="absolute bottom-[12%] left-[8%] w-4 h-4 opacity-10" viewBox="0 0 24 24" fill="#FF6B35" style={{ animation: "float 5s ease-in-out infinite 1s" }}>
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
}
