import { SectionTitle } from "./SectionTitle";
import { convenios } from "@/lib/conteudo";

const metade = Math.ceil(convenios.length / 2);
const faixas = [convenios.slice(0, metade), convenios.slice(metade)];

function Faixa({ nomes, reverso }: { nomes: string[]; reverso?: boolean }) {
  // Anima até -50%: as duas metades precisam ser idênticas e cada uma mais larga que telas
  // grandes, senão aparece um vão no fim do ciclo. Por isso 4 cópias (2 por metade).
  const repetidos = [...nomes, ...nomes, ...nomes, ...nomes];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className={`flex w-max gap-4 py-2 ${reverso ? "carrossel-reverso" : "carrossel"}`}>
        {repetidos.map((nome, i) => (
          <span
            key={`${nome}-${i}`}
            className="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/85 backdrop-blur transition-colors hover:border-accent hover:text-accent-light"
          >
            {nome}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Convenios() {
  return (
    <section id="convenios" className="fundo-escuro relative overflow-hidden py-20 text-white sm:py-28">
      <div className="mancha -left-24 top-1/3 h-80 w-80 bg-accent/20" aria-hidden="true" />
      <div
        className="mancha -right-24 bottom-0 h-96 w-96 bg-[#3b6bb5]/25"
        style={{ animationDelay: "-10s" }}
        aria-hidden="true"
      />

      <div className="relative px-4 sm:px-6">
        <SectionTitle
          escuro
          rotulo="Planos de saúde"
          titulo="Convênios habilitados"
          subtitulo="Trabalhamos com mais de 80 convênios de saúde"
        />
      </div>

      <ul className="sr-only">
        {convenios.map((nome) => (
          <li key={nome}>{nome}</li>
        ))}
      </ul>

      <div className="relative mt-14 space-y-4" aria-hidden="true">
        <Faixa nomes={faixas[0]} />
        <Faixa nomes={faixas[1]} reverso />
      </div>
    </section>
  );
}
