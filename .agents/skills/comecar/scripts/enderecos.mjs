#!/usr/bin/env node
// Endereços do servidor de desenvolvimento: localhost e o IP na rede local (para abrir no celular,
// na mesma rede Wi-Fi). O next.config.ts libera esses IPs em allowedDevOrigins.
// Uso: node .claude/skills/comecar/scripts/enderecos.mjs [porta]

import { networkInterfaces } from "node:os";

const porta = process.argv[2] ?? process.env.PORT ?? "3000";
const privado = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/;

const ips = Object.values(networkInterfaces())
  .flat()
  .filter((i) => i && i.family === "IPv4" && !i.internal && privado.test(i.address))
  .map((i) => i.address);

console.log(`local: http://localhost:${porta}`);
for (const ip of ips) console.log(`rede:  http://${ip}:${porta}`);
if (!ips.length) console.log("rede:  nenhum IP de rede local encontrado (Wi-Fi desligado?)");
