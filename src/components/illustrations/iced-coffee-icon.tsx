export default function IcedCoffeeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Iced coffee">
      {/* Cup */}
      <path d="M24 20 L28 68 Q28 72 32 72 L48 72 Q52 72 52 68 L56 20Z" fill="#FFFFFF" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Coffee fill */}
      <path d="M26 30 L29 68 Q29 70 32 70 L48 70 Q51 70 51 68 L54 30Z" fill="#8D6E63" opacity="0.6" />
      {/* Dome lid */}
      <path d="M22 20 Q22 14 40 14 Q58 14 58 20Z" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="1.5" />
      {/* Straw */}
      <rect x="38" y="4" width="4" height="50" rx="2" fill="#FF6B35" stroke="#E55A2B" strokeWidth="1" />
      {/* Ice cubes */}
      <rect x="30" y="35" width="10" height="8" rx="2" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" opacity="0.8" transform="rotate(-5 35 39)" />
      <rect x="42" y="42" width="8" height="7" rx="2" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" opacity="0.7" transform="rotate(5 46 45)" />
      <rect x="33" y="50" width="9" height="7" rx="2" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" opacity="0.6" />
      {/* Condensation drops */}
      <circle cx="26" cy="40" r="1" fill="#90CAF9" opacity="0.5" />
      <circle cx="55" cy="50" r="1.2" fill="#90CAF9" opacity="0.4" />
      <circle cx="25" cy="55" r="0.8" fill="#90CAF9" opacity="0.5" />
    </svg>
  );
}
