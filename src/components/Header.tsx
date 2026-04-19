import Link from "next/link";
import Logo from "./Logo";

const navItems = [
  { href: "/produtos", label: "Produtos" },
  { href: "/servicos", label: "Serviços" },
  { href: "/governo", label: "Área Governo" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)] shadow-sm">
      <div className="bg-[var(--color-brand-dark)] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <span>📞 (11) 0000-0000 · atendimento@lidertestes.com.br</span>
          <span className="hidden sm:inline">
            Laboratório de Calibração ISO/IEC 17025 · Distribuidor Autorizado
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={53} />
          <div>
            <div className="font-bold text-lg leading-tight text-[var(--color-brand-dark)]">
              LIDERTESTES
            </div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)]">
              Equipamentos · Calibração · Manutenção
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-foreground)] hover:text-[var(--color-brand)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contato?tipo=cotacao"
            className="hidden sm:inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors"
          >
            Solicitar Cotação
          </Link>
        </div>
      </div>

      <nav className="md:hidden border-t border-[var(--color-border)] overflow-x-auto">
        <div className="flex gap-4 px-4 py-2 text-sm whitespace-nowrap">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-foreground)] hover:text-[var(--color-brand)] font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
