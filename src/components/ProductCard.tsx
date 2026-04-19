import Link from "next/link";
import { type Product, formatPrice } from "@/lib/data";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group bg-white border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-lg hover:border-[var(--color-brand)] transition-all"
    >
      <div className="aspect-square bg-white overflow-hidden">
        <ProductImage product={product} sizes="(max-width: 768px) 50vw, 25vw" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-brand)]">
            {product.marca?.nome ?? product.marca_slug}
          </span>
          {product.condicao === "seminovo" && (
            <span className="text-xs bg-[var(--color-accent)] text-white px-2 py-0.5 rounded">
              Seminovo
            </span>
          )}
        </div>
        <h3 className="font-semibold text-sm mb-1 group-hover:text-[var(--color-brand)] line-clamp-2">
          {product.nome}
        </h3>
        <p className="text-xs text-[var(--color-muted)] mb-3 line-clamp-2">
          {product.descricao_curta}
        </p>
        <div className="flex items-end justify-between">
          <span className="font-bold text-[var(--color-brand-dark)]">
            {formatPrice(product.preco)}
          </span>
          <span className="text-xs text-[var(--color-muted)]">
            {product.estoque > 0
              ? `${product.estoque} em estoque`
              : "Sob consulta"}
          </span>
        </div>
      </div>
    </Link>
  );
}
