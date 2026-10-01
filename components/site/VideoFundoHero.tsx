"use client";

import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

const YOUTUBE_ID = "gTBn-l8pGJM";

/** Vídeo institucional em loop, cobrindo o hero inteiro (técnica de iframe superdimensionado). */
export function VideoFundoHero() {
  const prefereMenosMovimento = usePrefereMenosMovimento();

  if (prefereMenosMovimento !== false) {
    return <div className="absolute inset-0 bg-primary" aria-hidden="true" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary" aria-hidden="true">
      <iframe
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&iv_load_policy=3`}
        title=""
        allow="autoplay; encrypted-media"
        tabIndex={-1}
      />
      <div className="absolute inset-0 bg-primary/55" />
    </div>
  );
}
