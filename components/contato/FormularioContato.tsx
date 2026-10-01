"use client";
// Formulário de contato com validação no servidor via Server Action.
// Estilize as classes className com o Tailwind do projeto.
// Uso: <FormularioContato /> em qualquer Server ou Client Component.
import { useActionState, useId } from "react";
import { enviarContato, type EstadoFormulario } from "./acoes";

const estadoInicial: EstadoFormulario = { ok: false, mensagem: "" };

export function FormularioContato() {
  const id = useId();
  const [estado, action, pendente] = useActionState(enviarContato, estadoInicial);

  if (estado.ok) {
    return (
      <p role="status" className="rounded border-2 border-green-300 bg-green-50 p-5 text-center font-semibold text-green-800">
        {estado.mensagem}
      </p>
    );
  }

  const campo = "w-full rounded border-2 border-border px-4 py-3 text-sm focus:border-accent focus:outline-none";
  const rotulo = "mb-2 block text-sm font-semibold text-primary";
  const erro = "mt-1 block text-sm text-red-700";

  return (
    <form action={action} noValidate aria-label="Formulário de contato" className="space-y-5">
      {estado.mensagem && !estado.ok && (
        <p role="alert" aria-live="polite" className="rounded border-2 border-red-300 bg-red-50 p-4 text-center font-semibold text-red-800">
          {estado.mensagem}
        </p>
      )}

      <div>
        <label htmlFor={`${id}-nome`} className={rotulo}>Nome</label>
        <input
          id={`${id}-nome`}
          name="nome"
          type="text"
          autoComplete="name"
          required
          className={campo}
          aria-describedby={estado.erros?.nome ? `${id}-erro-nome` : undefined}
        />
        {estado.erros?.nome && (
          <span id={`${id}-erro-nome`} role="alert" className={erro}>
            {estado.erros.nome}
          </span>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={rotulo}>E-mail</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={campo}
          aria-describedby={estado.erros?.email ? `${id}-erro-email` : undefined}
        />
        {estado.erros?.email && (
          <span id={`${id}-erro-email`} role="alert" className={erro}>
            {estado.erros.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-mensagem`} className={rotulo}>Mensagem</label>
        <textarea
          id={`${id}-mensagem`}
          name="mensagem"
          rows={5}
          required
          className={`${campo} resize-y`}
          aria-describedby={estado.erros?.mensagem ? `${id}-erro-mensagem` : undefined}
        />
        {estado.erros?.mensagem && (
          <span id={`${id}-erro-mensagem`} role="alert" className={erro}>
            {estado.erros.mensagem}
          </span>
        )}
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm text-ink-muted">
          <input
            id={`${id}-lgpd`}
            type="checkbox"
            name="lgpd"
            required
            className="mt-1"
            aria-describedby={estado.erros?.lgpd ? `${id}-erro-lgpd` : undefined}
          />
          Concordo com o uso dos meus dados para resposta a este contato.
        </label>
        {estado.erros?.lgpd && <span id={`${id}-erro-lgpd`} role="alert" className={erro}>{estado.erros.lgpd}</span>}
      </div>

      <button
        type="submit"
        disabled={pendente}
        className="w-full rounded border-2 border-primary bg-primary py-4 text-sm font-bold uppercase tracking-wide text-accent-light transition-colors hover:bg-primary-light disabled:opacity-60"
      >
        {pendente ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
