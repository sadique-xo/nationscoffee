interface TribalDoodlesProps {
  className?: string;
  variant?: "about" | "menu" | "gallery" | "testimonials" | "location";
}

/**
 * Warli-inspired tribal art doodles — subtle background accents.
 * Simple stick figures, trees, birds & geometric motifs in brand colors.
 */
export default function TribalDoodles({ className = "", variant = "about" }: TribalDoodlesProps) {
  const olive = "#8BA62B";
  const oliveMuted = "#6B8A1F";
  const brown = "#6B4226";

  if (variant === "about") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        {/* Warli dancer — top right */}
        <svg className="absolute top-[8%] right-[6%] w-28 h-28 opacity-[0.15]" viewBox="0 0 60 60" fill="none" style={{ animation: "float 5s ease-in-out infinite" }}>
          <circle cx="30" cy="10" r="5" stroke={olive} strokeWidth="1.5" />
          <line x1="30" y1="15" x2="30" y2="35" stroke={olive} strokeWidth="1.5" />
          <line x1="30" y1="22" x2="18" y2="14" stroke={olive} strokeWidth="1.5" />
          <line x1="30" y1="22" x2="42" y2="14" stroke={olive} strokeWidth="1.5" />
          <line x1="30" y1="35" x2="20" y2="50" stroke={olive} strokeWidth="1.5" />
          <line x1="30" y1="35" x2="40" y2="50" stroke={olive} strokeWidth="1.5" />
          <path d="M22 30 L30 35 L38 30" stroke={olive} strokeWidth="1.2" fill="none" />
        </svg>

        {/* Tree of life — bottom left */}
        <svg className="absolute bottom-[10%] left-[5%] w-32 h-32 opacity-[0.12]" viewBox="0 0 60 60" fill="none" style={{ animation: "float 6s ease-in-out infinite 1s" }}>
          <line x1="30" y1="55" x2="30" y2="25" stroke={brown} strokeWidth="1.8" />
          <line x1="30" y1="35" x2="18" y2="22" stroke={brown} strokeWidth="1.2" />
          <line x1="30" y1="35" x2="42" y2="22" stroke={brown} strokeWidth="1.2" />
          <line x1="30" y1="28" x2="20" y2="15" stroke={brown} strokeWidth="1.2" />
          <line x1="30" y1="28" x2="40" y2="15" stroke={brown} strokeWidth="1.2" />
          <circle cx="18" cy="22" r="3" stroke={brown} strokeWidth="1" fill="none" />
          <circle cx="42" cy="22" r="3" stroke={brown} strokeWidth="1" fill="none" />
          <circle cx="20" cy="15" r="2.5" stroke={brown} strokeWidth="1" fill="none" />
          <circle cx="40" cy="15" r="2.5" stroke={brown} strokeWidth="1" fill="none" />
          <circle cx="30" cy="20" r="3.5" stroke={brown} strokeWidth="1" fill="none" />
          <line x1="30" y1="55" x2="24" y2="58" stroke={brown} strokeWidth="1" />
          <line x1="30" y1="55" x2="36" y2="58" stroke={brown} strokeWidth="1" />
        </svg>

        {/* Bird — middle right */}
        <svg className="absolute top-[45%] right-[4%] w-20 h-20 opacity-[0.15]" viewBox="0 0 40 40" fill="none" style={{ animation: "float 4.5s ease-in-out infinite 0.5s" }}>
          <ellipse cx="20" cy="22" rx="8" ry="5" stroke={olive} strokeWidth="1.3" fill="none" />
          <circle cx="28" cy="18" r="3" stroke={olive} strokeWidth="1.3" fill="none" />
          <line x1="31" y1="18" x2="35" y2="17" stroke={olive} strokeWidth="1.2" />
          <line x1="12" y1="22" x2="6" y2="16" stroke={olive} strokeWidth="1.2" />
          <line x1="12" y1="22" x2="5" y2="20" stroke={olive} strokeWidth="1.2" />
          <line x1="18" y1="27" x2="18" y2="34" stroke={olive} strokeWidth="1" />
          <line x1="22" y1="27" x2="22" y2="34" stroke={olive} strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        {/* Person carrying pot — top left */}
        <svg className="absolute top-[6%] left-[4%] w-24 h-24 opacity-[0.12]" viewBox="0 0 50 50" fill="none" style={{ animation: "float 5.5s ease-in-out infinite" }}>
          <circle cx="25" cy="8" r="4" stroke={oliveMuted} strokeWidth="1.3" />
          <line x1="25" y1="12" x2="25" y2="30" stroke={oliveMuted} strokeWidth="1.3" />
          <line x1="25" y1="18" x2="16" y2="14" stroke={oliveMuted} strokeWidth="1.3" />
          <line x1="25" y1="18" x2="34" y2="14" stroke={oliveMuted} strokeWidth="1.3" />
          <ellipse cx="25" cy="4" rx="5" ry="3" stroke={oliveMuted} strokeWidth="1.2" fill="none" />
          <line x1="25" y1="30" x2="18" y2="42" stroke={oliveMuted} strokeWidth="1.3" />
          <line x1="25" y1="30" x2="32" y2="42" stroke={oliveMuted} strokeWidth="1.3" />
        </svg>

        {/* Sun motif — top right */}
        <svg className="absolute top-[5%] right-[6%] w-28 h-28 opacity-[0.12]" viewBox="0 0 60 60" fill="none" style={{ animation: "float 6s ease-in-out infinite 2s" }}>
          <circle cx="30" cy="30" r="8" stroke={brown} strokeWidth="1.3" fill="none" />
          <circle cx="30" cy="30" r="4" stroke={brown} strokeWidth="1" fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 30 + 10 * Math.cos(rad);
            const y1 = 30 + 10 * Math.sin(rad);
            const x2 = 30 + 16 * Math.cos(rad);
            const y2 = 30 + 16 * Math.sin(rad);
            return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={brown} strokeWidth="1" />;
          })}
        </svg>

        {/* Geometric dots — bottom right */}
        <svg className="absolute bottom-[8%] right-[5%] w-20 h-20 opacity-[0.15]" viewBox="0 0 40 40" fill="none" style={{ animation: "float 4s ease-in-out infinite 1s" }}>
          <circle cx="10" cy="10" r="2" fill={olive} />
          <circle cx="20" cy="10" r="2" fill={olive} />
          <circle cx="30" cy="10" r="2" fill={olive} />
          <circle cx="15" cy="20" r="2" fill={olive} />
          <circle cx="25" cy="20" r="2" fill={olive} />
          <circle cx="20" cy="30" r="2" fill={olive} />
        </svg>
      </div>
    );
  }

  if (variant === "gallery") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        {/* Two dancers — top right */}
        <svg className="absolute top-[5%] right-[8%] w-36 h-24 opacity-[0.12]" viewBox="0 0 80 55" fill="none" style={{ animation: "float 5s ease-in-out infinite" }}>
          <circle cx="25" cy="8" r="4" stroke={olive} strokeWidth="1.3" />
          <line x1="25" y1="12" x2="25" y2="30" stroke={olive} strokeWidth="1.3" />
          <line x1="25" y1="20" x2="16" y2="12" stroke={olive} strokeWidth="1.3" />
          <line x1="25" y1="20" x2="34" y2="12" stroke={olive} strokeWidth="1.3" />
          <line x1="25" y1="30" x2="17" y2="44" stroke={olive} strokeWidth="1.3" />
          <line x1="25" y1="30" x2="33" y2="44" stroke={olive} strokeWidth="1.3" />
          <circle cx="55" cy="8" r="4" stroke={olive} strokeWidth="1.3" />
          <line x1="55" y1="12" x2="55" y2="30" stroke={olive} strokeWidth="1.3" />
          <line x1="55" y1="20" x2="46" y2="12" stroke={olive} strokeWidth="1.3" />
          <line x1="55" y1="20" x2="64" y2="12" stroke={olive} strokeWidth="1.3" />
          <line x1="55" y1="30" x2="47" y2="44" stroke={olive} strokeWidth="1.3" />
          <line x1="55" y1="30" x2="63" y2="44" stroke={olive} strokeWidth="1.3" />
          <line x1="34" y1="12" x2="46" y2="12" stroke={olive} strokeWidth="1" strokeDasharray="2 2" />
        </svg>

        {/* Small hut — bottom left */}
        <svg className="absolute bottom-[8%] left-[5%] w-24 h-24 opacity-[0.15]" viewBox="0 0 50 50" fill="none" style={{ animation: "float 4.5s ease-in-out infinite 1.5s" }}>
          <path d="M5 28 L25 8 L45 28" stroke={brown} strokeWidth="1.5" fill="none" />
          <line x1="10" y1="28" x2="10" y2="45" stroke={brown} strokeWidth="1.3" />
          <line x1="40" y1="28" x2="40" y2="45" stroke={brown} strokeWidth="1.3" />
          <line x1="10" y1="45" x2="40" y2="45" stroke={brown} strokeWidth="1.3" />
          <rect x="21" y="32" width="8" height="13" rx="4" stroke={brown} strokeWidth="1" fill="none" />
        </svg>
      </div>
    );
  }

  if (variant === "testimonials") {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
        {/* Bird pair — top left */}
        <svg className="absolute top-[6%] left-[6%] w-32 h-20 opacity-[0.12]" viewBox="0 0 65 40" fill="none" style={{ animation: "float 5s ease-in-out infinite 0.8s" }}>
          <ellipse cx="16" cy="20" rx="7" ry="4.5" stroke={oliveMuted} strokeWidth="1.2" fill="none" />
          <circle cx="23" cy="16" r="2.5" stroke={oliveMuted} strokeWidth="1.2" fill="none" />
          <line x1="25.5" y1="16" x2="29" y2="15" stroke={oliveMuted} strokeWidth="1" />
          <line x1="9" y1="20" x2="4" y2="15" stroke={oliveMuted} strokeWidth="1" />
          <line x1="14" y1="24.5" x2="14" y2="32" stroke={oliveMuted} strokeWidth="1" />
          <line x1="18" y1="24.5" x2="18" y2="32" stroke={oliveMuted} strokeWidth="1" />
          <ellipse cx="46" cy="20" rx="7" ry="4.5" stroke={oliveMuted} strokeWidth="1.2" fill="none" />
          <circle cx="53" cy="16" r="2.5" stroke={oliveMuted} strokeWidth="1.2" fill="none" />
          <line x1="55.5" y1="16" x2="59" y2="15" stroke={oliveMuted} strokeWidth="1" />
          <line x1="39" y1="20" x2="34" y2="15" stroke={oliveMuted} strokeWidth="1" />
          <line x1="44" y1="24.5" x2="44" y2="32" stroke={oliveMuted} strokeWidth="1" />
          <line x1="48" y1="24.5" x2="48" y2="32" stroke={oliveMuted} strokeWidth="1" />
        </svg>

        {/* Geometric diamond pattern — bottom right */}
        <svg className="absolute bottom-[6%] right-[5%] w-24 h-24 opacity-[0.15]" viewBox="0 0 50 50" fill="none" style={{ animation: "float 4.2s ease-in-out infinite 1.2s" }}>
          <path d="M25 5 L45 25 L25 45 L5 25 Z" stroke={brown} strokeWidth="1.3" fill="none" />
          <path d="M25 15 L35 25 L25 35 L15 25 Z" stroke={brown} strokeWidth="1" fill="none" />
          <circle cx="25" cy="25" r="2" fill={brown} opacity="0.5" />
        </svg>
      </div>
    );
  }

  // location variant
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Person with cup — top left */}
      <svg className="absolute top-[8%] left-[4%] w-24 h-28 opacity-[0.15]" viewBox="0 0 50 55" fill="none" style={{ animation: "float 5s ease-in-out infinite" }}>
        <circle cx="25" cy="12" r="4" stroke={olive} strokeWidth="1.3" />
        <line x1="25" y1="16" x2="25" y2="36" stroke={olive} strokeWidth="1.3" />
        <line x1="25" y1="36" x2="18" y2="50" stroke={olive} strokeWidth="1.3" />
        <line x1="25" y1="36" x2="32" y2="50" stroke={olive} strokeWidth="1.3" />
        <line x1="25" y1="24" x2="36" y2="20" stroke={olive} strokeWidth="1.3" />
        <line x1="25" y1="24" x2="15" y2="28" stroke={olive} strokeWidth="1.3" />
        <rect x="34" y="17" width="5" height="6" rx="1" stroke={olive} strokeWidth="1" fill="none" />
      </svg>

      {/* Row of triangles — bottom right */}
      <svg className="absolute bottom-[6%] right-[4%] w-40 h-16 opacity-[0.12]" viewBox="0 0 80 30" fill="none" style={{ animation: "float 4.5s ease-in-out infinite 1s" }}>
        <path d="M5 28 L13 8 L21 28" stroke={brown} strokeWidth="1.2" fill="none" />
        <path d="M21 28 L29 8 L37 28" stroke={brown} strokeWidth="1.2" fill="none" />
        <path d="M37 28 L45 8 L53 28" stroke={brown} strokeWidth="1.2" fill="none" />
        <path d="M53 28 L61 8 L69 28" stroke={brown} strokeWidth="1.2" fill="none" />
        <circle cx="13" cy="6" r="1.5" fill={brown} opacity="0.5" />
        <circle cx="29" cy="6" r="1.5" fill={brown} opacity="0.5" />
        <circle cx="45" cy="6" r="1.5" fill={brown} opacity="0.5" />
        <circle cx="61" cy="6" r="1.5" fill={brown} opacity="0.5" />
      </svg>
    </div>
  );
}
