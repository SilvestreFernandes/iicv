"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

// Segurança caso o vídeo de abertura nunca dispare "ended" (falha de rede, autoplay bloqueado...).
const TEMPO_MAXIMO_MS = 12000;

type ContextoIntro = {
  /** true quando a abertura terminou (ou foi pulada) e o site pode aparecer. */
  pronto: boolean;
  marcarPronto: () => void;
};

const Contexto = createContext<ContextoIntro>({ pronto: false, marcarPronto: () => {} });

/** Controla a abertura em vídeo: trava a rolagem até ela terminar. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [terminou, setTerminou] = useState(false);
  const prefereMenosMovimento = usePrefereMenosMovimento();

  useEffect(() => {
    // Ao recarregar, o navegador devolveria o visitante ao meio da página atrás da abertura.
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const temporizador = setTimeout(() => setTerminou(true), TEMPO_MAXIMO_MS);
    return () => clearTimeout(temporizador);
  }, []);

  // Prefere menos movimento: pula a abertura.
  const pronto = terminou || prefereMenosMovimento === true;

  useEffect(() => {
    document.body.style.overflow = pronto ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [pronto]);

  const marcarPronto = useCallback(() => setTerminou(true), []);
  const valor = useMemo<ContextoIntro>(() => ({ pronto, marcarPronto }), [pronto, marcarPronto]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useIntro() {
  return useContext(Contexto);
}

export function useIntroPronta() {
  return useContext(Contexto).pronto;
}
