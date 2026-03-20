export default function HotCoffeeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Hot coffee">
      {/* Cup */}
      <path d="M20 32 L24 64 Q24 68 28 68 L48 68 Q52 68 52 64 L56 32Z" fill="#FFFFFF" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Coffee fill */}
      <path d="M22 38 L25 64 Q25 66 28 66 L48 66 Q51 66 51 64 L54 38Z" fill="#5D4037" opacity="0.7" />
      {/* Handle */}
      <path d="M56 38 Q68 40 68 50 Q68 58 56 58" fill="none" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" />
      {/* Steam */}
      <path d="M32 28 Q30 20 34 14" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2.5s" repeatCount="indefinite" />
      </path>
      <path d="M40 26 Q38 17 42 10" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M48 28 Q46 20 50 14" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.1;0.35" dur="3.5s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}
