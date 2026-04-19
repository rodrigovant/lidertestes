import Link from "next/link";

export default function AluguelPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[var(--color-brand-dark)] to-[var(--color-brand)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
            <Link href="/servicos" className="hover:text-white">Serviços</Link>
            <span className="mx-2">/</span>
            <span>Aluguel</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">📦</span>
            <div>
              <h1 className="text-4xl font-bold">Aluguel de Equipamentos</h1>
              <p className="text-white/80">
                Locação flexível com calibração inclusa
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <p className="text-[var(--color-muted)] text-lg">
            Ideal para projetos pontuais, obras, comissionamento de plantas e
            auditorias. Todo equipamento é entregue calibrado, com certificado
            dentro do prazo de validade.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <h3 className="font-bold text-[var(--color-brand-dark)] mb-3">
                Vantagens da locação
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-[var(--color-brand)]">✓</span>
                  <span>Sem imobilização de capital</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-brand)]">✓</span>
                  <span>Equipamento sempre atualizado</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-brand)]">✓</span>
                  <span>Calibração e suporte técnico inclusos</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-brand)]">✓</span>
                  <span>Valores reduzidos para locação longa</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-brand)]">✓</span>
                  <span>Opção de compra ao final do contrato</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-[var(--color-border)] rounded-lg p-6">
              <h3 className="font-bold text-[var(--color-brand-dark)] mb-3">
                Modalidades
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-semibold">Curto prazo</dt>
                  <dd className="text-[var(--color-muted)]">
                    De 1 dia a 30 dias — diária ou semanal.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Médio prazo</dt>
                  <dd className="text-[var(--color-muted)]">
                    De 1 a 6 meses — mensal com desconto progressivo.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Longo prazo</dt>
                  <dd className="text-[var(--color-muted)]">
                    Acima de 6 meses — contrato customizado.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-[var(--color-brand-dark)] text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Solicitar cotação de aluguel</h2>
            <p className="text-white/80 mb-5">
              Informe o equipamento, período e local de uso. Retornamos em até 24h
              úteis.
            </p>
            <Link
              href="/contato?tipo=aluguel"
              className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Solicitar Cotação
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
