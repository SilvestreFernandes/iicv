import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { JsonLdNegocio } from "@/components/seo/JsonLd";
import { site, siteIndexavel, urlDoSite } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(urlDoSite()),
  title: site.nome ? { default: site.nome, template: `%s | ${site.nome}` } : "Site em construção",
  description: site.descricao || undefined,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome || undefined,
  },
  robots: siteIndexavel() ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <JsonLdNegocio />
      </body>
    </html>
  );
}
