export default function PizzaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Pizza slice">
      {/* Pizza slice */}
      <path d="M40 12 L14 68 Q40 75 66 68Z" fill="#FFD54F" stroke="#F9A825" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Crust */}
      <path d="M14 68 Q40 78 66 68" fill="#E8A849" stroke="#C68A3C" strokeWidth="2.5" strokeLinecap="round" />
      {/* Sauce base */}
      <path d="M40 18 L18 65 Q40 72 62 65Z" fill="#E53935" opacity="0.3" />
      {/* Pepperoni */}
      <circle cx="35" cy="40" r="5" fill="#C62828" stroke="#B71C1C" strokeWidth="1" />
      <circle cx="48" cy="50" r="4.5" fill="#C62828" stroke="#B71C1C" strokeWidth="1" />
      <circle cx="32" cy="58" r="4" fill="#C62828" stroke="#B71C1C" strokeWidth="1" />
      {/* Cheese drip */}
      <path d="M40 15 Q42 20 40 24" fill="none" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" />
      {/* Herbs */}
      <circle cx="42" cy="35" r="1.5" fill="#4CAF50" />
      <circle cx="28" cy="50" r="1.5" fill="#4CAF50" />
      <circle cx="52" cy="58" r="1.5" fill="#4CAF50" />
    </svg>
  );
}
