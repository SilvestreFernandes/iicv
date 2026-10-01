"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

const YOUTUBE_ID = "gTBn-l8pGJM";
const YOUTUBE_ORIGEM = "https://www.youtube.com";

function enviarComando(iframe: HTMLIFrameElement | null, func: string, args: unknown[] = []) {
  iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), YOUTUBE_ORIGEM);
}

/** Vídeo institucional em loop, cobrindo o hero inteiro (técnica de iframe superdimensionado). */
export function VideoFundoHero() {
  const prefereMenosMovimento = usePrefereMenosMovimento();
  const [comSom, setComSom] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (prefereMenosMovimento !== false) return;
    // cc_load_policy=0 na URL não é suficiente: o YouTube pode reativar legendas conforme
    // preferência salva do navegador. Reforça via API do player até o player estar pronto.
    const tentativas = [300, 800, 1500, 3000];
    const temporizadores = tentativas.map((atraso) =>
      setTimeout(() => enviarComando(iframeRef.current, "unloadModule", ["captions"]), atraso),
    );
    return () => temporizadores.forEach(clearTimeout);
  }, [prefereMenosMovimento]);

  if (prefereMenosMovimento !== false) {
    return <div className="absolute inset-0 bg-primary" aria-hidden="true" />;
  }

  function alternarSom() {
    const ativar = !comSom;
    enviarComando(iframeRef.current, ativar ? "unMute" : "mute");
    setComSom(ativar);
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <iframe
          ref={iframeRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          // Autoplay com som é bloqueado pela maioria dos navegadores: carrega mudo (obrigatório
          // para o autoplay funcionar) e o botão de som liga o áudio via postMessage, sob gesto do usuário.
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1`}
          title=""
          allow="autoplay; encrypted-media"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-primary/55" />
      </div>

      <button
        type="button"
        onClick={alternarSom}
        aria-pressed={comSom}
        aria-label={comSom ? "Desativar som do vídeo" : "Ativar som do vídeo"}
        className="absolute bottom-6 right-6 z-10 rounded-full border border-white/40 bg-black/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-black/50"
      >
        {comSom ? "🔊 Som ativado" : "🔇 Ativar som"}
      </button>
    </div>
  );
}
