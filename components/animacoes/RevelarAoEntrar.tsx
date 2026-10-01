"use client";

import { useRef, type CSSProperties } from "react";
import { useInViewOnce } from "@/lib/use-in-view-once";

type Props = {
  children: React.ReactNode;
  className?: string;
  margem?: string;
  /** Atraso em ms antes de animar, para escalonar itens de uma lista. */
  atraso?: number;
};

/** Marca a entrada no viewport; a página define a animação e os estilos. */
export function RevelarAoEntrar({ children, className, margem, atraso }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const entrou = useInViewOnce(ref, margem);

  return (
    <div
      ref={ref}
      className={className}
      style={atraso ? ({ "--atraso": `${atraso}ms` } as CSSProperties) : undefined}
      data-revelar-ao-entrar
      data-revelado={entrou ? "true" : "false"}
    >
      {children}
    </div>
  );
}
