import Link from "next/link";
import Image from "next/image";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/data";
import type { Produto } from "@/lib/supabase/types";
import { deleteProduto, toggleAtivo } from "./actions";

export default async function AdminProdutosPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .order("created_at", { ascending: false });
  const produtos = (data ?? []) as Produto[];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-brand-dark)]">
            Produtos
          </h1>
          <p className="text-[var(--color-muted)] text-sm">
            {produtos.length} produto{produtos.length === 1 ? "" : "s"} no total
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors"
        >
          ➕ Novo produto
        </Link>
      </div>

      <div className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-card)] border-b border-[var(--color-border)]">
            <tr>
              <th className="text-left p-3 font-semibold">Foto</th>
              <th className="text-left p-3 font-semibold">Nome</th>
              <th className="text-left p-3 font-semibold hidden md:table-cell">Marca</th>
              <th className="text-left p-3 font-semibold hidden md:table-cell">Preço</th>
              <th className="text-left p-3 font-semibold hidden lg:table-cell">Estoque</th>
              <th className="text-center p-3 font-semibold">Ativo</th>
              <th className="text-right p-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} className="border-b border-[var(--color-border)] last:border-0">
                <td className="p-3">
                  {p.imagem_url ? (
                    <div className="relative w-12 h-12 bg-white border border-[var(--color-border)] rounded overflow-hidden">
                      <Image src={p.imagem_url} alt={p.nome} fill sizes="48px" className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-[var(--color-card)] rounded flex items-center justify-center text-xl">
                      📟
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <Link href={`/admin/produtos/${p.id}`} className="font-semibold hover:text-[var(--color-brand)]">
                    {p.nome}
                  </Link>
                  <div className="text-xs text-[var(--color-muted)]">{p.slug}</div>
                </td>
                <td className="p-3 hidden md:table-cell text-[var(--color-muted)]">
                  {p.marca_slug}
                </td>
                <td className="p-3 hidden md:table-cell">{formatPrice(p.preco)}</td>
                <td className="p-3 hidden lg:table-cell">{p.estoque}</td>
                <td className="p-3 text-center">
                  <form action={async () => {
                    "use server";
                    await toggleAtivo(p.id, !p.ativo);
                  }}>
                    <button type="submit" className={`text-xs px-2 py-1 rounded-full ${p.ativo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {p.ativo ? "Ativo" : "Inativo"}
                    </button>
                  </form>
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/produtos/${p.id}`} className="text-[var(--color-brand)] hover:underline text-xs font-semibold">
                      Editar
                    </Link>
                    <form action={async () => {
                      "use server";
                      await deleteProduto(p.id);
                    }}>
                      <button type="submit" className="text-red-600 hover:underline text-xs font-semibold">
                        Excluir
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {produtos.length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-center text-[var(--color-muted)]">
                  Nenhum produto cadastrado ainda.{" "}
                  <Link href="/admin/produtos/novo" className="text-[var(--color-brand)] font-semibold hover:underline">
                    Adicionar o primeiro
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
