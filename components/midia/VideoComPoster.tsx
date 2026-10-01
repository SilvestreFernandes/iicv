"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

type Props = {
  src: string;
  poster: string;
  largura: number;
  altura: number;
  alt?: string;
  className?: string;
  posterClassName?: string;
  videoClassName?: string;
  sizes?: string;
  preloadPoster?: boolean;
};

/** Mantém o poster no HTML e só monta as fontes de vídeo perto do viewport. */
export function VideoComPoster({
  src,
  poster,
  largura,
  altura,
  alt = "",
  className,
  posterClassName,
  videoClassName,
  sizes = "100vw",
  preloadPoster = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pertoDoViewport = useInViewOnce(ref, "300px");
  const prefereMenosMovimento = usePrefereMenosMovimento();
  const carregarVideo = pertoDoViewport && prefereMenosMovimento === false;

  return (
    <div ref={ref} className={className} data-video-com-poster>
      <Image
        src={poster}
        alt={alt}
        width={largura}
        height={altura}
        className={posterClassName}
        loading={preloadPoster ? "eager" : "lazy"}
        fetchPriority={preloadPoster ? "high" : undefined}
        sizes={sizes}
      />
      {carregarVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={poster}
          width={largura}
          height={altura}
          className={videoClassName}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={`${src}.webm`} type="video/webm" />
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
