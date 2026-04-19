import Link from "next/link";

export default function CalibracaoPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[var(--color-brand-dark)] to-[var(--color-brand)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/servicos" className="hover:text-white">Serviços</Link>
            <span className="mx-2">/</span>
            <span>Calibração</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🎯</span>
            <div>
              <h1 className="text-4xl font-bold">Calibração ISO/IEC 17025</h1>
              <p className="text-white/80">
                Laboratório acreditado · Rastreabilidade INMETRO
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-3">
              O que é calibração acreditada
            </h2>
            <p className="text-[var(--color-muted)]">
              A calibração acreditada pela ISO/IEC 17025 é o padrão internacional
              para laboratórios de ensaio e calibração. Significa que nosso
              laboratório foi auditado pelo INMETRO, possui procedimentos
              rastreáveis e emite certificados aceitos em todo o território
              nacional e reconhecidos internacionalmente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Grandeza Elétrica", items: ["Tensão CC/CA", "Corrente CC/CA", "Resistência", "Capacitância"] },
              { title: "Temperatura", items: ["Termômetros digitais", "Termopares", "PT100", "Banhos térmicos"] },
              { title: "Pressão", items: ["Manômetros", "Transmissores", "Calibradores", "Vacuômetros"] },
              { title: "Tempo e Frequência", items: ["Cronômetros", "Geradores de função", "Frequencímetros"] },
            ].map((grp) => (
              <div
                key={grp.title}
                className="bg-white border border-[var(--color-border)] rounded-lg p-6"
              >
                <h3 className="font-bold text-[var(--color-brand-dark)] mb-3">
                  {grp.title}
                </h3>
                <ul className="text-sm space-y-1">
                  {grp.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--color-brand)]">•</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[var(--color-brand-light)] border border-[var(--color-brand)]/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[var(--color-brand-dark)] mb-4">
              Como funciona o processo
            </h2>
            <ol className="space-y-3 text-sm">
              {[
                "Envio da solicitação com lista de equipamentos e grandezas",
                "Cotação em até 24h úteis com prazo e valor",
                "Agendamento da coleta ou envio pelo cliente",
                "Calibração e emissão de certificado digital com QR Code",
                "Devolução com relatório e certificado",
              ].map((step, idx) => (
                <li key={step} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-[var(--color-brand)] text-white rounded-full flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-[var(--color-brand-dark)] text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Solicite orçamento de calibração
            </h2>
            <p className="text-white/80 mb-5">
              Informe a quantidade, marca e modelo dos equipamentos. Retornamos
              em até 24h úteis.
            </p>
            <Link
              href="/contato?tipo=calibracao"
              className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
