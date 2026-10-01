"use client";

import { site } from "@/lib/site";
import { HeroFundo } from "./HeroFundo";
import { useIntroPronta } from "./IntroProvider";
import { LinkWhatsApp } from "@/components/contato/LinkWhatsApp";

export function Hero() {
  const pronto = useIntroPronta();

  // Cada bloco sobe e aparece em sequência depois que a abertura some.
  const entrada = (atraso: number) => ({
    className: `transition-all duration-1000 ease-out ${
      pronto ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`,
    style: { transitionDelay: pronto ? `${atraso}ms` : "0ms" },
  });

  return (
    // Altura da tela menos o header (h-12 + py-3 no celular, h-14 + py-3 acima de sm).
    <section className="relative flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden py-24 text-center sm:min-h-[calc(100svh-5rem)]">
      <HeroFundo />

      <div className={`relative z-10 mx-auto max-w-3xl px-4 sm:px-6 ${pronto ? "" : "pointer-events-none"}`}>
        <p {...entrada(200)}>
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-light">Brasília · DF</span>
        </p>
        <h1
          {...entrada(400)}
          className={`${entrada(400).className} mt-4 font-display text-4xl font-bold leading-tight text-white drop-shadow-[0_4px_24px_rgba(8,20,30,0.8)] sm:text-5xl lg:text-6xl`}
        >
          Instituto de Intervenção <span className="texto-gradiente-claro">Cardiovascular</span>
        </h1>
        <div {...entrada(600)}>
          <div className="linha-dourada mx-auto mt-6 h-0.5 w-28 rounded-full" aria-hidden="true" />
        </div>
        <p
          {...entrada(750)}
          className={`${entrada(750).className} mx-auto mt-6 max-w-xl text-lg font-light text-white/85`}
        >
          Excelência em diagnóstico e tratamento de doenças cardiovasculares em Brasília.
        </p>
        <div {...entrada(950)}>
          <LinkWhatsApp
            mensagem={`Olá! Vim pelo site do ${site.nome.split(" - ")[0]} e gostaria de agendar uma consulta.`}
            className="mt-9 inline-block rounded-full bg-linear-to-r from-accent to-accent-light px-9 py-4 text-sm font-bold uppercase tracking-wide text-primary shadow-xl shadow-accent/30 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
          >
            Agende agora
          </LinkWhatsApp>
        </div>
      </div>

      {pronto && (
        <a
          href="#procedimentos"
          aria-label="Rolar para os procedimentos"
          className="absolute bottom-8 left-1/2 z-10 flex h-12 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-white/40 pt-2 transition-colors hover:border-accent-light"
        >
          <span className="h-2.5 w-1 animate-bounce rounded-full bg-accent-light" />
        </a>
      )}
    </section>
  );
}
