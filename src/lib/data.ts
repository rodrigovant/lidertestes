import { createClient } from "./supabase/server";
import type { Categoria, Marca, Produto } from "./supabase/types";

export type Category = Categoria;
export type Brand = Marca;
export type Product = Produto;

const PRODUTO_JOIN =
  "*, marca:marcas(slug,nome,pais,logo_url,ordem), categoria:categorias(slug,nome,descricao,icone,ordem)";

export async function getCategorias(): Promise<Categoria[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("categorias").select("*").order("ordem");
  return data ?? [];
}

export async function getMarcas(): Promise<Marca[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("marcas").select("*").order("ordem");
  return data ?? [];
}

export async function getProdutos(filters?: {
  categoria?: string;
  marca?: string;
  busca?: string;
  destaque?: boolean;
  limit?: number;
}): Promise<Produto[]> {
  const supabase = await createClient();
  let query = supabase
    .from("produtos")
    .select(PRODUTO_JOIN)
    .eq("ativo", true)
    .order("created_at", { ascending: false });

  if (filters?.categoria) query = query.eq("categoria_slug", filters.categoria);
  if (filters?.marca) query = query.eq("marca_slug", filters.marca);
  if (filters?.destaque !== undefined)
    query = query.eq("destaque", filters.destaque);
  if (filters?.busca) {
    const q = `%${filters.busca}%`;
    query = query.or(`nome.ilike.${q},descricao_curta.ilike.${q}`);
  }
  if (filters?.limit) query = query.limit(filters.limit);

  const { data } = await query;
  return (data ?? []) as unknown as Produto[];
}

export async function getProduto(slug: string): Promise<Produto | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("produtos")
    .select(PRODUTO_JOIN)
    .eq("slug", slug)
    .eq("ativo", true)
    .maybeSingle();
  return data as unknown as Produto | null;
}

export async function getCategoria(slug: string): Promise<Categoria | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categorias")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function getMarca(slug: string): Promise<Marca | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("marcas")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export function formatPrice(value: number | null): string {
  if (value === null || value === undefined) return "Sob consulta";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
