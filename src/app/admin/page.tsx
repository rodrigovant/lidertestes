import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminDashboard() {
  const supabase = createAdminClient();

  const [{ count: totalProdutos }, { count: totalAtivos }, { count: cotacoesNaoLidas }, { count: totalCotacoes }] =
    await Promise.all([
      supabase.from("produtos").select("id", { count: "exact", head: true }),
      supabase.from("produtos").select("id", { count: "exact", head: true }).eq("ativo", true),
      supabase.from("cotacoes").select("id", { count: "exact", head: true }).eq("lida", false),
      supabase.from("cotacoes").select("id", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Produtos cadastrados", value: totalProdutos ?? 0, color: "bg-blue-50 text-blue-700", icon: "📦" },
    { label: "Produtos ativos", value: totalAtivos ?? 0, color: "bg-green-50 text-green-700", icon: "✅" },
    { label: "Cotações não lidas", value: cotacoesNaoLidas ?? 0, color: "bg-orange-50 text-orange-700", icon: "✉️" },
    { label: "Total de cotações", value: totalCotacoes ?? 0, color: "bg-purple-50 text-purple-700", icon: "📊" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-brand-dark)]">Dashboard</h1>
        <p className="text-[var(--color-muted)]">Visão geral do painel administrativo.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} border border-white rounded-xl p-5`}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-xs font-semibold mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/admin/produtos/novo" className="bg-white border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-brand)] hover:shadow-lg transition-all">
          <div className="text-3xl mb-2">➕</div>
          <h2 className="font-bold text-[var(--color-brand-dark)] mb-1">Adicionar novo produto</h2>
          <p className="text-sm text-[var(--color-muted)]">
            Cadastre um novo equipamento no catálogo com foto, preço e especificações.
          </p>
        </Link>

        <Link href="/admin/cotacoes" className="bg-white border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-brand)] hover:shadow-lg transition-all">
          <div className="text-3xl mb-2">✉️</div>
          <h2 className="font-bold text-[var(--color-brand-dark)] mb-1">Ver cotações recebidas</h2>
          <p className="text-sm text-[var(--color-muted)]">
            Atender solicitações de orçamento enviadas pelo site.
          </p>
        </Link>
      </div>
    </div>
  );
}
