"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useInViewOnce } from "@/lib/use-in-view-once";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

const SequenciaAtiva = dynamic(() => import("./RolagemSequenciaAtiva"), {
  ssr: false,
  loading: () => null,
});

type Props = {
  quadros: string[];
  alt: string;
  largura: number;
  altura: number;
  className?: string;
  posterClassName?: string;
  canvasClassName?: string;
  distanciaRolagem?: number;
  preloadPoster?: boolean;
  sizes?: string;
};

/** Sequência decorativa com poster visível no SSR e movimento carregado perto do viewport. */
export function RolagemSequencia({
  quadros,
  alt,
  largura,
  altura,
  className,
  posterClassName,
  canvasClassName,
  distanciaRolagem = 200,
  preloadPoster = false,
  sizes = "100vw",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const pertoDoViewport = useInViewOnce(ref, "300px");
  const prefereMenosMovimento = usePrefereMenosMovimento();
  const ativar = pertoDoViewport && prefereMenosMovimento === false && quadros.length > 1;

  if (quadros.length === 0) return null;

  return (
    <section ref={ref} className={className} data-rolagem-sequencia>
      <Image
        src={quadros[0]}
        alt={alt}
        width={largura}
        height={altura}
        className={posterClassName}
        loading={preloadPoster ? "eager" : "lazy"}
        fetchPriority={preloadPoster ? "high" : undefined}
        sizes={sizes}
      />
      {ativar && (
        <SequenciaAtiva
          quadros={quadros}
          distanciaRolagem={distanciaRolagem}
          className={canvasClassName}
        />
      )}
    </section>
  );
}
