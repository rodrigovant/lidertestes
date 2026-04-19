import Link from "next/link";
import Image from "next/image";
import { type Brand } from "@/lib/data";
import { findBrandLogo } from "@/lib/product-images";

export default function BrandLogo({ brand }: { brand: Brand }) {
  const logoPath = brand.logo_url ?? findBrandLogo(brand.slug);

  return (
    <Link
      href={`/produtos?marca=${brand.slug}`}
      title={`${brand.nome}${brand.pais ? ` · ${brand.pais}` : ""}`}
      className="group bg-white border border-[var(--color-border)] rounded-lg p-6 h-24 flex items-center justify-center hover:border-[var(--color-brand)] transition-all"
    >
      {logoPath ? (
        <div className="relative w-full h-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
          <Image
            src={logoPath}
            alt={brand.nome}
            fill
            sizes="200px"
            className="object-contain"
          />
        </div>
      ) : (
        <span className="font-bold text-xl tracking-tight text-[var(--color-brand-dark)] opacity-50 group-hover:opacity-100 transition-opacity">
          {brand.nome}
        </span>
      )}
    </Link>
  );
}
