"use client";

import dynamic from "next/dynamic";
import { lazy, Suspense, type ReactNode } from "react";
import { usePrefereMenosMovimento } from "@/lib/usar-menos-movimento";

const LenisSobDemanda = dynamic(() => import("@/components/movimento/RolagemSuave"), {
  ssr: false,
  loading: () => null,
});

const ConfiguracaoMotion = lazy(() => import("@/components/movimento/ConfiguracaoMotion"));

type Props = {
  children: ReactNode;
  rolagemSuave?: boolean;
  configurarMotion?: boolean;
};

/** Ative só as camadas de movimento aprovadas em projeto/ESTADO.md. */
export function ProvidersMovimento({
  children,
  rolagemSuave = false,
  configurarMotion = false,
}: Props) {
  const prefereMenosMovimento = usePrefereMenosMovimento();
  const conteudo = configurarMotion ? (
    <Suspense fallback={children}>
      <ConfiguracaoMotion>{children}</ConfiguracaoMotion>
    </Suspense>
  ) : children;

  return (
    <>
      {rolagemSuave && prefereMenosMovimento === false && <LenisSobDemanda />}
      {conteudo}
    </>
  );
}
