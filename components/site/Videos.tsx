import { RevelarAoEntrar } from "@/components/animacoes/RevelarAoEntrar";
import { SectionTitle } from "./SectionTitle";
import { videosInstitucionais } from "@/lib/conteudo";

export function Videos() {
  return (
    <section className="bg-bg-muted px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          titulo="Conheça o IICV"
          subtitulo="Assista nossos vídeos institucionais e saiba mais sobre nossos serviços"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {videosInstitucionais.map((video, i) => (
            <RevelarAoEntrar key={video.youtubeId} margem="-10%">
              <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.titulo}
                  className="absolute inset-0 h-full w-full"
                  loading={i === 0 ? "eager" : "lazy"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </RevelarAoEntrar>
          ))}
        </div>
      </div>
    </section>
  );
}
