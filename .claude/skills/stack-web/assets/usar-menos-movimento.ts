// Copiar para lib/usar-menos-movimento.ts.
// Lê prefers-reduced-motion sem depender de biblioteca e acompanha mudanças ao vivo.
// Retorna null no servidor e na hidratação (preferência ainda desconhecida):
// trate null como "não animar ainda" e só monte players/cenas quando vier false.
"use client";
import { useSyncExternalStore } from "react";

const consulta = "(prefers-reduced-motion: reduce)";

function assinar(avisar: () => void) {
  const mql = window.matchMedia(consulta);
  mql.addEventListener("change", avisar);
  return () => mql.removeEventListener("change", avisar);
}

export function usePrefereMenosMovimento(): boolean | null {
  return useSyncExternalStore(
    assinar,
    () => window.matchMedia(consulta).matches,
    () => null
  );
}
