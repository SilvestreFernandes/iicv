import Image from "next/image";
import { site } from "@/lib/site";

export function Hero() {
  const telefoneHref = `tel:${site.negocio.telefone.replace(/[^\d+]/g, "")}`;

  return (
    <section className="border-b border-border bg-bg px-4 py-16 text-center sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <Image
          src="/logo-iicv.png"
          alt={site.nome}
          width={220}
          height={220}
          priority
          className="mx-auto mb-8 h-40 w-auto drop-shadow-lg sm:h-52"
        />
        <h1 className="font-display text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">
          Instituto de Intervenção Cardiovascular
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg font-light text-ink-muted">
          Excelência em diagnóstico e tratamento de doenças cardiovasculares em Brasília.
        </p>
        <a
          href={telefoneHref}
          className="mt-8 inline-block rounded border-2 border-primary bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-accent-light transition-colors hover:bg-bg hover:text-primary"
        >
          Agende agora
        </a>
      </div>
    </section>
  );
}
