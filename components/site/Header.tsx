"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { useIntroPronta } from "./IntroProvider";
import { LinkWhatsApp } from "@/components/contato/LinkWhatsApp";

const links = [
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#diferenciais", label: "Estrutura" },
  { href: "#equipe", label: "Equipe" },
  { href: "#convenios", label: "Convênios" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const pronto = useIntroPronta();
  const [menuAberto, setMenuAberto] = useState(false);

  if (!pronto) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/75 shadow-sm shadow-primary/5 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#conteudo" className="flex items-center gap-2" onClick={() => setMenuAberto(false)}>
          <Image src="/logo-iicv.png" alt={site.nome} width={56} height={56} priority className="h-12 w-auto sm:h-14" />
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-ink transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-linear-to-r after:from-accent after:to-accent-light after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LinkWhatsApp
            mensagem={`Olá! Vim pelo site do ${site.nome.split(" - ")[0]} e gostaria de agendar uma consulta.`}
            className="shrink-0 rounded-full bg-linear-to-r from-primary to-[#2c4a7c] px-4 py-2 text-sm font-semibold text-accent-light shadow-md shadow-primary/25 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:px-5"
          >
            Agende agora
          </LinkWhatsApp>

          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white/70 text-primary lg:hidden"
          >
            <span className="sr-only">{menuAberto ? "Fechar menu" : "Abrir menu"}</span>
            {menuAberto ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuAberto && (
        <ul id="menu-mobile" className="flex flex-col gap-1 border-t border-border px-4 py-3 lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuAberto(false)}
                className="block rounded px-2 py-3 text-sm font-medium text-ink transition-colors hover:bg-bg-muted hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="linha-dourada h-px w-full" aria-hidden="true" />
    </header>
  );
}
