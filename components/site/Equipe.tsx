"use client";

import { useMemo, useState } from "react";
import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";
import { SectionTitle } from "./SectionTitle";
import { equipe, especialidades } from "@/lib/equipe";

function iniciais(nome: string) {
  const partes = nome.split(" ").filter((p) => p.length > 2);
  return ((partes[0]?.[0] ?? "") + (partes[partes.length - 1]?.[0] ?? "")).toUpperCase();
}

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
    <section id="equipe" className="fundo-claro relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="mancha -right-32 top-32 h-96 w-96 bg-accent/20" aria-hidden="true" />
      <div
        className="mancha -left-40 bottom-20 h-[26rem] w-[26rem] bg-[#2c4a7c]/15"
        style={{ animationDelay: "-6s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          rotulo="Corpo clínico"
          titulo="Equipe médica"
          subtitulo="Profissionais altamente qualificados dedicados à sua saúde"
        />

        <div className="relative mx-auto mt-12 max-w-md">
          <label htmlFor="busca-equipe" className="sr-only">
            Buscar por nome ou especialidade
          </label>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM21 21l-4.3-4.3" />
          </svg>
          <input
            id="busca-equipe"
            type="text"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Buscar por nome ou especialidade…"
            className="w-full rounded-full border border-border bg-white/80 py-3.5 pl-12 pr-5 text-sm shadow-sm backdrop-blur transition-shadow focus:border-accent focus:shadow-lg focus:shadow-accent/15 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {["todos", ...especialidades].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFiltro(item)}
              aria-pressed={filtro === item}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                filtro === item
                  ? "bg-linear-to-r from-primary to-[#2c4a7c] text-accent-light shadow-lg shadow-primary/25"
                  : "border border-border bg-white/70 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-accent"
              }`}
            >
              {item === "todos" ? "Todos" : item}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted" aria-live="polite">
          {filtrados.length} {filtrados.length === 1 ? "profissional" : "profissionais"}
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.length === 0 ? (
            <p className="col-span-full py-12 text-center text-ink-muted">
              Nenhum profissional encontrado.
            </p>
          ) : (
            filtrados.map((p, i) => (
              <RevelarAoEntrar key={p.nome} margem="-5%" atraso={(i % 6) * 60} className="h-full">
                <div className="card-borda h-full">
                  <div className="flex h-full items-center gap-4 rounded-[calc(1rem-1px)] bg-white/90 p-5 backdrop-blur">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary via-[#2c4a7c] to-accent font-display text-lg font-bold text-white shadow-md"
                      aria-hidden="true"
                    >
                      {iniciais(p.nome)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-snug text-primary">{p.nome}</h3>
                      <p className="mt-1 text-sm font-medium text-accent">{p.especialidade}</p>
                      <p className="mt-0.5 text-xs text-ink-muted">CRM-DF: {p.crm}</p>
                    </div>
                  </div>
                </div>
              </RevelarAoEntrar>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
