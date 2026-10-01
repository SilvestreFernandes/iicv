"use server";
// Server Action para o formulário de contato.
// Valida no servidor; nunca confia nos dados do cliente.
// Para enviar e-mail: substitua o console.log por nodemailer, Resend ou similar.

export type EstadoFormulario = {
  ok: boolean;
  mensagem: string;
  erros?: Record<string, string>;
};

export async function enviarContato(
  _estado: EstadoFormulario,
  dados: FormData,
): Promise<EstadoFormulario> {
  const texto = (campo: string) => {
    const valor = dados.get(campo);
    return typeof valor === "string" ? valor.trim() : "";
  };
  const nome = texto("nome");
  const email = texto("email");
  const mensagem = texto("mensagem");
  const lgpd = dados.get("lgpd") === "on";

  const erros: Record<string, string> = {};

  if (!nome || nome.length < 2 || nome.length > 150) erros.nome = "Informe um nome entre 2 e 150 caracteres.";
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    erros.email = "Informe um e-mail válido com até 254 caracteres.";
  }
  if (!mensagem || mensagem.length < 10 || mensagem.length > 5000) {
    erros.mensagem = "Escreva uma mensagem entre 10 e 5000 caracteres.";
  }
  if (!lgpd) erros.lgpd = "É necessário concordar com o uso dos dados.";

  if (Object.keys(erros).length > 0) {
    return { ok: false, mensagem: "Corrija os campos destacados.", erros };
  }

  // Integre um provedor de envio antes de publicar. Não registre os dados pessoais em logs.
  return {
    ok: false,
    mensagem: "A validação passou, mas o envio ainda não foi configurado neste site.",
  };
}
