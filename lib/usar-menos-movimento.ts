"use client";
// Retorna null no servidor/hidratação; trate null como "não animar ainda".
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
    () => null,
  );
}
