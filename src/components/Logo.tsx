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
  const gradId = `lt-wave-${variant}`;
  const isWhite = variant === "white";

  const navy = "#1e3a5f";
  const orange = "#e8722e";
  const bg = isWhite ? "#ffffff" : "#f5f7fa";

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
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={navy} />
          <stop offset="0.45" stopColor={navy} />
          <stop offset="0.55" stopColor={orange} />
          <stop offset="1" stopColor={orange} />
        </linearGradient>
      </defs>

      <rect width="100" height="100" rx="14" fill={bg} />

      <g fill={navy}>
        <rect x="18" y="20" width="12" height="24" rx="1.5" />
        <rect x="18" y="56" width="12" height="22" rx="1.5" />
        <rect x="33" y="65" width="20" height="13" rx="1.5" />
      </g>

      <g fill={orange}>
        <rect x="55" y="20" width="14" height="14" rx="1.5" />
        <rect x="72" y="20" width="14" height="14" rx="1.5" />
        <rect x="63" y="38" width="12" height="10" rx="1.5" />
        <rect x="63" y="56" width="12" height="22" rx="1.5" />
      </g>

      <path
        d="M 10 52 Q 20 44 30 52 Q 40 60 50 52 Q 60 44 70 52 Q 80 60 90 52"
        stroke={`url(#${gradId})`}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
