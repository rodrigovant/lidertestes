import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
  onDark?: boolean;
};

export default function Logo({
  size = 44,
  className = "",
  onDark = false,
}: LogoProps) {
  const bg = onDark ? "bg-white" : "bg-transparent";
  return (
    <div
      className={`relative rounded-lg overflow-hidden ${bg} ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="LIDERTESTES"
        fill
        sizes={`${size}px`}
        className="object-contain p-1"
        priority
      />
    </div>
  );
}
