export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export type Brand = {
  slug: string;
  name: string;
  country: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number | null;
  condition: "novo" | "seminovo";
  features: string[];
  specs: Record<string, string>;
  stock: number;
};

export const categories: Category[] = [
  {
    slug: "medicao-eletrica",
    name: "Medição Elétrica",
    description: "Multímetros, osciloscópios, analisadores de energia, pinças amperimétricas.",
    icon: "⚡",
  },
  {
    slug: "temperatura-pressao",
    name: "Temperatura e Pressão",
    description: "Calibradores, termovisores, manômetros digitais e registradores.",
    icon: "🌡️",
  },
  {
    slug: "rf-microondas",
    name: "RF e Microondas",
    description: "Analisadores de espectro, geradores de sinal e analisadores de rede.",
    icon: "📡",
  },
  {
    slug: "alta-tensao",
    name: "Alta Tensão",
    description: "Testadores de isolamento, hipot, análise de subestação.",
    icon: "⚠️",
  },
  {
    slug: "ensaios-nao-destrutivos",
    name: "Ensaios Não Destrutivos (NDT)",
    description: "Ultrassom, medidores de espessura, endoscópios industriais.",
    icon: "🔍",
  },
  {
    slug: "calibradores",
    name: "Calibradores Multifunção",
    description: "Calibradores de processo, loop, temperatura e pressão.",
    icon: "🎯",
  },
];

export const brands: Brand[] = [
  { slug: "fluke", name: "Fluke", country: "EUA" },
  { slug: "flir", name: "FLIR", country: "EUA" },
  { slug: "keysight", name: "Keysight", country: "EUA" },
  { slug: "rohde-schwarz", name: "Rohde & Schwarz", country: "Alemanha" },
  { slug: "testo", name: "Testo", country: "Alemanha" },
  { slug: "megger", name: "Megger", country: "Reino Unido" },
  { slug: "hioki", name: "Hioki", country: "Japão" },
  { slug: "yokogawa", name: "Yokogawa", country: "Japão" },
  { slug: "chauvin-arnoux", name: "Chauvin Arnoux", country: "França" },
  { slug: "tektronix", name: "Tektronix", country: "EUA" },
];

