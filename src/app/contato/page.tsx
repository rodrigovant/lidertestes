import Link from "next/link";
import { getProduct } from "@/lib/data";

const tipoLabels: Record<string, string> = {
  cotacao: "Solicitar Cotação",
  duvida: "Tirar Dúvida",
  calibracao: "Orçamento de Calibração",
  manutencao: "Diagnóstico / Reparo",
  aluguel: "Cotação de Aluguel",
  governo: "Cadastro — Área Governo",
};

export default async function ContatoPage({
  searchParams,
}: {
  searchParams: Promise<{
    tipo?: string;
    produto?: string;
    orgao?: string;
    cnpj?: string;
    nome?: string;
    email?: string;
  }>;
}) {
  const params = await searchParams;
  const tipo = params.tipo && params.tipo in tipoLabels ? params.tipo : "cotacao";
  const produto = params.produto ? getProduct(params.produto) : null;
  const tituloTipo = tipoLabels[tipo];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-2">
          {tituloTipo}
        </h1>
        <p className="text-[var(--color-muted)]">
          Preencha o formulário e retornamos em até 24h úteis.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <form
          action="mailto:atendimento@lidertestes.com.br"
          method="POST"
          encType="text/plain"
          className="bg-white border border-[var(--color-border)] rounded-xl p-6 space-y-4"
        >
          <input type="hidden" name="tipo_atendimento" value={tituloTipo} />
          {produto && (
            <div className="bg-[var(--color-brand-light)] border border-[var(--color-brand)]/30 rounded-md p-3 text-sm">
              <span className="font-semibold">Produto:</span> {produto.name}
              <input type="hidden" name="produto" value={produto.name} />
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Nome completo *
              </label>
              <input
                name="nome"
                required
                defaultValue={params.nome}
                className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                E-mail *
              </label>
              <input
                type="email"
                name="email"
                required
                defaultValue={params.email}
                className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Telefone / WhatsApp *
              </label>
              <input
                name="telefone"
                required
                placeholder="(11) 90000-0000"
                className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Empresa / Órgão
              </label>
              <input
                name="empresa"
                defaultValue={params.orgao}
                className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              CNPJ {tipo === "governo" && "*"}
            </label>
            <input
              name="cnpj"
              required={tipo === "governo"}
              defaultValue={params.cnpj}
              placeholder="00.000.000/0001-00"
              className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Mensagem *</label>
            <textarea
              name="mensagem"
              required
              rows={6}
              placeholder="Descreva o que precisa: modelo, quantidade, prazo, etc."
              className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
            />
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required className="mt-1" />
            <span className="text-[var(--color-muted)]">
              Autorizo o contato pela LIDERTESTES referente a esta solicitação.
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Enviar Solicitação
          </button>
        </form>

        <aside className="space-y-4">
          <div className="bg-[var(--color-brand-dark)] text-white rounded-xl p-6">
            <h3 className="font-bold mb-3">Canais diretos</h3>
            <ul className="text-sm space-y-2">
              <li>📞 (11) 0000-0000</li>
              <li>💬 WhatsApp (11) 90000-0000</li>
              <li>✉️ atendimento@lidertestes.com.br</li>
              <li>🏛️ licitacoes@lidertestes.com.br</li>
            </ul>
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="font-bold text-[var(--color-brand-dark)] mb-3">
              Horário de atendimento
            </h3>
            <ul className="text-sm space-y-1 text-[var(--color-muted)]">
              <li>Seg–Sex · 08h–18h</li>
              <li>Sábado · 09h–13h</li>
            </ul>
          </div>

          <div className="bg-[var(--color-brand-light)] border border-[var(--color-brand)]/20 rounded-xl p-6">
            <h3 className="font-bold text-[var(--color-brand-dark)] mb-2">
              Endereço
            </h3>
            <p className="text-sm text-[var(--color-muted)]">
              Rua Exemplo, 100
              <br />
              Sala 01 · São Paulo / SP
              <br />
              CEP 00000-000
            </p>
          </div>

          {tipo === "governo" && (
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
              <p className="text-sm text-[var(--color-muted)]">
                Você também pode acessar diretamente a{" "}
                <Link
                  href="/governo"
                  className="text-[var(--color-brand)] font-semibold hover:underline"
                >
                  Área Governo
                </Link>{" "}
                para mais informações.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
