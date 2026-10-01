import { site } from "@/lib/site";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-accent bg-primary px-4 py-10 text-center text-white sm:px-6">
      <p className="text-lg">&copy; {ano} {site.nome}</p>
      <p className="mt-1">Excelência em Cardiologia Intervencionista</p>
      <p className="mt-6 text-sm opacity-80">Diretor Presidente: Dr. Paulo Antônio Marra da Motta</p>
    </footer>
  );
}
