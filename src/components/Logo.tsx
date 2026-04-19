type LogoProps = {
  size?: number;
  variant?: "color" | "white";
  className?: string;
};

export default function Logo({
  size = 44,
  variant = "color",
  className = "",
}: LogoProps) {
  const bgGradId = `lt-bg-${variant}`;
  const isWhite = variant === "white";

  const bgStart = isWhite ? "#ffffff" : "#0a4da2";
  const bgEnd = isWhite ? "#e8f0fb" : "#073873";
  const letterColor = isWhite ? "#0a4da2" : "#ffffff";
  const accent = "#f97316";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LIDERTESTES"
      role="img"
    >
      <defs>
        <linearGradient id={bgGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bgStart} />
          <stop offset="1" stopColor={bgEnd} />
        </linearGradient>
      </defs>

      <rect width="100" height="100" rx="20" fill={`url(#${bgGradId})`} />

      <g fill={letterColor}>
        <rect x="20" y="24" width="9" height="42" rx="1.5" />
        <rect x="20" y="57" width="24" height="9" rx="1.5" />

        <rect x="52" y="24" width="30" height="9" rx="1.5" />
        <rect x="62" y="24" width="10" height="42" rx="1.5" />
      </g>

      <circle cx="82" cy="22" r="4" fill={accent} />
      <circle cx="82" cy="22" r="4" fill={accent} opacity="0.4">
        <animate
          attributeName="r"
          values="4;7;4"
          dur="2.2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.5;0;0.5"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </circle>

      <path
        d="M 14 82 L 24 82 L 29 74 L 39 90 L 49 82 L 56 82 L 61 76 L 67 82 L 86 82"
        stroke={accent}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
