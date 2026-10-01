"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  quadros: string[];
  distanciaRolagem: number;
  className?: string;
};

export default function RolagemSequenciaAtiva({
  quadros,
  distanciaRolagem,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const elementoCanvas = canvasRef.current;
      if (!elementoCanvas || quadros.length < 2) return;
      const canvas = elementoCanvas;
      const secao = canvas.closest<HTMLElement>("[data-rolagem-sequencia]");
      const context = canvas.getContext("2d");
      if (!secao || !context) return;

      const imagens = new Map<number, HTMLImageElement>();
      const atual = { quadro: 0 };
      let ativo = true;

      function desenhar(indice: number) {
        const imagem = imagens.get(indice);
        if (!imagem?.complete || !imagem.naturalWidth) return;

        if (canvas.width !== imagem.naturalWidth || canvas.height !== imagem.naturalHeight) {
          canvas.width = imagem.naturalWidth;
          canvas.height = imagem.naturalHeight;
        }
        context?.drawImage(imagem, 0, 0);
      }

      function carregar(indice: number) {
        if (indice < 0 || indice >= quadros.length || imagens.has(indice)) return;

        const imagem = new window.Image();
        imagens.set(indice, imagem);
        imagem.decoding = "async";
        imagem.onload = () => {
          if (ativo && Math.round(atual.quadro) === indice) desenhar(indice);
        };
        imagem.src = quadros[indice];
      }

      function prepararVizinhos(indice: number) {
        for (let vizinho = indice - 2; vizinho <= indice + 2; vizinho++) carregar(vizinho);
      }

      prepararVizinhos(0);
      gsap.to(atual, {
        quadro: quadros.length - 1,
        snap: "quadro",
        ease: "none",
        onUpdate: () => {
          const indice = Math.round(atual.quadro);
          prepararVizinhos(indice);
          desenhar(indice);
        },
        scrollTrigger: {
          trigger: secao,
          start: "top top",
          end: `+=${distanciaRolagem}%`,
          pin: secao,
          scrub: 0.5,
        },
      });

      return () => {
        ativo = false;
        imagens.forEach((imagem) => {
          imagem.onload = null;
        });
      };
    },
    { dependencies: [quadros, distanciaRolagem], scope: canvasRef },
  );

  return <canvas ref={canvasRef} className={className} aria-hidden="true" data-rolagem-sequencia-canvas />;
}
