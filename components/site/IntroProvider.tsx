"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

// Segurança caso o vídeo nunca dispare "ended" (autoplay bloqueado, erro de carregamento...).
const TEMPO_MAXIMO_MS = 25000;

type ContextoIntro = {
  /** true quando o vídeo de introdução já terminou e o resto do site pode aparecer. */
  pronto: boolean;
  /** true depois que o visitante clicou em "Entrar" e o vídeo começou a tocar. */
  iniciado: boolean;
  iniciar: () => void;
  marcarPronto: () => void;
};

const valorPadrao: ContextoIntro = {
  pronto: false,
  iniciado: false,
  iniciar: () => {},
  marcarPronto: () => {},
};

const Contexto = createContext<ContextoIntro>(valorPadrao);

/** Controla a introdução em vídeo: trava a rolagem até o vídeo terminar. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [terminou, setTerminou] = useState(false);
  const [iniciado, setIniciado] = useState(false);
  const prefereMenosMovimento = usePrefereMenosMovimento();

  useEffect(() => {
    const temporizador = setTimeout(() => setTerminou(true), TEMPO_MAXIMO_MS);
    return () => clearTimeout(temporizador);
  }, []);

  // Prefere menos movimento: não prende o site esperando o vídeo.
  const pronto = terminou || prefereMenosMovimento === true;

  useEffect(() => {
    document.body.style.overflow = pronto ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [pronto]);

  const iniciar = useCallback(() => setIniciado(true), []);
  const marcarPronto = useCallback(() => setTerminou(true), []);

  const valor = useMemo<ContextoIntro>(
    () => ({ pronto, iniciado: iniciado || prefereMenosMovimento === true, iniciar, marcarPronto }),
    [pronto, iniciado, prefereMenosMovimento, iniciar, marcarPronto],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useIntro() {
  return useContext(Contexto);
}

export function useIntroPronta() {
  return useContext(Contexto).pronto;
}
