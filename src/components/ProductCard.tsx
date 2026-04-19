import Link from "next/link";
import { type Product, formatPrice, getBrand } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const brand = getBrand(product.brand);
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group bg-white border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-lg hover:border-[var(--color-brand)] transition-all"
    >
      <div className="aspect-square bg-gradient-to-br from-[var(--color-brand-light)] to-white flex items-center justify-center text-6xl">
        📟
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-brand)]">
            {brand?.name}
          </span>
          {product.condition === "seminovo" && (
            <span className="text-xs bg-[var(--color-accent)] text-white px-2 py-0.5 rounded">
              Seminovo
            </span>
          )}
        </div>
        <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--color-brand)] line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-[var(--color-muted)] mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="flex items-end justify-between">
          <span className="font-bold text-[var(--color-brand-dark)]">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-[var(--color-muted)]">
            {product.stock > 0 ? `${product.stock} em estoque` : "Sob consulta"}
          </span>
        </div>
      </div>
    </Link>
  );
}
