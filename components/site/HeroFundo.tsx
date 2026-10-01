// Fundo do hero em camadas, ecoando a abertura (linha de ECG dourada sobre azul-escuro).

const LARGURA = 1440;
const BASE = 100;
const PASSO = 360;

// Batimento: linha reta, onda P, complexo QRS e onda T, repetido na largura toda.
function batimento(x: number) {
  return [
    `L ${x + 120} ${BASE}`,
    `Q ${x + 135} ${BASE - 14} ${x + 150} ${BASE}`,
    `L ${x + 172} ${BASE}`,
    `L ${x + 182} ${BASE + 14}`,
    `L ${x + 198} ${BASE - 72}`,
    `L ${x + 214} ${BASE + 58}`,
    `L ${x + 226} ${BASE}`,
    `L ${x + 262} ${BASE}`,
    `Q ${x + 286} ${BASE - 22} ${x + 310} ${BASE}`,
    `L ${x + PASSO} ${BASE}`,
  ].join(" ");
}

const CAMINHO_ECG =
  `M 0 ${BASE} ` +
  Array.from({ length: LARGURA / PASSO }, (_, i) => batimento(i * PASSO)).join(" ");

export function HeroFundo() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="fundo-hero absolute inset-0" />
      <div className="grade-hero absolute inset-0" />

      <div className="mancha left-1/2 top-[-12rem] h-[34rem] w-[34rem] -translate-x-1/2 bg-accent/25" />
      <div className="mancha -left-40 bottom-[-10rem] h-[30rem] w-[30rem] bg-[#2c4a7c]/40" style={{ animationDelay: "-9s" }} />
      <div className="mancha -right-40 top-1/3 h-[26rem] w-[26rem] bg-accent/15" style={{ animationDelay: "-16s" }} />

      <svg
        className="absolute bottom-2 left-0 h-24 w-full sm:bottom-4 sm:h-36"
        viewBox={`0 0 ${LARGURA} 200`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="ecg-traco" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#d4b886" stopOpacity="0" />
            <stop offset="0.15" stopColor="#d4b886" stopOpacity="0.25" />
            <stop offset="0.85" stopColor="#d4b886" stopOpacity="0.25" />
            <stop offset="1" stopColor="#d4b886" stopOpacity="0" />
          </linearGradient>
          <filter id="ecg-brilho" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="4" result="desfoque" />
            <feMerge>
              <feMergeNode in="desfoque" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={CAMINHO_ECG} stroke="url(#ecg-traco)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        <path
          className="ecg-pulso"
          d={CAMINHO_ECG}
          pathLength={1}
          stroke="#f1dcb2"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#ecg-brilho)"
        />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,20,30,0.75)_100%)]" />
      <div className="linha-dourada absolute bottom-0 left-0 h-px w-full" />
    </div>
  );
}
