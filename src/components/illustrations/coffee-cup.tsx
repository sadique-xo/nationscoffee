export default function CoffeeCup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Coffee cup illustration"
    >
      {/* Saucer */}
      <ellipse cx="90" cy="200" rx="70" ry="12" fill="#E8E2D6" stroke="#D7CFC3" strokeWidth="2" />

      {/* Cup body */}
      <path
        d="M50 100 L55 185 Q55 195 65 195 L115 195 Q125 195 125 185 L130 100Z"
        fill="#FFFFFF"
        stroke="#2E7D32"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Coffee fill */}
      <path
        d="M55 115 L58 185 Q58 192 65 192 L115 192 Q122 192 125 185 L128 115Z"
        fill="#5D4037"
        opacity="0.8"
      />

      {/* Latte art heart */}
      <path
        d="M85 130 Q80 122 86 118 Q90 115 90 122 Q90 115 94 118 Q100 122 95 130 L90 138Z"
        fill="#D7CFC3"
        opacity="0.7"
      />

      {/* Cup handle */}
      <path
        d="M130 125 Q155 130 155 155 Q155 175 130 175"
        fill="none"
        stroke="#2E7D32"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Steam wisps */}
      <path d="M75 95 Q72 80 78 68" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <animate attributeName="d" values="M75 95 Q72 80 78 68;M75 95 Q78 80 72 68;M75 95 Q72 80 78 68" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M90 92 Q88 75 93 62" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" opacity="0.4">
        <animate attributeName="d" values="M90 92 Q88 75 93 62;M90 92 Q93 75 88 62;M90 92 Q88 75 93 62" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.15;0.4" dur="3.5s" repeatCount="indefinite" />
      </path>
      <path d="M105 95 Q103 82 108 70" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" opacity="0.3">
        <animate attributeName="d" values="M105 95 Q103 82 108 70;M105 95 Q108 82 103 70;M105 95 Q103 82 108 70" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Coffee beans scattered */}
      <ellipse cx="35" cy="190" rx="5" ry="7" fill="#5D4037" transform="rotate(-20 35 190)" opacity="0.4" />
      <line x1="33" y1="188" x2="37" y2="192" stroke="#3E2723" strokeWidth="0.8" opacity="0.4" />

      <ellipse cx="155" cy="195" rx="4" ry="6" fill="#5D4037" transform="rotate(15 155 195)" opacity="0.3" />
      <line x1="153" y1="193" x2="157" y2="197" stroke="#3E2723" strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}
