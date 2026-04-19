import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./login/actions";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/produtos", label: "Produtos", icon: "📦" },
  { href: "/admin/categorias", label: "Categorias", icon: "🏷️" },
  { href: "/admin/marcas", label: "Marcas", icon: "🏢" },
  { href: "/admin/cotacoes", label: "Cotações", icon: "✉️" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-card)]">
      <aside className="w-64 bg-[var(--color-brand-dark)] text-white flex-shrink-0 hidden md:flex md:flex-col">
        <div className="p-4 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo size={44} onDark />
            <div>
              <div className="font-bold text-sm">LIDERTESTES</div>
              <div className="text-[10px] uppercase tracking-wider text-white/60">
                Admin
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4 text-xs">
          <div className="text-white/60 mb-1">Logado como</div>
          <div className="text-white truncate mb-3">{user.email}</div>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full bg-white/10 hover:bg-white/20 px-3 py-2 rounded text-xs font-semibold transition-colors"
            >
              Sair
            </button>
          </form>
          <Link
            href="/"
            className="block text-center mt-2 text-white/60 hover:text-white text-xs"
          >
            Ver site público →
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="md:hidden bg-[var(--color-brand-dark)] text-white px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo size={32} onDark />
            <span className="font-bold text-sm">Admin</span>
          </Link>
          <form action={signOut}>
            <button className="text-xs bg-white/10 px-3 py-1 rounded">
              Sair
            </button>
          </form>
        </div>

        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
