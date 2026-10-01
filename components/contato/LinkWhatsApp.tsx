// Link para WhatsApp com número e mensagem pré-preenchida.
// Dados vêm de lib/site.ts; renderiza null se o telefone não estiver preenchido.
// Uso: <LinkWhatsApp mensagem="Olá, vim pelo site!" className="...">Falar no WhatsApp</LinkWhatsApp>
import { site } from "@/lib/site";

type Props = {
  mensagem?: string;
  className?: string;
  children?: React.ReactNode;
};

export function LinkWhatsApp({
  mensagem = "Olá! Vim pelo site e gostaria de mais informações.",
  className,
  children = "Falar no WhatsApp",
}: Props) {
  const telefoneInformado = site.negocio.whatsapp || site.negocio.telefone;
  const digitos = telefoneInformado.replace(/\D/g, "");
  if (!digitos) return null;
  const telefone = digitos.startsWith("55") ? digitos : `55${digitos}`;

  const href = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={`Abrir conversa no WhatsApp com ${site.nome}`}
    >
      {children}
    </a>
  );
}
