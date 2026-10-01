import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";

type Props = {
  titulo: string;
  subtitulo?: string;
  rotulo?: string;
  escuro?: boolean;
};

export function SectionTitle({ titulo, subtitulo, rotulo, escuro = false }: Props) {
  return (
    <RevelarAoEntrar className="mx-auto max-w-2xl text-center">
      {rotulo && (
        <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${escuro ? "text-accent-light" : "text-accent"}`}>
          {rotulo}
        </p>
      )}
      <h2
        className={`mt-3 pb-1 font-display text-3xl font-bold sm:text-5xl ${
          escuro ? "texto-gradiente-claro" : "texto-gradiente"
        }`}
      >
        {titulo}
      </h2>
      <div className="linha-dourada mx-auto mt-5 h-0.5 w-24 rounded-full" aria-hidden="true" />
      {subtitulo && (
        <p className={`mt-5 text-base font-light sm:text-lg ${escuro ? "text-white/75" : "text-ink-muted"}`}>
          {subtitulo}
        </p>
      )}
    </RevelarAoEntrar>
  );
}
