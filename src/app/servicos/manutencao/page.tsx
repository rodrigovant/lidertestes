import Link from "next/link";

export default function ManutencaoPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[var(--color-brand-dark)] to-[var(--color-brand)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/servicos" className="hover:text-white">Serviços</Link>
            <span className="mx-2">/</span>
            <span>Manutenção</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🔧</span>
            <div>
              <h1 className="text-4xl font-bold">Manutenção e Reparo</h1>
              <p className="text-white/80">
                Assistência técnica autorizada · Garantia de 90 dias
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-3">
              O que oferecemos
            </h2>
            <p className="text-[var(--color-muted)]">
              Somos assistência técnica autorizada de fabricantes como Fluke, FLIR,
              Megger e Hioki, e atendemos equipamentos fora de linha de mais de 40
              marcas. Todo serviço inclui diagnóstico, orçamento prévio e garantia
              de 90 dias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "🔍",
                title: "Diagnóstico",
                desc: "Análise completa com laudo técnico detalhando o defeito e o custo estimado do reparo.",
              },
              {
                icon: "🛠️",
                title: "Reparo",
                desc: "Substituição de componentes, placas e módulos com peças originais do fabricante.",
              },
              {
                icon: "🎯",
                title: "Recalibração",
                desc: "Após o reparo, o equipamento passa por calibração para garantir exatidão metrológica.",
              },
            ].map((it) => (
              <div
                key={it.title}
                className="bg-white border border-[var(--color-border)] rounded-lg p-6 text-center"
              >
                <div className="text-4xl mb-2">{it.icon}</div>
                <h3 className="font-bold text-[var(--color-brand-dark)] mb-2">
                  {it.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)]">{it.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-xl p-8">
            <h2 className="text-xl font-bold text-[var(--color-brand-dark)] mb-4">
              Marcas atendidas
            </h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                "Fluke","FLIR","Keysight","Rohde & Schwarz","Testo","Megger","Hioki",
                "Yokogawa","Tektronix","Chauvin Arnoux","Agilent","Kyoritsu","Minipa",
                "Instrutherm","Kimo","Extech","Tekpower",
              ].map((b) => (
                <span
                  key={b}
                  className="bg-[var(--color-card)] border border-[var(--color-border)] px-3 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[var(--color-brand-dark)] text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Enviar equipamento para análise</h2>
            <p className="text-white/80 mb-5">
              Diagnóstico sem compromisso. Você só aprova o serviço depois de receber
              o orçamento.
            </p>
            <Link
              href="/contato?tipo=manutencao"
              className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Solicitar Diagnóstico
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
