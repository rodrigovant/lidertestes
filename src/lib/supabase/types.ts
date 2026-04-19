export type Categoria = {
  slug: string;
  nome: string;
  descricao: string | null;
  icone: string | null;
  ordem: number;
};

export type Marca = {
  slug: string;
  nome: string;
  pais: string | null;
  logo_url: string | null;
  ordem: number;
};

export type Produto = {
  id: string;
  slug: string;
  nome: string;
  marca_slug: string | null;
  categoria_slug: string | null;
  descricao_curta: string | null;
  descricao: string | null;
  preco: number | null;
  condicao: "novo" | "seminovo";
  recursos: string[];
  especificacoes: Record<string, string>;
  estoque: number;
  imagem_url: string | null;
  ativo: boolean;
  destaque: boolean;
  created_at: string;
  updated_at: string;
  marca?: Marca | null;
  categoria?: Categoria | null;
};

export type Cotacao = {
  id: string;
  tipo: string | null;
  nome: string;
  email: string;
  telefone: string | null;
  empresa: string | null;
  cnpj: string | null;
  produto_slug: string | null;
  mensagem: string;
  lida: boolean;
  created_at: string;
};

export type ProdutoInput = {
  slug: string;
  nome: string;
  marca_slug: string | null;
  categoria_slug: string | null;
  descricao_curta: string | null;
  descricao: string | null;
  preco: number | null;
  condicao: "novo" | "seminovo";
  recursos: string[];
  especificacoes: Record<string, string>;
  estoque: number;
  imagem_url: string | null;
  ativo: boolean;
  destaque: boolean;
};
