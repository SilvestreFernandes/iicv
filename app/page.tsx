import { IntroProvider } from "@/components/site/IntroProvider";
import { RevelarConteudo } from "@/components/site/RevelarConteudo";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Procedimentos } from "@/components/site/Procedimentos";
import { Diferenciais } from "@/components/site/Diferenciais";
import { Equipe } from "@/components/site/Equipe";
import { Convenios } from "@/components/site/Convenios";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";

export default function Inicio() {
  return (
    <IntroProvider>
      <Header />
      <main id="conteudo">
        <Hero />
        <RevelarConteudo>
          <Procedimentos />
          <Diferenciais />
          <Equipe />
          <Convenios />
          <Contato />
        </RevelarConteudo>
      </main>
      <RevelarConteudo>
        <Footer />
      </RevelarConteudo>
    </IntroProvider>
  );
}
