import Link from "next/link";
import { categories, brands } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-dark)] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Logo size={48} onDark />
            <div className="font-bold text-lg">LIDERTESTES</div>
          </div>
          <p className="text-sm text-white/80">
            Soluções completas em equipamentos de teste, calibração ISO/IEC 17025 e
            manutenção técnica para indústria, laboratórios e governo.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
            Categorias
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/produtos?categoria=${c.slug}`}
                  className="hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
            Marcas
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            {brands.slice(0, 6).map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/produtos?marca=${b.slug}`}
                  className="hover:text-white"
                >
                  {b.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
            Contato
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>📞 (11) 0000-0000</li>
            <li>✉️ atendimento@lidertestes.com.br</li>
            <li>🏢 Rua Exemplo, 100 — São Paulo/SP</li>
            <li className="pt-2">
              <Link
                href="/governo"
                className="inline-block bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-3 py-1.5 rounded text-xs transition-colors"
              >
                Área Governo
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-white/60 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} LIDERTESTES. Todos os direitos reservados.</span>
          <span>CNPJ 00.000.000/0001-00 · lidertestes.com.br</span>
        </div>
      </div>
    </footer>
  );
}
