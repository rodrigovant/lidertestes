import Link from "next/link";

const servicos = [
  {
    slug: "calibracao",
    icon: "🎯",
    title: "Calibração ISO/IEC 17025",
    desc: "Laboratório acreditado pelo Inmetro com rastreabilidade metrológica nacional. Emitimos certificados reconhecidos em auditorias.",
    items: [
      "Calibração elétrica, temperatura, pressão e dimensional",
      "Rastreabilidade ao INMETRO",
      "Certificados digitais com QR Code de verificação",
      "Coleta e entrega em capitais",
      "Relatório de análise crítica de resultados",
    ],
  },
  {
    slug: "manutencao",
    icon: "🔧",
    title: "Manutenção e Reparo",
    desc: "Assistência técnica autorizada para mais de 40 marcas. Diagnóstico completo com orçamento prévio e garantia de 90 dias.",
    items: [
      "Diagnóstico gratuito para clientes",
      "Peças originais do fabricante",
      "Garantia de 90 dias no serviço",
      "Relatório técnico detalhado",
      "Recalibração opcional pós-manutenção",
    ],
  },
  {
    slug: "aluguel",
    icon: "📦",
    title: "Aluguel de Equipamentos",
    desc: "Programa de locação flexível para projetos de curto e médio prazo. Equipamentos calibrados, prontos para uso.",
    items: [
      "Locação diária, semanal ou mensal",
      "Equipamentos calibrados e certificados",
      "Suporte técnico durante toda a locação",
      "Opção de compra ao final do contrato",
      "Contrato simplificado por e-mail",
    ],
  },
];

export default function ServicosPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[var(--color-brand-dark)] to-[var(--color-brand)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Nossos Serviços</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Soluções completas para o ciclo de vida dos seus equipamentos de teste
            e medição — da aquisição à aposentadoria metrológica.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          {servicos.map((s) => (
            <div
              key={s.slug}
              className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden grid md:grid-cols-[200px_1fr]"
            >
              <div className="bg-[var(--color-brand-light)] flex items-center justify-center p-8 text-7xl">
                {s.icon}
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-2">
                  {s.title}
                </h2>
                <p className="text-[var(--color-muted)] mb-4">{s.desc}</p>
                <ul className="space-y-1.5 mb-6">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm">
                      <span className="text-[var(--color-brand)] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/servicos/${s.slug}`}
                    className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold px-5 py-2 rounded-md text-sm transition-colors"
                  >
                    Saiba mais
                  </Link>
                  <Link
                    href={`/contato?tipo=${s.slug}`}
                    className="bg-white hover:bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] font-semibold px-5 py-2 rounded-md text-sm transition-colors"
                  >
                    Solicitar Orçamento
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
