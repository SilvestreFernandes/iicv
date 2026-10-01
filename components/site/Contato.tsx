import { SectionTitle } from "./SectionTitle";
import { LinkWhatsApp } from "@/components/contato/LinkWhatsApp";
import { site } from "@/lib/site";

export function Contato() {
  const { telefone, endereco } = site.negocio;
  const digitos = telefone.replace(/\D/g, "").replace(/^55/, "");
  const telefoneHref = `tel:+55${digitos}`;
  // Celular (9 dígitos após o DDD) quebra 5+4; fixo (8 dígitos) quebra 4+4.
  const numeroLocal = digitos.slice(2);
  const corte = numeroLocal.length === 9 ? 5 : 4;
  const telefoneExibicao = `(${digitos.slice(0, 2)}) ${numeroLocal.slice(0, corte)}-${numeroLocal.slice(corte)}`;

  return (
    <section id="contato" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle titulo="Entre em contato" subtitulo="Estamos prontos para atender você" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border-t-4 border-accent bg-bg p-6 text-center shadow-sm">
            <h3 className="font-display text-lg font-bold text-primary">Telefone</h3>
            <p className="mt-3">
              <a href={telefoneHref} className="font-semibold text-primary underline decoration-accent underline-offset-4">
                {telefoneExibicao}
              </a>
            </p>
          </div>
          <div className="rounded-lg border-t-4 border-accent bg-bg p-6 text-center shadow-sm">
            <h3 className="font-display text-lg font-bold text-primary">WhatsApp</h3>
            <p className="mt-3">
              <LinkWhatsApp className="font-semibold text-primary underline decoration-accent underline-offset-4">
                Enviar mensagem
              </LinkWhatsApp>
            </p>
          </div>
          <div className="rounded-lg border-t-4 border-accent bg-bg p-6 text-center shadow-sm">
            <h3 className="font-display text-lg font-bold text-primary">Endereço</h3>
            {endereco && (
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {endereco.rua}
                <br />
                {endereco.bairro}, {endereco.cidade} - {endereco.uf}
                <br />
                CEP: {endereco.cep}
              </p>
            )}
          </div>
          <div className="rounded-lg border-t-4 border-accent bg-bg p-6 text-center shadow-sm">
            <h3 className="font-display text-lg font-bold text-primary">Funcionamento</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Segunda a sexta: 8h às 18h
              <br />
              Urgência: 24 horas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
