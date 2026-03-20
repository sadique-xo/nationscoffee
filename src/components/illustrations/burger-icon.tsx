export default function BurgerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Burger">
      {/* Top bun */}
      <path d="M15 35 Q15 15 40 15 Q65 15 65 35Z" fill="#E8A849" stroke="#C68A3C" strokeWidth="2" strokeLinecap="round" />
      {/* Sesame seeds */}
      <ellipse cx="30" cy="24" rx="2" ry="1.5" fill="#FFF8E1" />
      <ellipse cx="45" cy="20" rx="2" ry="1.5" fill="#FFF8E1" />
      <ellipse cx="52" cy="28" rx="2" ry="1.5" fill="#FFF8E1" />
      {/* Lettuce */}
      <path d="M12 37 Q20 42 28 36 Q36 42 44 36 Q52 42 60 36 Q68 42 68 38" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
      {/* Patty */}
      <rect x="14" y="40" width="52" height="10" rx="3" fill="#5D4037" stroke="#3E2723" strokeWidth="2" />
      {/* Cheese */}
      <path d="M12 42 L14 48 L66 48 L68 42" fill="#FFC107" stroke="#F9A825" strokeWidth="1" />
      {/* Bottom bun */}
      <path d="M15 52 L65 52 Q65 62 40 62 Q15 62 15 52Z" fill="#E8A849" stroke="#C68A3C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
