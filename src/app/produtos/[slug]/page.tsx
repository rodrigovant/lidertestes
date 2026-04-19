import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProduct,
  getBrand,
  getCategory,
  formatPrice,
  products,
} from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const brand = getBrand(product.brand);
  const category = getCategory(product.category);
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-muted)] mb-6">
        <Link href="/" className="hover:text-[var(--color-brand)]">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link href="/produtos" className="hover:text-[var(--color-brand)]">
          Produtos
        </Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/produtos?categoria=${category.slug}`}
              className="hover:text-[var(--color-brand)]"
            >
              {category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-[var(--color-foreground)]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        <div>
          <div className="aspect-square bg-gradient-to-br from-[var(--color-brand-light)] to-white rounded-xl border border-[var(--color-border)] flex items-center justify-center text-9xl">
            📟
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-brand)]">
              {brand?.name} · {brand?.country}
            </span>
            {product.condition === "seminovo" && (
              <span className="text-xs bg-[var(--color-accent)] text-white px-2 py-0.5 rounded">
                Seminovo Certificado
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-3">
            {product.name}
          </h1>
          <p className="text-[var(--color-muted)] mb-6">{product.description}</p>

          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-[var(--color-brand-dark)]">
                {formatPrice(product.price)}
              </span>
              {product.price && (
                <span className="text-sm text-[var(--color-muted)]">
                  à vista
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--color-muted)] mb-4">
              {product.stock > 0
                ? `✅ ${product.stock} ${product.stock === 1 ? "unidade" : "unidades"} em estoque`
                : "Sob consulta — prazo estimado 15 dias úteis"}
            </p>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/contato?tipo=cotacao&produto=${product.slug}`}
                className="flex-1 text-center bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Solicitar Cotação
              </Link>
              <Link
                href={`/contato?tipo=duvida&produto=${product.slug}`}
                className="flex-1 text-center bg-white hover:bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] font-semibold px-6 py-3 rounded-md transition-colors"
              >
                Tirar Dúvida
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-white border border-[var(--color-border)] rounded p-3">
              <div className="text-xl mb-1">🛡️</div>
              <div className="font-semibold">Garantia oficial</div>
              <div className="text-[var(--color-muted)]">do fabricante</div>
            </div>
            <div className="bg-white border border-[var(--color-border)] rounded p-3">
              <div className="text-xl mb-1">📋</div>
              <div className="font-semibold">NF-e</div>
              <div className="text-[var(--color-muted)]">nota fiscal</div>
            </div>
            <div className="bg-white border border-[var(--color-border)] rounded p-3">
              <div className="text-xl mb-1">🎯</div>
              <div className="font-semibold">Calibração</div>
              <div className="text-[var(--color-muted)]">opcional ISO 17025</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
          <h2 className="text-xl font-bold text-[var(--color-brand-dark)] mb-4">
            Principais Recursos
          </h2>
          <ul className="space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm">
                <span className="text-[var(--color-brand)] font-bold">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
          <h2 className="text-xl font-bold text-[var(--color-brand-dark)] mb-4">
            Especificações Técnicas
          </h2>
          <dl className="space-y-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between text-sm py-1.5 border-b border-[var(--color-border)] last:border-0"
              >
                <dt className="text-[var(--color-muted)]">{key}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-6">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
