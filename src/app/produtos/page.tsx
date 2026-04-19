import Link from "next/link";
import { products, categories, brands, getCategory, getBrand } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; marca?: string; busca?: string }>;
}) {
  const params = await searchParams;
  const { categoria, marca, busca } = params;

  let filtered = products;
  if (categoria) filtered = filtered.filter((p) => p.category === categoria);
  if (marca) filtered = filtered.filter((p) => p.brand === marca);
  if (busca) {
    const q = busca.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q),
    );
  }

  const categoryInfo = categoria ? getCategory(categoria) : null;
  const brandInfo = marca ? getBrand(marca) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <nav className="text-sm text-[var(--color-muted)] mb-3">
          <Link href="/" className="hover:text-[var(--color-brand)]">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-foreground)]">Produtos</span>
        </nav>
        <h1 className="text-3xl font-bold text-[var(--color-brand-dark)]">
          {categoryInfo
            ? categoryInfo.name
            : brandInfo
              ? `Equipamentos ${brandInfo.name}`
              : "Catálogo Completo"}
        </h1>
        {categoryInfo && (
          <p className="text-[var(--color-muted)] mt-2">
            {categoryInfo.description}
          </p>
        )}
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6">
          <div className="bg-white border border-[var(--color-border)] rounded-lg p-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--color-brand-dark)] mb-3">
              Categorias
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/produtos"
                  className={`block text-sm py-1 ${
                    !categoria && !marca
                      ? "text-[var(--color-brand)] font-semibold"
                      : "text-[var(--color-foreground)] hover:text-[var(--color-brand)]"
                  }`}
                >
                  Todos os produtos
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/produtos?categoria=${c.slug}`}
                    className={`block text-sm py-1 ${
                      categoria === c.slug
                        ? "text-[var(--color-brand)] font-semibold"
                        : "text-[var(--color-foreground)] hover:text-[var(--color-brand)]"
                    }`}
                  >
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-lg p-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--color-brand-dark)] mb-3">
              Marcas
            </h3>
            <ul className="space-y-1.5">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/produtos?marca=${b.slug}`}
                    className={`block text-sm py-1 ${
                      marca === b.slug
                        ? "text-[var(--color-brand)] font-semibold"
                        : "text-[var(--color-foreground)] hover:text-[var(--color-brand)]"
                    }`}
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--color-brand-light)] border border-[var(--color-brand)]/20 rounded-lg p-4">
            <h3 className="font-bold text-sm text-[var(--color-brand-dark)] mb-2">
              Não encontrou?
            </h3>
            <p className="text-xs text-[var(--color-muted)] mb-3">
              Trabalhamos com milhares de equipamentos sob demanda.
            </p>
            <Link
              href="/contato?tipo=cotacao"
              className="block text-center bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold px-3 py-2 rounded text-sm transition-colors"
            >
              Solicitar Cotação
            </Link>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[var(--color-muted)]">
              {filtered.length}{" "}
              {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-10 text-center">
              <p className="text-[var(--color-muted)] mb-4">
                Nenhum produto encontrado com esses filtros.
              </p>
              <Link
                href="/produtos"
                className="text-[var(--color-brand)] font-semibold hover:underline"
              >
                Ver todos os produtos
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
