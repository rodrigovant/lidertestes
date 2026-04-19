import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Cotacao } from "@/lib/supabase/types";

async function marcarLida(id: string, lida: boolean) {
  "use server";
  const admin = createAdminClient();
  await admin.from("cotacoes").update({ lida }).eq("id", id);
  revalidatePath("/admin/cotacoes");
  revalidatePath("/admin");
}

async function deletarCotacao(id: string) {
  "use server";
  const admin = createAdminClient();
  await admin.from("cotacoes").delete().eq("id", id);
  revalidatePath("/admin/cotacoes");
  revalidatePath("/admin");
}

export default async function CotacoesPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("cotacoes")
    .select("*")
    .order("created_at", { ascending: false });
  const cotacoes = (data ?? []) as Cotacao[];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-brand-dark)]">
          Cotações recebidas
        </h1>
        <p className="text-[var(--color-muted)] text-sm">
          {cotacoes.length} cotaç{cotacoes.length === 1 ? "ão" : "ões"}
        </p>
      </div>

      {cotacoes.length === 0 ? (
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-10 text-center">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-[var(--color-muted)]">
            Nenhuma cotação recebida ainda.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {cotacoes.map((c) => (
            <div
              key={c.id}
              className={`bg-white border rounded-xl p-5 ${
                c.lida ? "border-[var(--color-border)]" : "border-[var(--color-brand)] shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {!c.lida && (
                      <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                    )}
                    <span className="font-bold text-[var(--color-brand-dark)]">
                      {c.nome}
                    </span>
                    {c.tipo && (
                      <span className="text-xs bg-[var(--color-card)] px-2 py-0.5 rounded">
                        {c.tipo}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--color-muted)]">
                    {new Date(c.created_at).toLocaleString("pt-BR")}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <form action={async () => {
                    "use server";
                    await marcarLida(c.id, !c.lida);
                  }}>
                    <button className="text-[var(--color-brand)] hover:underline font-semibold">
                      {c.lida ? "Marcar como não lida" : "Marcar como lida"}
                    </button>
                  </form>
                  <form action={async () => {
                    "use server";
                    await deletarCotacao(c.id);
                  }}>
                    <button className="text-red-600 hover:underline font-semibold">
                      Excluir
                    </button>
                  </form>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 text-sm mb-3">
                <div>
                  <div className="text-xs text-[var(--color-muted)]">E-mail</div>
                  <a href={`mailto:${c.email}`} className="text-[var(--color-brand)] hover:underline">
                    {c.email}
                  </a>
                </div>
                {c.telefone && (
                  <div>
                    <div className="text-xs text-[var(--color-muted)]">Telefone</div>
                    <div>{c.telefone}</div>
                  </div>
                )}
                {c.empresa && (
                  <div>
                    <div className="text-xs text-[var(--color-muted)]">Empresa</div>
                    <div>{c.empresa}</div>
                  </div>
                )}
                {c.cnpj && (
                  <div>
                    <div className="text-xs text-[var(--color-muted)]">CNPJ</div>
                    <div className="font-mono">{c.cnpj}</div>
                  </div>
                )}
                {c.produto_slug && (
                  <div>
                    <div className="text-xs text-[var(--color-muted)]">Produto</div>
                    <div>{c.produto_slug}</div>
                  </div>
                )}
              </div>

              <div className="bg-[var(--color-card)] rounded-md p-3 text-sm whitespace-pre-wrap">
                {c.mensagem}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
