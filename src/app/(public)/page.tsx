import Link from "next/link";
import { getCategorias, getMarcas, getProdutos } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BrandLogo from "@/components/BrandLogo";

export default async function HomePage() {
  const [categorias, marcas, featured] = await Promise.all([
    getCategorias(),
    getMarcas(),
    getProdutos({ limit: 4 }),
  ]);

  return (
    <>
      <section className="bg-gradient-to-br from-[var(--color-brand-dark)] via-[var(--color-brand)] to-[var(--color-brand-dark)] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-white/10 border border-white/20 text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Distribuidor Autorizado · ISO/IEC 17025
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Equipamentos de teste, calibração e manutenção em um só lugar.
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Venda de instrumentos novos e seminovos certificados, calibração
              acreditada e suporte técnico especializado para indústria, laboratórios
              e órgãos públicos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/produtos" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-6 py-3 rounded-md transition-colors">
                Ver Catálogo
              </Link>
              <Link href="/contato?tipo=cotacao" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                Solicitar Cotação
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-2xl font-bold">20+</div>
                <div className="text-white/70">anos de mercado</div>
              </div>
              <div>
                <div className="text-2xl font-bold">2.500+</div>
                <div className="text-white/70">clientes atendidos</div>
              </div>
              <div>
                <div className="text-2xl font-bold">ISO 17025</div>
                <div className="text-white/70">laboratório acreditado</div>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "⚡", label: "Medição Elétrica" },
                { emoji: "🌡️", label: "Temperatura" },
                { emoji: "📡", label: "RF / Microondas" },
                { emoji: "🎯", label: "Calibradores" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="text-sm font-semibold">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-card)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-2">
              Categorias de Produtos
            </h2>
            <p className="text-[var(--color-muted)]">
              Explore nosso catálogo por tipo de equipamento.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categorias.map((c) => (
              <Link key={c.slug} href={`/produtos?categoria=${c.slug}`} className="bg-white border border-[var(--color-border)] rounded-lg p-4 text-center hover:border-[var(--color-brand)] hover:shadow-md transition-all">
                <div className="text-4xl mb-2">{c.icone}</div>
                <div className="text-sm font-semibold text-[var(--color-brand-dark)]">
                  {c.nome}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-2">
                Produtos em Destaque
              </h2>
              <p className="text-[var(--color-muted)]">
                Seleção dos equipamentos mais procurados.
              </p>
            </div>
            <Link href="/produtos" className="text-sm font-semibold text-[var(--color-brand)] hover:underline hidden sm:block">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-brand-light)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-2">
              Nossos Serviços
            </h2>
            <p className="text-[var(--color-muted)]">
              Muito além da venda — soluções completas para o ciclo de vida do seu equipamento.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Calibração ISO/IEC 17025", desc: "Laboratório acreditado com rastreabilidade ao INMETRO. Certificados reconhecidos em todo o território nacional.", href: "/servicos/calibracao" },
              { icon: "🔧", title: "Manutenção e Reparo", desc: "Assistência técnica autorizada para as principais marcas do mercado. Orçamento prévio e garantia de 90 dias.", href: "/servicos/manutencao" },
              { icon: "📦", title: "Aluguel de Equipamentos", desc: "Programa de locação flexível para projetos pontuais, com opção de compra ao final do contrato.", href: "/servicos/aluguel" },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="bg-white rounded-xl p-6 border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-lg text-[var(--color-brand-dark)] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] mb-3">{s.desc}</p>
                <span className="text-sm font-semibold text-[var(--color-brand)]">
                  Saiba mais →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-brand-dark)] mb-2">
              Marcas Parceiras
            </h2>
            <p className="text-[var(--color-muted)]">
              Trabalhamos com os principais fabricantes mundiais.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {marcas.map((b) => (
              <BrandLogo key={b.slug} brand={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-brand-dark)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Área Exclusiva para Governo</h2>
          <p className="text-white/80 mb-6">
            Atendimento especializado para órgãos públicos: cadastro SICAF, pregão
            eletrônico, documentação completa e preços diferenciados.
          </p>
          <Link href="/governo" className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-8 py-3 rounded-md transition-colors">
            Acessar Área Governo
          </Link>
        </div>
      </section>
    </>
  );
}
