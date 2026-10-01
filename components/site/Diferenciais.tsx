import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";
import { SectionTitle } from "./SectionTitle";
import { diferenciais } from "@/lib/conteudo";

export function Diferenciais() {
  return (
    <section id="diferenciais" className="bg-bg-muted px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          titulo="Equipamento e infraestrutura"
          subtitulo="Tecnologia de ponta para os melhores resultados"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {diferenciais.map((item) => (
            <RevelarAoEntrar key={item.titulo} margem="-10%">
              <div className="h-full rounded-lg border-t-4 border-accent bg-bg p-6 text-center shadow-sm">
                <h3 className="font-display text-lg font-bold text-primary">{item.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.texto}</p>
              </div>
            </RevelarAoEntrar>
          ))}
        </div>
      </div>
    </section>
  );
}
