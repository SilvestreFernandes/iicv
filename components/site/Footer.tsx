import Image from "next/image";
import { site } from "@/lib/site";
import { LinkWhatsApp } from "@/components/contato/LinkWhatsApp";

const links = [
  { href: "#procedimentos", label: "Procedimentos" },
  { href: "#diferenciais", label: "Estrutura" },
  { href: "#equipe", label: "Equipe" },
  { href: "#convenios", label: "Convênios" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  const ano = new Date().getFullYear();
  const { endereco } = site.negocio;

  return (
    <footer className="fundo-escuro relative overflow-hidden text-white">
      <div className="linha-dourada h-0.5 w-full" aria-hidden="true" />
      <div className="mancha -right-20 -top-20 h-72 w-72 bg-accent/15" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/logo-iicv.png"
            alt={site.nome}
            width={140}
            height={140}
            className="h-20 w-auto brightness-0 invert"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{site.descricao}</p>
        </div>

        <nav aria-label="Rodapé">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">Navegação</p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-white/75 transition-colors hover:text-accent-light">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-light">Contato</p>
          {endereco && (
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              {endereco.rua}
              <br />
              {endereco.bairro}, {endereco.cidade} - {endereco.uf}
            </p>
          )}
          <LinkWhatsApp className="mt-4 inline-block text-sm font-semibold text-accent-light underline decoration-accent/60 underline-offset-4 transition-colors hover:text-white">
            Falar no WhatsApp
          </LinkWhatsApp>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-4 py-6 text-center text-xs text-white/55 sm:px-6">
        <p>
          &copy; {ano} {site.nome}
        </p>
        <p className="mt-1">Diretor Presidente: Dr. Paulo Antônio Marra da Motta</p>
      </div>
    </footer>
  );
}
