import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 44, className = "" }: LogoProps) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-white ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="LIDERTESTES"
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority
      />
    </div>
  );
}
