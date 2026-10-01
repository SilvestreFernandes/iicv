"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { useIntroPronta } from "./IntroProvider";

const links = [
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#diferenciais", label: "Estrutura" },
  { href: "#equipe", label: "Equipe" },
  { href: "#convenios", label: "Convênios" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const pronto = useIntroPronta();
  const telefoneHref = `tel:${site.negocio.telefone.replace(/[^\d+]/g, "")}`;

  if (!pronto) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#conteudo" className="flex items-center gap-2">
          <Image src="/logo-iicv.png" alt={site.nome} width={56} height={56} priority className="h-12 w-auto sm:h-14" />
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={telefoneHref}
          className="shrink-0 rounded border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-accent-light transition-colors hover:bg-primary-light sm:px-5"
        >
          Agende agora
        </a>
      </nav>
    </header>
  );
}
