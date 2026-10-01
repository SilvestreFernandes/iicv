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
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#conteudo" className="flex items-center gap-2" onClick={() => setMenuAberto(false)}>
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

        <div className="flex items-center gap-3">
          <LinkWhatsApp
            mensagem={`Olá! Vim pelo site do ${site.nome.split(" - ")[0]} e gostaria de agendar uma consulta.`}
            className="shrink-0 rounded border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-accent-light transition-colors hover:bg-primary-light sm:px-5"
          >
            Agende agora
          </LinkWhatsApp>

          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded border-2 border-border text-primary lg:hidden"
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
    </header>
  );
}
