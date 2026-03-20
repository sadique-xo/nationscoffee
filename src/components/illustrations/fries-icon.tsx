export default function FriesIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Fries">
      {/* Container */}
      <path d="M22 38 L18 68 Q18 72 22 72 L58 72 Q62 72 62 68 L58 38Z" fill="#FF6B35" stroke="#E55A2B" strokeWidth="2" strokeLinecap="round" />
      {/* Container stripe */}
      <path d="M20 50 L60 50" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" strokeDasharray="4 3" />
      {/* Fries sticking out */}
      <rect x="26" y="14" width="5" height="28" rx="2" fill="#FFD54F" stroke="#F9A825" strokeWidth="1.5" transform="rotate(-5 28 28)" />
      <rect x="34" y="10" width="5" height="32" rx="2" fill="#FFD54F" stroke="#F9A825" strokeWidth="1.5" />
      <rect x="42" y="12" width="5" height="30" rx="2" fill="#FFD54F" stroke="#F9A825" strokeWidth="1.5" transform="rotate(3 44 27)" />
      <rect x="50" y="16" width="5" height="26" rx="2" fill="#FFD54F" stroke="#F9A825" strokeWidth="1.5" transform="rotate(8 52 29)" />
      <rect x="30" y="18" width="4" height="24" rx="2" fill="#FFCA28" stroke="#F9A825" strokeWidth="1" transform="rotate(-8 32 30)" />
    </svg>
  );
}
