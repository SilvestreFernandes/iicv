import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Videos } from "@/components/site/Videos";
import { Procedimentos } from "@/components/site/Procedimentos";
import { Diferenciais } from "@/components/site/Diferenciais";
import { Equipe } from "@/components/site/Equipe";
import { Convenios } from "@/components/site/Convenios";
import { Contato } from "@/components/site/Contato";
import { Footer } from "@/components/site/Footer";

export default function Inicio() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Videos />
        <Procedimentos />
        <Diferenciais />
        <Equipe />
        <Convenios />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
