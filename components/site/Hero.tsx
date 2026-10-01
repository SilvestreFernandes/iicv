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
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Instituto de Intervenção Cardiovascular
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg font-light text-white/90">
          Excelência em diagnóstico e tratamento de doenças cardiovasculares em Brasília.
        </p>
        <LinkWhatsApp
          mensagem={`Olá! Vim pelo site do ${site.nome.split(" - ")[0]} e gostaria de agendar uma consulta.`}
          className="mt-8 inline-block rounded border-2 border-accent bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-transparent hover:text-accent-light"
        >
          Agende agora
        </LinkWhatsApp>
      </div>
    </section>
  );
}
