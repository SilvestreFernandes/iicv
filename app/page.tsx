import { IntroProvider } from "@/components/site/IntroProvider";
import { AberturaLogo } from "@/components/site/AberturaLogo";
import { RevelarConteudo } from "@/components/site/RevelarConteudo";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Procedimentos } from "@/components/site/Procedimentos";
import { Diferenciais } from "@/components/site/Diferenciais";
import { Equipe } from "@/components/site/Equipe";
import { Convenios } from "@/components/site/Convenios";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFlutuante } from "@/components/site/WhatsAppFlutuante";

export default function Inicio() {
  return (
    <IntroProvider>
      <AberturaLogo />
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
        <WhatsAppFlutuante />
      </RevelarConteudo>
    </IntroProvider>
  );
}
