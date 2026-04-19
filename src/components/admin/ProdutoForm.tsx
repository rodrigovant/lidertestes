import Link from "next/link";
import Image from "next/image";
import type { Produto, Categoria, Marca } from "@/lib/supabase/types";
import { saveProduto } from "@/app/admin/produtos/actions";

type Props = {
  produto?: Produto;
  categorias: Categoria[];
  marcas: Marca[];
};

export default function ProdutoForm({ produto, categorias, marcas }: Props) {
  const recursosText = (produto?.recursos ?? []).join("\n");
  const especsText = Object.entries(produto?.especificacoes ?? {})
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  async function action(formData: FormData) {
    "use server";
    await saveProduto(produto?.id ?? null, formData);
  }

  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nome *</label>
          <input
            name="nome"
            required
            defaultValue={produto?.nome}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Slug (URL)
            <span className="text-xs font-normal text-[var(--color-muted)] ml-2">
              deixe vazio para gerar automaticamente
            </span>
          </label>
          <input
            name="slug"
            defaultValue={produto?.slug}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--color-brand)]"
            placeholder="exemplo-produto-123"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Marca</label>
          <select
            name="marca_slug"
            defaultValue={produto?.marca_slug ?? ""}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-brand)]"
          >
            <option value="">— selecione —</option>
            {marcas.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Categoria</label>
          <select
            name="categoria_slug"
            defaultValue={produto?.categoria_slug ?? ""}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-brand)]"
          >
            <option value="">— selecione —</option>
            {categorias.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.icone} {c.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Descrição curta</label>
        <input
          name="descricao_curta"
          defaultValue={produto?.descricao_curta ?? ""}
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
          placeholder="Aparece nos cards e resultados de busca"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Descrição completa</label>
        <textarea
          name="descricao"
          rows={4}
          defaultValue={produto?.descricao ?? ""}
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Preço (R$)</label>
          <input
            name="preco"
            type="number"
            step="0.01"
            defaultValue={produto?.preco ?? ""}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
            placeholder="Vazio = sob consulta"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Condição</label>
          <select
            name="condicao"
            defaultValue={produto?.condicao ?? "novo"}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-brand)]"
          >
            <option value="novo">Novo</option>
            <option value="seminovo">Seminovo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Estoque</label>
          <input
            name="estoque"
            type="number"
            min="0"
            defaultValue={produto?.estoque ?? 0}
            className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-brand)]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Recursos principais
          <span className="text-xs font-normal text-[var(--color-muted)] ml-2">
            um por linha
          </span>
        </label>
        <textarea
          name="recursos"
          rows={5}
          defaultValue={recursosText}
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--color-brand)]"
          placeholder="True-RMS CA\nResolução de 50.000 contagens\nBluetooth para relatórios"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Especificações técnicas
          <span className="text-xs font-normal text-[var(--color-muted)] ml-2">
            formato: <code>chave: valor</code> (uma por linha)
          </span>
        </label>
        <textarea
          name="especificacoes"
          rows={6}
          defaultValue={especsText}
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:border-[var(--color-brand)]"
          placeholder="Tensão: 1000 V CC / 1000 V CA&#10;Corrente: 10 A&#10;Precisão: 0,025% CC"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Foto do produto</label>
        {produto?.imagem_url && (
          <div className="mb-3 flex items-center gap-3 bg-[var(--color-card)] border border-[var(--color-border)] rounded-md p-2">
            <div className="relative w-16 h-16 bg-white rounded overflow-hidden">
              <Image src={produto.imagem_url} alt={produto.nome} fill sizes="64px" className="object-contain" />
            </div>
            <div className="text-xs text-[var(--color-muted)] break-all">
              Imagem atual. Envie nova pra substituir.
            </div>
            <input type="hidden" name="imagem_existente" value={produto.imagem_url} />
          </div>
        )}
        <input
          name="imagem"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="w-full border border-[var(--color-border)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--color-brand)]"
        />
        <p className="text-xs text-[var(--color-muted)] mt-1">
          JPG, PNG ou WebP · ideal 800×800 px · fundo branco
        </p>
      </div>

      <div className="flex flex-wrap gap-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-md p-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="ativo"
            defaultChecked={produto?.ativo ?? true}
          />
          <span className="font-semibold">Ativo</span>
          <span className="text-[var(--color-muted)]">(aparece no site)</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="destaque"
            defaultChecked={produto?.destaque ?? false}
          />
          <span className="font-semibold">Destaque</span>
          <span className="text-[var(--color-muted)]">(aparece na home)</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-[var(--color-border)]">
        <Link
          href="/admin/produtos"
          className="px-5 py-2 rounded-md border border-[var(--color-border)] bg-white hover:bg-[var(--color-card)] text-sm font-semibold transition-colors"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white text-sm font-semibold transition-colors"
        >
          Salvar produto
        </button>
      </div>
    </form>
  );
}
