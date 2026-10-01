"use client";

import type { ReactNode } from "react";
import { useIntroPronta } from "./IntroProvider";

/** Mantém o conteúdo no HTML, mas só o revela depois que o vídeo de introdução termina. */
export function RevelarConteudo({ children }: { children: ReactNode }) {
  const pronto = useIntroPronta();

  return (
    <div
      className={`transition-opacity duration-700 ${pronto ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      {children}
    </div>
  );
}
