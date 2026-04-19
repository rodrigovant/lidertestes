import Link from "next/link";

export default function SobrePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[var(--color-brand-dark)] to-[var(--color-brand)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sobre a LIDERTESTES</h1>
          <p className="text-lg text-white/80">
            Há mais de 20 anos fornecendo equipamentos de teste, calibração e
            manutenção para indústria, laboratórios e órgãos públicos de todo o
            Brasil.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-3">
              Nossa história
            </h2>
            <p className="text-[var(--color-muted)] mb-3">
              A LIDERTESTES nasceu com a missão de simplificar o acesso a
              instrumentação de precisão no Brasil. Começamos como revenda de
              multímetros e termovisores e, ao longo dos anos, expandimos para um
              portfólio completo com mais de 50 marcas representadas.
            </p>
            <p className="text-[var(--color-muted)]">
              Em 2012, inauguramos nosso laboratório de calibração, acreditado pela
              ISO/IEC 17025, consolidando a operação como um fornecedor completo
              para o ciclo de vida do equipamento.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { num: "20+", label: "anos de mercado" },
              { num: "2.500+", label: "clientes ativos" },
              { num: "50+", label: "marcas parceiras" },
              { num: "10.000+", label: "calibrações/ano" },
              { num: "ISO 17025", label: "laboratório acreditado" },
              { num: "48h", label: "tempo médio de cotação" },
            ].map((n) => (
              <div
                key={n.label}
                className="bg-white border border-[var(--color-border)] rounded-lg p-6 text-center"
              >
                <div className="text-3xl font-bold text-[var(--color-brand-dark)]">
                  {n.num}
                </div>
                <div className="text-sm text-[var(--color-muted)] mt-1">
                  {n.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-[var(--color-brand-dark)] mb-2">
                Missão
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                Fornecer soluções de medição confiáveis, ampliando o acesso à
                tecnologia metrológica no Brasil.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--color-brand-dark)] mb-2">
                Visão
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                Ser referência nacional em equipamentos de teste e serviços
                metrológicos até 2030.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[var(--color-brand-dark)] mb-2">
                Valores
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                Precisão, transparência, suporte técnico de verdade e compromisso
                com o cliente.
              </p>
            </div>
          </div>

          <div className="bg-[var(--color-brand-dark)] text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Vamos conversar?</h2>
            <p className="text-white/80 mb-5">
              Fale com nossa equipe técnica — estamos prontos para atender.
            </p>
            <Link
              href="/contato"
              className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Entrar em Contato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
