export default function CheesecakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Cheesecake">
      {/* Plate */}
      <ellipse cx="40" cy="68" rx="35" ry="6" fill="#E8E2D6" stroke="#D7CFC3" strokeWidth="1.5" />
      {/* Cake base (crust) */}
      <path d="M18 55 L62 55 L58 65 L22 65Z" fill="#D4A056" stroke="#B8863C" strokeWidth="1.5" />
      {/* Cake body */}
      <path d="M16 35 L18 55 L62 55 L64 35Z" fill="#FFF8E1" stroke="#E8D5A8" strokeWidth="2" strokeLinecap="round" />
      {/* Triangular slice shape - front face */}
      <path d="M16 35 L64 35 L40 20Z" fill="#FFFDE7" stroke="#E8D5A8" strokeWidth="2" strokeLinejoin="round" />
      {/* Topping drizzle */}
      <path d="M25 35 Q30 30 35 35 Q40 30 45 35 Q50 30 55 35" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
      {/* Fruit on top */}
      <circle cx="35" cy="28" r="3" fill="#E53935" />
      <circle cx="45" cy="28" r="2.5" fill="#E53935" />
      <circle cx="40" cy="25" r="2" fill="#E53935" opacity="0.7" />
      {/* Leaf garnish */}
      <path d="M48 25 Q52 22 50 28" fill="#4CAF50" stroke="#2E7D32" strokeWidth="0.8" />
    </svg>
  );
}
