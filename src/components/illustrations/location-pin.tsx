export default function LocationPin({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Location pin"
    >
      {/* Shadow */}
      <ellipse cx="40" cy="92" rx="16" ry="5" fill="#E8E2D6" opacity="0.5" />

      {/* Pin body */}
      <path
        d="M40 90 C40 90 12 55 12 35 C12 19.5 24.5 7 40 7 C55.5 7 68 19.5 68 35 C68 55 40 90 40 90Z"
        fill="#4CAF50"
        stroke="#2E7D32"
        strokeWidth="2.5"
      />

      {/* Inner circle */}
      <circle cx="40" cy="35" r="16" fill="#FFFFFF" />

      {/* Small truck inside */}
      <rect x="28" y="30" width="24" height="12" rx="2" fill="#4CAF50" />
      <rect x="46" y="33" width="8" height="9" rx="1" fill="#2E7D32" />
      <rect x="47" y="34" width="5" height="4" rx="1" fill="#B3E5FC" />
      <circle cx="34" cy="43" r="3" fill="#333" />
      <circle cx="34" cy="43" r="1.2" fill="#666" />
      <circle cx="50" cy="43" r="3" fill="#333" />
      <circle cx="50" cy="43" r="1.2" fill="#666" />
    </svg>
  );
}
