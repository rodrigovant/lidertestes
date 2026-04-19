import Link from "next/link";

export default function GovernoPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[var(--color-brand-dark)] via-[var(--color-brand)] to-[var(--color-brand-dark)] text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <span className="inline-block bg-white/10 border border-white/20 text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Atendimento Exclusivo
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Área Exclusiva para Governo
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            Condições diferenciadas e suporte especializado para órgãos públicos
            federais, estaduais, municipais, autarquias, fundações e forças
            armadas.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              { icon: "📋", title: "SICAF Atualizado", desc: "Cadastro ativo no Sistema de Cadastramento Unificado de Fornecedores." },
              { icon: "⚖️", title: "Pregão Eletrônico", desc: "Experiência em pregões no ComprasNet, BEC-SP, Licitações-e e afins." },
              { icon: "📑", title: "Documentação Completa", desc: "Certidões, atestados, balanço patrimonial e demonstrações financeiras em dia." },
              { icon: "💳", title: "Empenho e Faturamento", desc: "Faturamento após empenho, com prazo estendido para nota fiscal eletrônica." },
              { icon: "🎯", title: "Calibração ISO 17025", desc: "Laboratório acreditado — aceito em auditorias do TCU, CGU e ANVISA." },
              { icon: "🛡️", title: "Garantia Estendida", desc: "Garantia mínima de 12 meses, extensível conforme edital." },
            ].map((it) => (
              <div
                key={it.title}
                className="bg-white border border-[var(--color-border)] rounded-lg p-6"
              >
                <div className="text-3xl mb-2">{it.icon}</div>
                <h3 className="font-bold text-[var(--color-brand-dark)] mb-1">
                  {it.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">{it.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-[var(--color-brand-light)] border border-[var(--color-brand)]/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-4">
                Cadastro de Órgão Público
              </h2>
              <p className="text-sm text-[var(--color-muted)] mb-6">
                Cadastre seu órgão para receber catálogo com preços governamentais,
                acesso a equipamentos sob demanda e suporte técnico dedicado.
              </p>
              <form className="space-y-4" action="/contato" method="GET">
                <input type="hidden" name="tipo" value="governo" />
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Órgão / Instituição
                  </label>
                  <input
                    name="orgao"
                    required
                    className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-brand)]"
                    placeholder="Ex.: Universidade Federal de São Paulo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    CNPJ do órgão
                  </label>
                  <input
                    name="cnpj"
                    required
                    className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-brand)]"
                    placeholder="00.000.000/0001-00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Nome do responsável
                  </label>
                  <input
                    name="nome"
                    required
                    className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    E-mail institucional
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-brand)]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-6 py-3 rounded-md transition-colors"
                >
                  Solicitar Acesso
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mb-3">
                  Documentos disponíveis
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>📄 Certidão Federal Conjunta</span>
                    <span className="text-[var(--color-brand)] font-semibold">Sob solicitação</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>📄 Certidão Estadual e Municipal</span>
                    <span className="text-[var(--color-brand)] font-semibold">Sob solicitação</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>📄 CRF do FGTS</span>
                    <span className="text-[var(--color-brand)] font-semibold">Sob solicitação</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>📄 Atestados de Capacidade Técnica</span>
                    <span className="text-[var(--color-brand)] font-semibold">Sob solicitação</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>📄 Declaração de Idoneidade</span>
                    <span className="text-[var(--color-brand)] font-semibold">Sob solicitação</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--color-brand-dark)] text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Atendimento Direto</h3>
                <p className="text-sm text-white/80 mb-3">
                  Para pregões ou dispensas urgentes, fale direto com nossa equipe
                  de licitações.
                </p>
                <div className="text-sm space-y-1">
                  <div>📞 (11) 0000-0000 ramal 2</div>
                  <div>✉️ licitacoes@lidertestes.com.br</div>
                </div>
              </div>

              <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
                <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mb-3">
                  Órgãos já atendidos
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    "Petrobras","Exército Brasileiro","Marinha","Aeronáutica",
                    "Eletrobras","Dataprev","INMETRO","ANEEL","Polícia Federal",
                    "USP","UFRJ","UNICAMP","Embrapa","IPT","IFSP",
                  ].map((o) => (
                    <span
                      key={o}
                      className="bg-[var(--color-card)] border border-[var(--color-border)] px-2.5 py-1 rounded-full"
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
