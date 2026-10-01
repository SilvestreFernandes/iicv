"use client";

import { useMemo, useState } from "react";
import { SectionTitle } from "./SectionTitle";
import { equipe, especialidades } from "@/lib/equipe";

export function Equipe() {
  const [termo, setTermo] = useState("");
  const [filtro, setFiltro] = useState<string>("todos");

  const filtrados = useMemo(() => {
    const termoBusca = termo.trim().toLowerCase();
    return equipe.filter((p) => {
      const passaFiltro = filtro === "todos" || p.especialidade.includes(filtro);
      if (!passaFiltro) return false;
      if (!termoBusca) return true;
      return (
        p.nome.toLowerCase().includes(termoBusca) ||
        p.especialidade.toLowerCase().includes(termoBusca)
      );
    });
  }, [termo, filtro]);

  return (
    <section id="equipe" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          titulo="Equipe médica"
          subtitulo="Profissionais altamente qualificados dedicados à sua saúde"
        />

        <div className="mx-auto mt-10 max-w-md">
          <label htmlFor="busca-equipe" className="sr-only">
            Buscar por nome ou especialidade
          </label>
          <input
            id="busca-equipe"
            type="text"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Buscar por nome ou especialidade…"
            className="w-full rounded border-2 border-border px-5 py-3 text-sm focus:border-accent focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["todos", ...especialidades].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFiltro(item)}
              aria-pressed={filtro === item}
              className={`rounded border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                filtro === item
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-bg text-ink hover:border-accent"
              }`}
            >
              {item === "todos" ? "Todos" : item}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.length === 0 ? (
            <p className="col-span-full py-12 text-center text-ink-muted">
              Nenhum profissional encontrado.
            </p>
          ) : (
            filtrados.map((p) => (
              <div key={p.nome} className="rounded-lg border-t-4 border-accent bg-bg p-5 shadow-sm">
                <h3 className="font-semibold text-primary">{p.nome}</h3>
                <p className="mt-2 border-l-2 border-accent pl-3 text-sm font-bold text-accent">
                  {p.especialidade}
                </p>
                <p className="mt-2 text-sm text-ink-muted">CRM-DF: {p.crm}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
