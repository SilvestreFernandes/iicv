import { SectionTitle } from "./SectionTitle";
import { convenios } from "@/lib/conteudo";

export function Convenios() {
  return (
    <section id="convenios" className="bg-bg-muted px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          titulo="Convênios habilitados"
          subtitulo={`Trabalhamos com mais de ${convenios.length} convênios de saúde`}
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {convenios.map((nome) => (
            <div
              key={nome}
              className="rounded border-2 border-l-4 border-border border-l-accent bg-bg px-4 py-3 text-center text-sm font-medium text-ink-muted transition-colors hover:border-accent"
            >
              {nome}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
