"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

// Duração aproximada do vídeo institucional usado no fundo do hero (gTBn-l8pGJM: 0:18) + folga.
const DURACAO_INTRO_MS = 18500;

const ContextoIntro = createContext(false);

/** Controla quando a introdução em vídeo termina e o resto do site pode aparecer. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [tempoEsgotado, setTempoEsgotado] = useState(false);
  const prefereMenosMovimento = usePrefereMenosMovimento();

  useEffect(() => {
    const temporizador = setTimeout(() => setTempoEsgotado(true), DURACAO_INTRO_MS);
    return () => clearTimeout(temporizador);
  }, []);

  // Prefere menos movimento: não prende o site esperando o vídeo terminar.
  const pronto = tempoEsgotado || prefereMenosMovimento === true;

  return <ContextoIntro.Provider value={pronto}>{children}</ContextoIntro.Provider>;
}

export function useIntroPronta() {
  return useContext(ContextoIntro);
}
