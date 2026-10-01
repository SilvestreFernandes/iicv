# Modelos de JSON-LD (preencher com dados reais, nunca inventar)

## Negócio local (home)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nome da Marca",
  "description": "O que o negócio faz, em uma frase.",
  "url": "https://www.seudominio.com.br",
  "image": "https://www.seudominio.com.br/og-image.jpg",
  "telephone": "+55-61-90000-0000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Exemplo, 123",
    "addressLocality": "Brasília",
    "addressRegion": "DF",
    "postalCode": "70000-000",
    "addressCountry": "BR"
  },
  "openingHours": "Mo-Fr 08:00-18:00",
  "sameAs": ["https://www.instagram.com/marca"]
}
```
Troque `LocalBusiness` por um subtipo mais preciso quando existir (`Dentist`, `Restaurant`, `BeautySalon`, `MedicalClinic`...).

## Serviço
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Nome do serviço",
  "description": "Descrição objetiva.",
  "provider": { "@type": "Organization", "name": "Nome da Marca" },
  "areaServed": "Brasília - DF"
}
```

## FAQ (ajuda buscadores e IAs a extrair respostas)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Pergunta real que clientes fazem?",
    "acceptedAnswer": { "@type": "Answer", "text": "Resposta direta." }
  }]
}
```
