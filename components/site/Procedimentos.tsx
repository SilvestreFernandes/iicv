import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";
import { SectionTitle } from "./SectionTitle";
import { procedimentos } from "@/lib/conteudo";

export function Procedimentos() {
  return (
    <section id="procedimentos" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          titulo="Procedimentos realizados"
          subtitulo="Oferecemos uma ampla gama de procedimentos de alta complexidade"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {procedimentos.map((grupo) => (
            <RevelarAoEntrar key={grupo.titulo} margem="-10%">
              <div className="h-full rounded-lg border-t-4 border-accent bg-bg p-6 shadow-sm">
                <h3 className="font-display text-xl font-bold text-primary">{grupo.titulo}</h3>
                <ul className="mt-4 space-y-2">
                  {grupo.itens.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ink-muted">
                      <span className="text-accent" aria-hidden="true">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevelarAoEntrar>
          ))}
        </div>
      </div>
    </section>
  );
}
