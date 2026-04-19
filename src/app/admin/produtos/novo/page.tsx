import Link from "next/link";
import { getCategorias, getMarcas } from "@/lib/data";
import ProdutoForm from "@/components/admin/ProdutoForm";

export default async function NovoProdutoPage() {
  const [categorias, marcas] = await Promise.all([getCategorias(), getMarcas()]);

  return (
    <div>
      <nav className="text-sm text-[var(--color-muted)] mb-3">
        <Link href="/admin" className="hover:text-[var(--color-brand)]">Admin</Link>
        <span className="mx-2">/</span>
        <Link href="/admin/produtos" className="hover:text-[var(--color-brand)]">Produtos</Link>
        <span className="mx-2">/</span>
        <span>Novo</span>
      </nav>
      <h1 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-6">
        Novo produto
      </h1>
      <ProdutoForm categorias={categorias} marcas={marcas} />
    </div>
  );
}
