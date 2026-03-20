export default function BobaTeaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Boba tea">
      {/* Cup */}
      <path d="M24 22 L28 66 Q28 70 32 70 L48 70 Q52 70 52 66 L56 22Z" fill="#FFFFFF" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tea fill */}
      <path d="M26 30 L29 66 Q29 68 32 68 L48 68 Q51 68 51 66 L54 30Z" fill="#FFCC80" opacity="0.6" />
      {/* Dome lid */}
      <path d="M22 22 Q22 16 40 16 Q58 16 58 22Z" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="1.5" />
      {/* Wide straw */}
      <rect x="37" y="4" width="6" height="48" rx="3" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1" />
      {/* Boba pearls */}
      <circle cx="32" cy="60" r="3" fill="#3E2723" stroke="#2E1B0E" strokeWidth="0.8" />
      <circle cx="40" cy="62" r="3" fill="#3E2723" stroke="#2E1B0E" strokeWidth="0.8" />
      <circle cx="48" cy="60" r="3" fill="#3E2723" stroke="#2E1B0E" strokeWidth="0.8" />
      <circle cx="36" cy="55" r="2.8" fill="#3E2723" stroke="#2E1B0E" strokeWidth="0.8" />
      <circle cx="44" cy="56" r="2.8" fill="#3E2723" stroke="#2E1B0E" strokeWidth="0.8" />
      <circle cx="38" cy="50" r="2.5" fill="#3E2723" stroke="#2E1B0E" strokeWidth="0.8" opacity="0.8" />
      <circle cx="46" cy="52" r="2.5" fill="#3E2723" stroke="#2E1B0E" strokeWidth="0.8" opacity="0.8" />
      {/* Highlight on cup */}
      <line x1="28" y1="30" x2="30" y2="60" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}
