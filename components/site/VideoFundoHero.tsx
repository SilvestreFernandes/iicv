"use client";

import { useEffect, useRef } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";
import { useIntro } from "./IntroProvider";

const VIDEO_SRC = "/videos/hero-iicv.mp4";

/** Vídeo institucional local: toca uma vez (com som, se o navegador permitir) e,
 * depois de terminar, volta ao início em loop mudo como fundo permanente do hero. */
export function VideoFundoHero() {
  const prefereMenosMovimento = usePrefereMenosMovimento();
  const { pronto, marcarPronto } = useIntro();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefereMenosMovimento !== false) return;

    video.muted = false;
    const tentativa = video.play();
    tentativa?.catch(() => {
      // Autoplay com som bloqueado pelo navegador: toca mudo em vez de não tocar.
      video.muted = true;
      video.play().catch(() => {});
    });
  }, [prefereMenosMovimento]);

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

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary" aria-hidden="true">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        playsInline
        preload="auto"
        onEnded={marcarPronto}
      />
      <div className="absolute inset-0 bg-primary/55" />
    </div>
  );
}
