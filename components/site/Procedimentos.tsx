import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";
import { SectionTitle } from "./SectionTitle";
import { procedimentos } from "@/lib/conteudo";

const icones = [
  // Hemodinâmica: coração
  "M12 20s-7-4.4-8.9-8.8C1.8 8.1 3.6 5 6.8 5c1.9 0 3.4 1 4.2 2.4C11.8 6 13.3 5 15.2 5c3.2 0 5 3.1 3.7 6.2C17 15.6 12 20 12 20z",
  // Eletrofisiologia: traçado de ECG
  "M2 12h4l2-6 4 12 2.5-8 1.5 2h6",
  // Radiologia intervencionista: alvo
  "M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16zM12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6zM12 1v3M12 20v3M1 12h3M20 12h3",
  // Cirurgia cardiovascular: cruz médica
  "M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5z",
];

export function Procedimentos() {
  return (
    <section id="procedimentos" className="fundo-claro relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="mancha -left-32 top-10 h-96 w-96 bg-accent/25" aria-hidden="true" />
      <div
        className="mancha -right-24 bottom-0 h-[28rem] w-[28rem] bg-[#2c4a7c]/20"
        style={{ animationDelay: "-8s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          rotulo="Especialidades"
          titulo="Procedimentos realizados"
          subtitulo="Oferecemos uma ampla gama de procedimentos de alta complexidade"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {procedimentos.map((grupo, i) => (
            <RevelarAoEntrar key={grupo.titulo} margem="-10%" atraso={i * 120} className="h-full">
              <div className="card-borda h-full">
                <div className="group h-full rounded-[calc(1rem-1px)] bg-white/85 p-6 backdrop-blur">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-[#2c4a7c] text-accent-light shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={icones[i % icones.length]} />
                    </svg>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-primary">{grupo.titulo}</h3>
                  <ul className="mt-4 space-y-2">
                    {grupo.itens.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-ink-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-br from-accent to-accent-light" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevelarAoEntrar>
          ))}
        </div>
      </div>
    </section>
  );
}
