"use client";

import { useEffect, useRef } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";
import { useIntro } from "./IntroProvider";

const VIDEO_DESKTOP = "/videos/hero-iicv.mp4";
const VIDEO_MOBILE = "/videos/hero-iicv-mobile.mp4";
// Ponto de corte: abaixo disso o vídeo vertical (9:16) é usado; o navegador escolhe
// a fonte certa sozinho, via media query nativa do <video>, sem precisar de JS.
const CORTE_MOBILE = "(max-width: 767px)";

/** Vídeo institucional local: só toca quando o visitante clica em "Entrar" (garante o som,
 * que navegadores bloqueiam em autoplay sem gesto). Ao terminar, reinicia em loop sempre mudo
 * como fundo permanente do hero. */
export function VideoFundoHero() {
  const prefereMenosMovimento = usePrefereMenosMovimento();
  const { iniciado, pronto, iniciar, marcarPronto } = useIntro();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !pronto) return;
    video.muted = true;
    video.loop = true;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [pronto]);

  if (prefereMenosMovimento !== false) {
    return <div className="absolute inset-0 bg-primary" aria-hidden="true" />;
  }

  function aoClicarEntrar() {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play().catch(() => {
        // Mesmo com o clique o navegador recusou o som: segue mudo em vez de travar o vídeo.
        video.muted = true;
        video.play().catch(() => {});
      });
    }
    iniciar();
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary">
      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={videoRef}
          // Vídeo vertical (9:16) é mais "largo" que a tela de celulares modernos (~9:19.5+):
          // object-cover cortaria as laterais pra preencher a altura. object-contain evita o
          // corte (sobra a cor de fundo em cima/embaixo); no desktop, cover preenche normalmente.
          className="absolute inset-0 h-full w-full object-contain md:object-cover"
          playsInline
          preload="auto"
          onEnded={marcarPronto}
        >
          <source src={VIDEO_MOBILE} media={CORTE_MOBILE} />
          <source src={VIDEO_DESKTOP} />
        </video>
        <div className="absolute inset-0 bg-primary/55" />
      </div>

      {!iniciado && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary/40">
          <button
            type="button"
            autoFocus
            onClick={aoClicarEntrar}
            className="rounded-full border-2 border-accent bg-primary/80 px-10 py-4 text-sm font-semibold uppercase tracking-widest text-accent-light backdrop-blur transition-colors hover:bg-primary"
          >
            Entrar
          </button>
        </div>
      )}
    </div>
  );
}
