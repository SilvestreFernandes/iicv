import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

// Imagem de compartilhamento (WhatsApp, redes sociais). Gerada a partir da logo real
// (public/logo-iicv.png) e dos dados aprovados em lib/site.ts: nunca inventa texto ou imagem.
export const alt = site.nome || "IICV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo-iicv.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={480} height={480} alt="" />
        {site.descricao && (
          <div
            style={{
              marginTop: 8,
              fontSize: 28,
              color: "#5a5a5a",
              textAlign: "center",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            {site.descricao}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 16,
            backgroundColor: "#b08d57",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
