import { type Product } from "@/lib/data";

type Props = {
  product: Product;
  className?: string;
};

function DisplayContent({ category }: { category: string | null }) {
  switch (category) {
    case "medicao-eletrica":
      return (
        <g>
          <text x="100" y="70" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="22" fontWeight="700" fill="#0a4da2">240.0</text>
          <text x="100" y="88" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="#64748b">V AC · True-RMS</text>
        </g>
      );
    case "temperatura-pressao":
      return (
        <g>
          <text x="100" y="70" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="22" fontWeight="700" fill="#c2410c">23.5°C</text>
          <text x="100" y="88" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="#64748b">T ambiente</text>
        </g>
      );
    case "rf-microondas":
      return (
        <g>
          {[[55,85,8,14],[65,80,8,19],[75,72,8,27],[85,58,8,41],[95,66,8,33],[105,75,8,24],[115,70,8,29],[125,78,8,21],[135,84,8,15]].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="#0a4da2" opacity="0.7" />
          ))}
          <text x="100" y="50" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#64748b">2.4 GHz</text>
        </g>
      );
    case "alta-tensao":
      return (
        <g>
          <text x="100" y="70" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="20" fontWeight="700" fill="#c2410c">1.0 GΩ</text>
          <text x="100" y="88" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="#64748b">5 kV · IR Test</text>
        </g>
      );
    case "calibradores":
      return (
        <g>
          <text x="100" y="68" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="20" fontWeight="700" fill="#0a4da2">4.000</text>
          <text x="100" y="85" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="#64748b">mA · Source</text>
        </g>
      );
    default:
      return (
        <g>
          <path d="M 55 75 L 70 75 L 75 62 L 85 90 L 95 75 L 110 75 L 115 66 L 125 82 L 145 75" stroke="#0a4da2" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
  }
}

export default function InstrumentIllustration({ product, className = "" }: Props) {
  const brandName = product.marca?.nome ?? product.marca_slug ?? "LIDERTESTES";
  const isScope =
    product.slug.includes("osciloscopio") ||
    product.slug.includes("espectro") ||
    product.categoria_slug === "rf-microondas";

  const bodyFill = "#f8fafc";
  const bodyStroke = "#cbd5e1";
  const accentStroke = "#0a4da2";

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className} aria-label={product.nome} role="img">
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8f0fb" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="screen-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1f5f9" />
          <stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#bg-grad)" />
      {isScope ? (
        <g>
          <rect x="30" y="50" width="140" height="100" rx="6" fill={bodyFill} stroke={bodyStroke} strokeWidth="2" />
          <rect x="40" y="60" width="120" height="60" rx="3" fill="url(#screen-grad)" stroke={bodyStroke} />
          <DisplayContent category={product.categoria_slug} />
          <g>
            <circle cx="55" cy="138" r="5" fill={accentStroke} />
            <circle cx="75" cy="138" r="5" fill="#cbd5e1" />
            <circle cx="95" cy="138" r="5" fill="#cbd5e1" />
            <rect x="115" y="133" width="40" height="10" rx="2" fill="#cbd5e1" />
          </g>
        </g>
      ) : (
        <g>
          <rect x="55" y="30" width="90" height="140" rx="10" fill={bodyFill} stroke={bodyStroke} strokeWidth="2" />
          <rect x="65" y="42" width="70" height="58" rx="3" fill="url(#screen-grad)" stroke={bodyStroke} />
          <g transform="translate(-100, -15)">
            <DisplayContent category={product.categoria_slug} />
          </g>
          <circle cx="100" cy="120" r="14" fill="white" stroke={bodyStroke} strokeWidth="1.5" />
          <circle cx="100" cy="120" r="5" fill={accentStroke} />
          <line x1="100" y1="106" x2="100" y2="112" stroke={bodyStroke} strokeWidth="1.5" />
          <g fill="#cbd5e1">
            <rect x="67" y="145" width="14" height="10" rx="1.5" />
            <rect x="86" y="145" width="14" height="10" rx="1.5" />
            <rect x="105" y="145" width="14" height="10" rx="1.5" />
            <rect x="124" y="145" width="14" height="10" rx="1.5" />
            <rect x="67" y="158" width="14" height="8" rx="1.5" />
            <rect x="86" y="158" width="14" height="8" rx="1.5" />
            <rect x="105" y="158" width="14" height="8" rx="1.5" />
            <rect x="124" y="158" width="14" height="8" rx="1.5" />
          </g>
          <text x="100" y="38" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="6" fontWeight="700" fill={accentStroke} letterSpacing="0.8">
            {brandName.toUpperCase()}
          </text>
        </g>
      )}
      <text x="100" y="190" textAnchor="middle" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="8" fill="#94a3b8" letterSpacing="1">
        ILUSTRAÇÃO · FOTO EM BREVE
      </text>
    </svg>
  );
}