export const products: Product[] = [
  {
    slug: "fluke-289-multimetro",
    name: "Fluke 289 — Multímetro Digital Industrial",
    brand: "fluke",
    category: "medicao-eletrica",
    shortDescription: "Multímetro True-RMS com registro de dados e tela gráfica.",
    description:
      "Multímetro digital de alta precisão com registrador de dados integrado, gráfico TrendCapture e True-RMS. Ideal para diagnóstico industrial, HVAC e manutenção elétrica avançada.",
    price: 8490.0,
    condition: "novo",
    features: [
      "Registro de dados (até 15.000 pontos)",
      "Gráfico TrendCapture na tela",
      "True-RMS CA",
      "Resolução de 50.000 contagens",
      "Interface i-Flex com pinça flexível",
    ],
    specs: {
      Tensão: "1000 V CC / 1000 V CA",
      Corrente: "10 A (20 A por 30s)",
      Resistência: "500 MΩ",
      Precisão: "0,025% básica CC",
      Display: "Gráfico com iluminação",
    },
    stock: 4,
  },
  {
    slug: "flir-e8-termografica",
    name: "FLIR E8-XT — Câmera Termográfica",
    brand: "flir",
    category: "temperatura-pressao",
    shortDescription: "Câmera térmica 320×240 com MSX para inspeções elétricas e prediais.",
    description:
      "Câmera termográfica profissional com tecnologia MSX que sobrepõe detalhes visuais à imagem térmica, facilitando a identificação de pontos quentes.",
    price: 24900.0,
    condition: "novo",
    features: [
      "Resolução 320×240 (76.800 pixels)",
      "Tecnologia MSX de realce",
      "Faixa -20 °C a +550 °C",
      "Wi-Fi integrado",
      "Sensibilidade térmica < 0,06 °C",
    ],
    specs: {
      Resolução: "320×240",
      Temperatura: "-20 °C a +550 °C",
      Bateria: "4 horas",
      Peso: "575 g",
      Conectividade: "Wi-Fi",
    },
    stock: 2,
  },
  {
    slug: "keysight-dsox1204g-osciloscopio",
    name: "Keysight DSOX1204G — Osciloscópio 200 MHz",
    brand: "keysight",
    category: "medicao-eletrica",
    shortDescription: "Osciloscópio 4 canais, 200 MHz, com gerador de função integrado.",
    description:
      "Osciloscópio de bancada com tela WVGA de 7'', taxa de amostragem de 2 GSa/s e gerador de função embutido. Ideal para laboratórios de ensino e pesquisa.",
    price: 15800.0,
    condition: "novo",
    features: [
      "4 canais analógicos",
      "200 MHz de banda",
      "2 GSa/s de amostragem",
      "Gerador de função WaveGen integrado",
      "Tela colorida de 7''",
    ],
    specs: {
      Banda: "200 MHz",
      Canais: "4",
      Amostragem: "2 GSa/s",
      Memória: "1 Mpts",
      Tela: '7" WVGA',
    },
    stock: 3,
  },
  {
    slug: "megger-mit525-isolamento",
    name: "Megger MIT525 — Testador de Isolamento 5 kV",
    brand: "megger",
    category: "alta-tensao",
    shortDescription: "Megôhmetro de 5 kV com índices PI, DAR e rampa de tensão.",
    description:
      "Instrumento de alta tensão para ensaios de isolamento em motores, transformadores e cabos. Executa testes automáticos de PI, DAR, rampa e degrau.",
    price: 32500.0,
    condition: "novo",
    features: [
      "Saída de 5 kV CC",
      "Resistência até 1 TΩ",
      "Testes PI / DAR automáticos",
      "Rampa de tensão programável",
      "Bluetooth para relatórios",
    ],
    specs: {
      "Tensão máx.": "5.000 V CC",
      "Resistência máx.": "1 TΩ",
      Bateria: "Li-ion 8h",
      Peso: "3,3 kg",
      Proteção: "IP54",
    },
    stock: 1,
  },
  {
    slug: "hioki-3169-analisador-energia",
    name: "Hioki 3169-20 — Analisador de Qualidade de Energia",
    brand: "hioki",
    category: "medicao-eletrica",
    shortDescription: "Registrador trifásico para análise de harmônicas e eventos.",
    description:
      "Registrador de qualidade de energia trifásico, com análise de harmônicas até a 50ª ordem, detecção de transientes e registro de longo período.",
    price: 41200.0,
    condition: "novo",
    features: [
      "Análise até 50ª harmônica",
      "Detecção de transientes",
      "Registro de até 1 ano",
      "Medição de demanda",
      "Conformidade EN50160",
    ],
    specs: {
      Fases: "3P4F",
      Tensão: "600 V AC",
      Corrente: "5.000 A (com pinças)",
      Memória: "2 GB",
      Comunicação: "USB / Ethernet",
    },
    stock: 2,
  },
  {
    slug: "testo-549-manifold",
    name: "Testo 549 — Manifold Digital HVAC",
    brand: "testo",
    category: "temperatura-pressao",
    shortDescription: "Manifold digital para refrigeração com base de dados de 90+ fluidos.",
    description:
      "Manifold digital compacto para serviço de refrigeração e ar-condicionado, com cálculo automático de superaquecimento e sub-resfriamento.",
    price: 2890.0,
    condition: "novo",
    features: [
      "Base com 90+ fluidos refrigerantes",
      "Superaquecimento e sub-resfriamento automáticos",
      "Bluetooth com app Testo Smart",
      "IP42",
      "3 anos de garantia",
    ],
    specs: {
      Pressão: "-1 a +60 bar",
      Temperatura: "-50 a +150 °C",
      Precisão: "0,5% f.e.",
      Bateria: "250 h",
      App: "Testo Smart",
    },
    stock: 8,
  },
  {
    slug: "rohde-fsh4-analisador-espectro",
    name: "Rohde & Schwarz FSH4 — Analisador de Espectro Portátil 3,6 GHz",
    brand: "rohde-schwarz",
    category: "rf-microondas",
    shortDescription: "Analisador de espectro portátil para campo e laboratório.",
    description:
      "Analisador de espectro portátil robusto, ideal para instalação de antenas, medição de EMI e manutenção de redes sem fio.",
    price: 68900.0,
    condition: "novo",
    features: [
      "9 kHz a 3,6 GHz",
      "DANL -141 dBm",
      "Modo analisador de rede",
      "Bateria 4,5 horas",
      "IP51",
    ],
    specs: {
      Faixa: "9 kHz – 3,6 GHz",
      RBW: "1 Hz – 3 MHz",
      DANL: "-141 dBm",
      Peso: "2,5 kg",
      Display: "6,5'' TFT",
    },
    stock: 1,
  },
  {
    slug: "fluke-754-calibrador",
    name: "Fluke 754 — Calibrador Documentador de Processo",
    brand: "fluke",
    category: "calibradores",
    shortDescription: "Calibrador multifunção com HART integrado e documentação automática.",
    description:
      "Calibrador documentador robusto com comunicação HART, ideal para calibração e manutenção de instrumentação industrial em campo.",
    price: 52400.0,
    condition: "novo",
    features: [
      "Comunicação HART integrada",
      "Fonte e medição de mA / V / Ω / Hz",
      "Documentação automática",
      "Interface com software DPCTrack2",
      "Bateria Li-ion",
    ],
    specs: {
      Corrente: "0–24 mA",
      Tensão: "0–300 V",
      Resistência: "0–10 kΩ",
      HART: "Sim (nativo)",
      Bateria: "8 h",
    },
    stock: 2,
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brand === brandSlug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function formatPrice(value: number | null): string {
  if (value === null) return "Sob consulta";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
