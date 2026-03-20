export default function BrownieIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Brownie">
      {/* Shadow */}
      <ellipse cx="40" cy="68" rx="28" ry="4" fill="#E8E2D6" opacity="0.5" />
      {/* Brownie body */}
      <rect x="14" y="38" width="52" height="26" rx="3" fill="#4E342E" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />
      {/* Top surface */}
      <path d="M14 42 Q40 35 66 42 L66 38 Q66 36 64 36 L16 36 Q14 36 14 38Z" fill="#5D4037" stroke="#3E2723" strokeWidth="1.5" />
      {/* Crackle lines on top */}
      <path d="M20 40 Q30 38 40 41 Q50 38 60 40" fill="none" stroke="#6D4C41" strokeWidth="1" opacity="0.6" />
      <path d="M25 43 Q35 41 45 43" fill="none" stroke="#6D4C41" strokeWidth="0.8" opacity="0.5" />
      {/* Nutella drizzle */}
      <path d="M22 38 Q28 34 35 38 Q42 34 50 38 Q55 34 60 38" fill="none" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* Nuts */}
      <ellipse cx="25" cy="36" rx="3" ry="2" fill="#D4A056" stroke="#B8863C" strokeWidth="0.8" transform="rotate(-15 25 36)" />
      <ellipse cx="42" cy="35" rx="2.5" ry="1.8" fill="#D4A056" stroke="#B8863C" strokeWidth="0.8" transform="rotate(20 42 35)" />
      <ellipse cx="55" cy="37" rx="2.8" ry="2" fill="#D4A056" stroke="#B8863C" strokeWidth="0.8" transform="rotate(-10 55 37)" />
      {/* Chocolate chips visible */}
      <circle cx="30" cy="50" r="2" fill="#3E2723" opacity="0.5" />
      <circle cx="50" cy="48" r="1.8" fill="#3E2723" opacity="0.4" />
    </svg>
  );
}
