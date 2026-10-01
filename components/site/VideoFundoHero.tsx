"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";
import { useIntro } from "./IntroProvider";

const VIDEO_DESKTOP = "/videos/hero-iicv.mp4";
const VIDEO_MOBILE = "/videos/hero-iicv-mobile.mp4";
// Mesmo ponto de corte do md: do Tailwind. Escolhido via JS porque vários navegadores
// mobile ignoram o atributo media em <source> de vídeo e carregavam o horizontal.
const CORTE_MOBILE = "(max-width: 767px)";

// Sem assinatura de mudanças: a escolha fica travada no carregamento, para girar o
// aparelho não recarregar o vídeo no meio da introdução.
const naoAssinar = () => () => {};

function useTelaMobile(): boolean | null {
  return useSyncExternalStore(
    naoAssinar,
    () => window.matchMedia(CORTE_MOBILE).matches,
    () => null,
  );
}

/** Vídeo institucional local: só toca quando o visitante clica em "Entrar" (garante o som,
 * que navegadores bloqueiam em autoplay sem gesto). Ao terminar, reinicia em loop sempre mudo
 * como fundo permanente do hero. */
export function VideoFundoHero() {
  const prefereMenosMovimento = usePrefereMenosMovimento();
  const telaMobile = useTelaMobile();
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

  if (prefereMenosMovimento !== false || telaMobile === null) {
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
          className={`absolute inset-0 h-full w-full ${telaMobile ? "object-contain" : "object-cover"}`}
          src={telaMobile ? VIDEO_MOBILE : VIDEO_DESKTOP}
          playsInline
          preload="auto"
          onEnded={marcarPronto}
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/70 via-primary/35 to-primary/85" />
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
