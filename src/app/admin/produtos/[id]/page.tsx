import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { getCategorias, getMarcas } from "@/lib/data";
import ProdutoForm from "@/components/admin/ProdutoForm";
import type { Produto } from "@/lib/supabase/types";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();

  const produto = data as Produto;
  const [categorias, marcas] = await Promise.all([getCategorias(), getMarcas()]);

  return (
    <div>
      <nav className="text-sm text-[var(--color-muted)] mb-3">
        <Link href="/admin" className="hover:text-[var(--color-brand)]">Admin</Link>
        <span className="mx-2">/</span>
        <Link href="/admin/produtos" className="hover:text-[var(--color-brand)]">Produtos</Link>
        <span className="mx-2">/</span>
        <span>{produto.nome}</span>
      </nav>
      <h1 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-6">
        Editar produto
      </h1>
      <ProdutoForm produto={produto} categorias={categorias} marcas={marcas} />
    </div>
  );
}
