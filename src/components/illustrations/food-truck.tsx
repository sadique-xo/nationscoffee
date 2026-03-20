export default function FoodTruck({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Brew Truck food truck illustration"
    >
      {/* Ground shadow */}
      <ellipse cx="200" cy="270" rx="170" ry="12" fill="#E8E2D6" opacity="0.5" />

      {/* Truck body */}
      <rect x="50" y="120" width="300" height="120" rx="8" fill="#4CAF50" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Truck cabin (front) */}
      <path d="M280 140 L350 140 Q360 140 360 150 L360 240 L280 240 L280 140Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cabin window */}
      <rect x="290" y="155" width="55" height="40" rx="4" fill="#B3E5FC" stroke="#2E7D32" strokeWidth="2" />
      <line x1="317" y1="155" x2="317" y2="195" stroke="#2E7D32" strokeWidth="1.5" />

      {/* Serving window */}
      <rect x="90" y="135" width="120" height="70" rx="6" fill="#FFF8E1" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" />

      {/* Awning */}
      <path d="M80 130 Q150 110 220 130" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" />
      <path d="M80 130 L80 138" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
      <path d="M220 130 L220 138" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
      {/* Awning scallops */}
      <path d="M82 130 Q100 142 118 130 Q136 142 154 130 Q172 142 190 130 Q208 142 220 130" fill="#FF6B35" opacity="0.3" stroke="#FF6B35" strokeWidth="1.5" />

      {/* Barista silhouette in window */}
      <circle cx="140" cy="155" r="10" fill="#5A5A5A" opacity="0.6" />
      <rect x="132" y="165" width="16" height="20" rx="4" fill="#5A5A5A" opacity="0.5" />
      {/* Barista arm serving */}
      <line x1="148" y1="172" x2="165" y2="168" stroke="#5A5A5A" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

      {/* Menu board on truck */}
      <rect x="65" y="145" width="18" height="22" rx="2" fill="#FFFFFF" stroke="#2E7D32" strokeWidth="1.5" />
      <line x1="68" y1="151" x2="80" y2="151" stroke="#4CAF50" strokeWidth="1" />
      <line x1="68" y1="155" x2="78" y2="155" stroke="#4CAF50" strokeWidth="1" />
      <line x1="68" y1="159" x2="80" y2="159" stroke="#4CAF50" strokeWidth="1" />

      {/* "BREW TRUCK" text on body */}
      <text x="150" y="225" fontFamily="sans-serif" fontWeight="700" fontSize="16" fill="#FFFFFF" textAnchor="middle" letterSpacing="2">
        BREW TRUCK
      </text>

      {/* Decorative stripe */}
      <line x1="60" y1="210" x2="270" y2="210" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" strokeDasharray="8 4" />

      {/* Wheels */}
      <circle cx="120" cy="248" r="22" fill="#333" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="120" cy="248" r="10" fill="#666" />
      <circle cx="120" cy="248" r="3" fill="#999" />

      <circle cx="300" cy="248" r="22" fill="#333" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="300" cy="248" r="10" fill="#666" />
      <circle cx="300" cy="248" r="3" fill="#999" />

      {/* Headlight */}
      <circle cx="358" cy="220" r="6" fill="#FFD54F" stroke="#F9A825" strokeWidth="1.5" />

      {/* Steam from truck / coffee */}
      <path d="M155 128 Q158 118 152 110" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M165 130 Q170 117 163 107" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2.5s" repeatCount="indefinite" />
      </path>

      {/* Small coffee cup on serving counter */}
      <rect x="170" y="193" width="12" height="10" rx="2" fill="#795548" stroke="#5D4037" strokeWidth="1" />
      <path d="M182 196 Q186 198 182 200" fill="none" stroke="#5D4037" strokeWidth="1" />

      {/* Small plant on truck roof */}
      <rect x="100" y="114" width="8" height="6" rx="1" fill="#795548" />
      <circle cx="104" cy="110" r="5" fill="#81C784" />
      <circle cx="100" cy="112" r="3" fill="#4CAF50" />
    </svg>
  );
}
