interface WavyDividerProps {
  className?: string;
  fill?: string;
  flip?: boolean;
}

export default function WavyDivider({
  className = "",
  fill = "#F5F0E8",
  flip = false,
}: WavyDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full block ${flip ? "rotate-180" : ""} ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
        fill={fill}
      />
    </svg>
  );
}
