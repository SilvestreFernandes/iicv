import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";
import { SectionTitle } from "./SectionTitle";
import { diferenciais } from "@/lib/conteudo";

const icones = [
  // Salas de intervenção: monitor
  "M3 4h18v12H3zM8 20h8M12 16v4M6 11l2.5-3 2.5 4 2-2.5 2 1.5",
  // Equipe especializada: pessoas
  "M9 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 12 0v1M16 3.5a4 4 0 0 1 0 7.5M22 21v-1a6 6 0 0 0-4-5.6",
  // Atendimento 24h: relógio
  "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v5l3.5 2",
];

export function Diferenciais() {
  return (
    <section id="diferenciais" className="fundo-escuro relative overflow-hidden px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="mancha left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 bg-accent/20" aria-hidden="true" />
      <div
        className="mancha -bottom-40 -left-20 h-96 w-96 bg-[#3b6bb5]/25"
        style={{ animationDelay: "-12s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          escuro
          rotulo="Estrutura"
          titulo="Equipamento e infraestrutura"
          subtitulo="Tecnologia de ponta para os melhores resultados"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {diferenciais.map((item, i) => (
            <RevelarAoEntrar key={item.titulo} margem="-10%" atraso={i * 150} className="h-full">
              <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:bg-white/10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-accent to-accent-light text-primary shadow-lg shadow-accent/30 transition-transform duration-500 group-hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={icones[i % icones.length]} />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{item.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.texto}</p>
              </div>
            </RevelarAoEntrar>
          ))}
        </div>
      </div>
    </section>
  );
}
