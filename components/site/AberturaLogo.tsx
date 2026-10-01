"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";
import { useIntro } from "./IntroProvider";

const VIDEO = "/videos/abertura-iicv.mp4";
// Mesma cor do fundo do vídeo: a sobra de tela (object-contain no celular) some no fundo.
const COR_FUNDO = "#08141e";
const DURACAO_FADE_MS = 900;

/** Abertura em tela cheia: o vídeo da logo toca mudo e sozinho; ao terminar (ou ao pular),
 * some com um fade e revela o site. */
export function AberturaLogo() {
  const prefereMenosMovimento = usePrefereMenosMovimento();
  const { pronto, marcarPronto } = useIntro();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [removida, setRemovida] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React não garante o atributo muted no HTML do servidor; reforça antes de tocar.
    video.muted = true;
    video.play().catch(() => marcarPronto());
  }, [marcarPronto]);

  useEffect(() => {
    if (!pronto) return;
    const temporizador = setTimeout(() => setRemovida(true), DURACAO_FADE_MS);
    return () => clearTimeout(temporizador);
  }, [pronto]);

  if (removida || prefereMenosMovimento === true) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity ease-out ${pronto ? "pointer-events-none opacity-0" : "opacity-100"}`}
      style={{ backgroundColor: COR_FUNDO, transitionDuration: `${DURACAO_FADE_MS}ms` }}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain md:object-cover"
        src={VIDEO}
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onEnded={marcarPronto}
        onError={marcarPronto}
      />
      <button
        type="button"
        onClick={marcarPronto}
        className="absolute bottom-6 right-6 rounded-full border border-white/25 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 backdrop-blur transition-colors hover:border-accent hover:text-accent-light"
      >
        Pular
      </button>
    </div>
  );
}
