"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

// Segurança caso o vídeo nunca dispare "ended" (autoplay bloqueado, erro de carregamento...).
const TEMPO_MAXIMO_MS = 25000;

type ContextoIntro = {
  pronto: boolean;
  marcarPronto: () => void;
};

const ContextoIntro = createContext<ContextoIntro>({ pronto: false, marcarPronto: () => {} });

/** Controla quando o vídeo de introdução termina e o resto do site pode aparecer. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [tempoEsgotadoOuTerminado, setTempoEsgotadoOuTerminado] = useState(false);
  const prefereMenosMovimento = usePrefereMenosMovimento();

  useEffect(() => {
    const temporizador = setTimeout(() => setTempoEsgotadoOuTerminado(true), TEMPO_MAXIMO_MS);
    return () => clearTimeout(temporizador);
  }, []);

  const marcarPronto = useCallback(() => setTempoEsgotadoOuTerminado(true), []);

  // Prefere menos movimento: não prende o site esperando o vídeo.
  const pronto = tempoEsgotadoOuTerminado || prefereMenosMovimento === true;

  const valor = useMemo(() => ({ pronto, marcarPronto }), [pronto, marcarPronto]);

  return <ContextoIntro.Provider value={valor}>{children}</ContextoIntro.Provider>;
}

export function useIntro() {
  return useContext(ContextoIntro);
}

export function useIntroPronta() {
  return useContext(ContextoIntro).pronto;
}
