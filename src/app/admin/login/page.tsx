import Link from "next/link";
import Logo from "@/components/Logo";
import { signIn } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string; next?: string }>;
}) {
  const { erro, next } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-card)] px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 justify-center mb-8">
          <Logo size={56} />
          <div>
            <div className="font-bold text-xl text-[var(--color-brand-dark)]">
              LIDERTESTES
            </div>
            <div className="text-xs uppercase tracking-wider text-[var(--color-muted)]">
              Painel Administrativo
            </div>
          </div>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 shadow-sm">
          <h1 className="text-xl font-bold text-[var(--color-brand-dark)] mb-5">
            Entrar
          </h1>

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2 mb-4">
              {erro === "Invalid login credentials"
                ? "E-mail ou senha incorretos."
                : erro}
            </div>
          )}

          <form action={signIn} className="space-y-4">
            <input type="hidden" name="next" value={next ?? "/admin"} />

            <div>
              <label className="block text-sm font-semibold mb-1">E-mail</label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Senha</label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold px-4 py-2.5 rounded-md transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[var(--color-muted)] mt-6">
          <Link href="/" className="hover:text-[var(--color-brand)]">
            ← Voltar para o site
          </Link>
        </p>
      </div>
    </div>
  );
}
