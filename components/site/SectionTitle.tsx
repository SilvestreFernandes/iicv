export function SectionTitle({ titulo, subtitulo }: { titulo: string; subtitulo?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="font-display text-3xl font-bold text-primary sm:text-4xl">{titulo}</h2>
      {subtitulo && <p className="mt-3 text-base font-light text-ink-muted sm:text-lg">{subtitulo}</p>}
    </div>
  );
}
