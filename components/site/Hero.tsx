"use client";

import { site } from "@/lib/site";
import { VideoFundoHero } from "./VideoFundoHero";
import { useIntroPronta } from "./IntroProvider";
import { LinkWhatsApp } from "@/components/contato/LinkWhatsApp";

export function Hero() {
  const pronto = useIntroPronta();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-center">
      <VideoFundoHero />

      <div
        className={`relative z-10 mx-auto max-w-3xl px-4 transition-opacity duration-1000 sm:px-6 ${
          pronto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">Brasília · DF</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Instituto de Intervenção <span className="texto-gradiente-claro">Cardiovascular</span>
        </h1>
        <div className="linha-dourada mx-auto mt-6 h-0.5 w-28 rounded-full" aria-hidden="true" />
        <p className="mx-auto mt-6 max-w-xl text-lg font-light text-white/90">
          Excelência em diagnóstico e tratamento de doenças cardiovasculares em Brasília.
        </p>
        <LinkWhatsApp
          mensagem={`Olá! Vim pelo site do ${site.nome.split(" - ")[0]} e gostaria de agendar uma consulta.`}
          className="mt-9 inline-block rounded-full bg-linear-to-r from-accent to-accent-light px-9 py-4 text-sm font-bold uppercase tracking-wide text-primary shadow-xl shadow-accent/30 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
        >
          Agende agora
        </LinkWhatsApp>
      </div>

      {pronto && (
        <a
          href="#procedimentos"
          aria-label="Rolar para os procedimentos"
          className="absolute bottom-8 left-1/2 z-10 flex h-12 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-white/50 pt-2 transition-colors hover:border-accent-light"
        >
          <span className="h-2.5 w-1 animate-bounce rounded-full bg-accent-light" />
        </a>
      )}
    </section>
  );
}
