import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";
import { SectionTitle } from "./SectionTitle";
import { LinkWhatsApp } from "@/components/contato/LinkWhatsApp";
import { site } from "@/lib/site";

function Icone({ d }: { d: string }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-[#2c4a7c] text-accent-light shadow-lg shadow-primary/20">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={d} />
      </svg>
    </div>
  );
}

export function Contato() {
  const { telefone, endereco } = site.negocio;
  const digitos = telefone.replace(/\D/g, "").replace(/^55/, "");
  const telefoneHref = `tel:+55${digitos}`;
  // Celular (9 dígitos após o DDD) quebra 5+4; fixo (8 dígitos) quebra 4+4.
  const numeroLocal = digitos.slice(2);
  const corte = numeroLocal.length === 9 ? 5 : 4;
  const telefoneExibicao = `(${digitos.slice(0, 2)}) ${numeroLocal.slice(0, corte)}-${numeroLocal.slice(corte)}`;
  const mapaHref = endereco
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}, ${endereco.cep}`,
      )}`
    : null;

  const cartao = "card-borda h-full";
  const miolo = "h-full rounded-[calc(1rem-1px)] bg-white/90 p-6 backdrop-blur";
  const link = "font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent";

  return (
    <section id="contato" className="fundo-claro relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="mancha -left-32 top-20 h-96 w-96 bg-accent/20" aria-hidden="true" />
      <div
        className="mancha -right-32 bottom-10 h-[26rem] w-[26rem] bg-[#2c4a7c]/15"
        style={{ animationDelay: "-14s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle rotulo="Fale conosco" titulo="Entre em contato" subtitulo="Estamos prontos para atender você" />

        <RevelarAoEntrar className="mt-14">
          <div className="fundo-escuro relative overflow-hidden rounded-3xl px-6 py-10 text-center text-white shadow-2xl shadow-primary/30 sm:px-12">
            <div className="mancha -right-10 -top-20 h-64 w-64 bg-accent/30" aria-hidden="true" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">Agende sua consulta</h3>
              <p className="mx-auto mt-3 max-w-lg text-white/75">
                Fale com a nossa equipe pelo WhatsApp e tire suas dúvidas sobre procedimentos e convênios.
              </p>
              <LinkWhatsApp
                mensagem={`Olá! Vim pelo site do ${site.nome.split(" - ")[0]} e gostaria de agendar uma consulta.`}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent to-accent-light px-8 py-4 text-sm font-bold uppercase tracking-wide text-primary shadow-lg shadow-accent/30 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
              >
                Agendar pelo WhatsApp
              </LinkWhatsApp>
            </div>
          </div>
        </RevelarAoEntrar>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <RevelarAoEntrar atraso={0} className="h-full">
            <div className={cartao}>
              <div className={miolo}>
                <Icone d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
                <h3 className="mt-4 font-display text-lg font-bold text-primary">Telefone</h3>
                <p className="mt-2">
                  <a href={telefoneHref} className={link}>
                    {telefoneExibicao}
                  </a>
                </p>
              </div>
            </div>
          </RevelarAoEntrar>

          <RevelarAoEntrar atraso={100} className="h-full">
            <div className={cartao}>
              <div className={miolo}>
                <Icone d="M4 20l1.3-4A8.5 8.5 0 1 1 8 18.7L4 20zM9 9.5c.5 2.5 2.5 4.5 5 5l1.2-1.2 2 1-.5 1.7c-4 .3-8.5-4.2-8.2-8.2L10.2 7l1 2L9 9.5z" />
                <h3 className="mt-4 font-display text-lg font-bold text-primary">WhatsApp</h3>
                <p className="mt-2">
                  <LinkWhatsApp className={link}>Enviar mensagem</LinkWhatsApp>
                </p>
              </div>
            </div>
          </RevelarAoEntrar>

          <RevelarAoEntrar atraso={200} className="h-full">
            <div className={cartao}>
              <div className={miolo}>
                <Icone d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5z" />
                <h3 className="mt-4 font-display text-lg font-bold text-primary">Endereço</h3>
                {endereco && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {endereco.rua}
                    <br />
                    {endereco.bairro}, {endereco.cidade} - {endereco.uf}
                    <br />
                    CEP: {endereco.cep}
                  </p>
                )}
                {mapaHref && (
                  <a href={mapaHref} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-block text-sm ${link}`}>
                    Ver no mapa
                  </a>
                )}
              </div>
            </div>
          </RevelarAoEntrar>

          <RevelarAoEntrar atraso={300} className="h-full">
            <div className={cartao}>
              <div className={miolo}>
                <Icone d="M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v5l3.5 2" />
                <h3 className="mt-4 font-display text-lg font-bold text-primary">Funcionamento</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Segunda a sexta: 8h às 18h
                  <br />
                  Urgência: 24 horas
                </p>
              </div>
            </div>
          </RevelarAoEntrar>
        </div>
      </div>
    </section>
  );
}
