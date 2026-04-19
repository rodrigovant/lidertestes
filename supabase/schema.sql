-- ============================================================
-- LIDERTESTES - Schema inicial do banco de dados
-- ============================================================
-- Rode este SQL completo no painel do Supabase:
--   Menu lateral → SQL Editor → New query → cole tudo → Run

-- ============================================================
-- 1. TABELAS
-- ============================================================

create table if not exists public.categorias (
  slug text primary key,
  nome text not null,
  descricao text,
  icone text,
  ordem integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.marcas (
  slug text primary key,
  nome text not null,
  pais text,
  logo_url text,
  ordem integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.produtos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  nome text not null,
  marca_slug text references public.marcas(slug) on delete set null,
  categoria_slug text references public.categorias(slug) on delete set null,
  descricao_curta text,
  descricao text,
  preco numeric(10,2),
  condicao text check (condicao in ('novo','seminovo')) default 'novo',
  recursos jsonb default '[]'::jsonb,
  especificacoes jsonb default '{}'::jsonb,
  estoque integer default 0,
  imagem_url text,
  ativo boolean default true,
  destaque boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.cotacoes (
  id uuid primary key default gen_random_uuid(),
  tipo text,
  nome text not null,
  email text not null,
  telefone text,
  empresa text,
  cnpj text,
  produto_slug text,
  mensagem text not null,
  lida boolean default false,
  created_at timestamptz default now()
);

-- Índices úteis
create index if not exists produtos_categoria_idx on public.produtos(categoria_slug);
create index if not exists produtos_marca_idx on public.produtos(marca_slug);
create index if not exists produtos_ativo_idx on public.produtos(ativo);
create index if not exists produtos_destaque_idx on public.produtos(destaque);
create index if not exists cotacoes_lida_idx on public.cotacoes(lida);

-- Trigger pra updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists produtos_set_updated_at on public.produtos;
create trigger produtos_set_updated_at
  before update on public.produtos
  for each row execute function public.set_updated_at();

-- ============================================================
-- 2. RLS (Row Level Security) - Segurança por linha
-- ============================================================

alter table public.categorias enable row level security;
alter table public.marcas enable row level security;
alter table public.produtos enable row level security;
alter table public.cotacoes enable row level security;

-- Categorias: todos podem ler, só autenticados podem editar
drop policy if exists "categorias_select" on public.categorias;
create policy "categorias_select" on public.categorias for select using (true);

drop policy if exists "categorias_modify" on public.categorias;
create policy "categorias_modify" on public.categorias
  for all using (auth.role() = 'authenticated');

-- Marcas: mesmas regras de categorias
drop policy if exists "marcas_select" on public.marcas;
create policy "marcas_select" on public.marcas for select using (true);

drop policy if exists "marcas_modify" on public.marcas;
create policy "marcas_modify" on public.marcas
  for all using (auth.role() = 'authenticated');

-- Produtos: público vê só ativos, autenticado vê tudo e edita
drop policy if exists "produtos_public_select" on public.produtos;
create policy "produtos_public_select" on public.produtos
  for select using (ativo = true);

drop policy if exists "produtos_auth_all" on public.produtos;
create policy "produtos_auth_all" on public.produtos
  for all using (auth.role() = 'authenticated');

-- Cotações: qualquer um pode inserir, só autenticado lê/edita
drop policy if exists "cotacoes_insert" on public.cotacoes;
create policy "cotacoes_insert" on public.cotacoes
  for insert with check (true);

drop policy if exists "cotacoes_auth_all" on public.cotacoes;
create policy "cotacoes_auth_all" on public.cotacoes
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- 3. STORAGE BUCKET para fotos dos produtos
-- ============================================================

insert into storage.buckets (id, name, public)
values ('produtos', 'produtos', true)
on conflict (id) do nothing;

-- Permitir leitura pública
drop policy if exists "produtos_public_read" on storage.objects;
create policy "produtos_public_read" on storage.objects
  for select using (bucket_id = 'produtos');

-- Permitir upload/delete apenas para autenticados
drop policy if exists "produtos_auth_write" on storage.objects;
create policy "produtos_auth_write" on storage.objects
  for all using (bucket_id = 'produtos' and auth.role() = 'authenticated');

-- ============================================================
-- 4. SEED - popular com dados atuais
-- ============================================================

-- Categorias
insert into public.categorias (slug, nome, descricao, icone, ordem) values
  ('medicao-eletrica', 'Medição Elétrica', 'Multímetros, osciloscópios, analisadores de energia, pinças amperimétricas.', '⚡', 1),
  ('temperatura-pressao', 'Temperatura e Pressão', 'Calibradores, termovisores, manômetros digitais e registradores.', '🌡️', 2),
  ('rf-microondas', 'RF e Microondas', 'Analisadores de espectro, geradores de sinal e analisadores de rede.', '📡', 3),
  ('alta-tensao', 'Alta Tensão', 'Testadores de isolamento, hipot, análise de subestação.', '⚠️', 4),
  ('ensaios-nao-destrutivos', 'Ensaios Não Destrutivos (NDT)', 'Ultrassom, medidores de espessura, endoscópios industriais.', '🔍', 5),
  ('calibradores', 'Calibradores Multifunção', 'Calibradores de processo, loop, temperatura e pressão.', '🎯', 6)
on conflict (slug) do update set
  nome = excluded.nome,
  descricao = excluded.descricao,
  icone = excluded.icone,
  ordem = excluded.ordem;

-- Marcas
insert into public.marcas (slug, nome, pais, ordem) values
  ('fluke', 'Fluke', 'EUA', 1),
  ('flir', 'FLIR', 'EUA', 2),
  ('keysight', 'Keysight', 'EUA', 3),
  ('rohde-schwarz', 'Rohde & Schwarz', 'Alemanha', 4),
  ('testo', 'Testo', 'Alemanha', 5),
  ('megger', 'Megger', 'Reino Unido', 6),
  ('hioki', 'Hioki', 'Japão', 7),
  ('yokogawa', 'Yokogawa', 'Japão', 8),
  ('chauvin-arnoux', 'Chauvin Arnoux', 'França', 9),
  ('tektronix', 'Tektronix', 'EUA', 10)
on conflict (slug) do update set
  nome = excluded.nome,
  pais = excluded.pais,
  ordem = excluded.ordem;

-- Produtos
insert into public.produtos (slug, nome, marca_slug, categoria_slug, descricao_curta, descricao, preco, condicao, recursos, especificacoes, estoque, imagem_url, destaque) values
  (
    'fluke-289-multimetro',
    'Fluke 289 — Multímetro Digital Industrial',
    'fluke', 'medicao-eletrica',
    'Multímetro True-RMS com registro de dados e tela gráfica.',
    'Multímetro digital de alta precisão com registrador de dados integrado, gráfico TrendCapture e True-RMS. Ideal para diagnóstico industrial, HVAC e manutenção elétrica avançada.',
    8490.00, 'novo',
    '["Registro de dados (até 15.000 pontos)","Gráfico TrendCapture na tela","True-RMS CA","Resolução de 50.000 contagens","Interface i-Flex com pinça flexível"]'::jsonb,
    '{"Tensão":"1000 V CC / 1000 V CA","Corrente":"10 A (20 A por 30s)","Resistência":"500 MΩ","Precisão":"0,025% básica CC","Display":"Gráfico com iluminação"}'::jsonb,
    4, '/products/fluke-289-multimetro.jpg', true
  ),
  (
    'flir-e8-termografica',
    'FLIR E8-XT — Câmera Termográfica',
    'flir', 'temperatura-pressao',
    'Câmera térmica 320×240 com MSX para inspeções elétricas e prediais.',
    'Câmera termográfica profissional com tecnologia MSX que sobrepõe detalhes visuais à imagem térmica, facilitando a identificação de pontos quentes.',
    24900.00, 'novo',
    '["Resolução 320×240 (76.800 pixels)","Tecnologia MSX de realce","Faixa -20 °C a +550 °C","Wi-Fi integrado","Sensibilidade térmica < 0,06 °C"]'::jsonb,
    '{"Resolução":"320×240","Temperatura":"-20 °C a +550 °C","Bateria":"4 horas","Peso":"575 g","Conectividade":"Wi-Fi"}'::jsonb,
    2, '/products/flir-e8-termografica.jpg', true
  ),
  (
    'keysight-dsox1204g-osciloscopio',
    'Keysight DSOX1204G — Osciloscópio 200 MHz',
    'keysight', 'medicao-eletrica',
    'Osciloscópio 4 canais, 200 MHz, com gerador de função integrado.',
    'Osciloscópio de bancada com tela WVGA de 7'''', taxa de amostragem de 2 GSa/s e gerador de função embutido. Ideal para laboratórios de ensino e pesquisa.',
    15800.00, 'novo',
    '["4 canais analógicos","200 MHz de banda","2 GSa/s de amostragem","Gerador de função WaveGen integrado","Tela colorida de 7''''"]'::jsonb,
    '{"Banda":"200 MHz","Canais":"4","Amostragem":"2 GSa/s","Memória":"1 Mpts","Tela":"7\" WVGA"}'::jsonb,
    3, '/products/keysight-dsox1204g-osciloscopio.jpg', true
  ),
  (
    'megger-mit525-isolamento',
    'Megger MIT525 — Testador de Isolamento 5 kV',
    'megger', 'alta-tensao',
    'Megôhmetro de 5 kV com índices PI, DAR e rampa de tensão.',
    'Instrumento de alta tensão para ensaios de isolamento em motores, transformadores e cabos. Executa testes automáticos de PI, DAR, rampa e degrau.',
    32500.00, 'novo',
    '["Saída de 5 kV CC","Resistência até 1 TΩ","Testes PI / DAR automáticos","Rampa de tensão programável","Bluetooth para relatórios"]'::jsonb,
    '{"Tensão máx.":"5.000 V CC","Resistência máx.":"1 TΩ","Bateria":"Li-ion 8h","Peso":"3,3 kg","Proteção":"IP54"}'::jsonb,
    1, '/products/megger-mit525-isolamento.jpg', true
  ),
  (
    'hioki-3169-analisador-energia',
    'Hioki 3169-20 — Analisador de Qualidade de Energia',
    'hioki', 'medicao-eletrica',
    'Registrador trifásico para análise de harmônicas e eventos.',
    'Registrador de qualidade de energia trifásico, com análise de harmônicas até a 50ª ordem, detecção de transientes e registro de longo período.',
    41200.00, 'novo',
    '["Análise até 50ª harmônica","Detecção de transientes","Registro de até 1 ano","Medição de demanda","Conformidade EN50160"]'::jsonb,
    '{"Fases":"3P4F","Tensão":"600 V AC","Corrente":"5.000 A (com pinças)","Memória":"2 GB","Comunicação":"USB / Ethernet"}'::jsonb,
    2, '/products/hioki-3169-analisador-energia.jpg', false
  ),
  (
    'testo-549-manifold',
    'Testo 549 — Manifold Digital HVAC',
    'testo', 'temperatura-pressao',
    'Manifold digital para refrigeração com base de dados de 90+ fluidos.',
    'Manifold digital compacto para serviço de refrigeração e ar-condicionado, com cálculo automático de superaquecimento e sub-resfriamento.',
    2890.00, 'novo',
    '["Base com 90+ fluidos refrigerantes","Superaquecimento e sub-resfriamento automáticos","Bluetooth com app Testo Smart","IP42","3 anos de garantia"]'::jsonb,
    '{"Pressão":"-1 a +60 bar","Temperatura":"-50 a +150 °C","Precisão":"0,5% f.e.","Bateria":"250 h","App":"Testo Smart"}'::jsonb,
    8, '/products/testo-549-manifold.jpg', false
  ),
  (
    'rohde-fsh4-analisador-espectro',
    'Rohde & Schwarz FSH4 — Analisador de Espectro Portátil 3,6 GHz',
    'rohde-schwarz', 'rf-microondas',
    'Analisador de espectro portátil para campo e laboratório.',
    'Analisador de espectro portátil robusto, ideal para instalação de antenas, medição de EMI e manutenção de redes sem fio.',
    68900.00, 'novo',
    '["9 kHz a 3,6 GHz","DANL -141 dBm","Modo analisador de rede","Bateria 4,5 horas","IP51"]'::jsonb,
    '{"Faixa":"9 kHz – 3,6 GHz","RBW":"1 Hz – 3 MHz","DANL":"-141 dBm","Peso":"2,5 kg","Display":"6,5'''' TFT"}'::jsonb,
    1, '/products/rohde-fsh4-analisador-espectro.jpg', false
  ),
  (
    'fluke-754-calibrador',
    'Fluke 754 — Calibrador Documentador de Processo',
    'fluke', 'calibradores',
    'Calibrador multifunção com HART integrado e documentação automática.',
    'Calibrador documentador robusto com comunicação HART, ideal para calibração e manutenção de instrumentação industrial em campo.',
    52400.00, 'novo',
    '["Comunicação HART integrada","Fonte e medição de mA / V / Ω / Hz","Documentação automática","Interface com software DPCTrack2","Bateria Li-ion"]'::jsonb,
    '{"Corrente":"0–24 mA","Tensão":"0–300 V","Resistência":"0–10 kΩ","HART":"Sim (nativo)","Bateria":"8 h"}'::jsonb,
    2, '/products/fluke-754-calibrador.jpg', false
  )
on conflict (slug) do update set
  nome = excluded.nome,
  marca_slug = excluded.marca_slug,
  categoria_slug = excluded.categoria_slug,
  descricao_curta = excluded.descricao_curta,
  descricao = excluded.descricao,
  preco = excluded.preco,
  condicao = excluded.condicao,
  recursos = excluded.recursos,
  especificacoes = excluded.especificacoes,
  estoque = excluded.estoque,
  imagem_url = excluded.imagem_url,
  destaque = excluded.destaque;

-- ============================================================
-- PRONTO! Se tudo rodou sem erro, o banco está configurado.
-- ============================================================
