# Headers de segurança — modelos

**No template:** os headers base já estão em `next.config.ts` (HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options e uma CSP mínima com `frame-ancestors`, `base-uri`, `form-action` e `object-src`). Na fase 5 (revisão), complete a CSP com o que o site carrega de fato. Com `next/font`, as fontes são servidas pelo próprio domínio: não é preciso liberar `fonts.googleapis.com` nem `fonts.gstatic.com`.

Ajuste a CSP ao que o site realmente carrega (analytics, mapas, vídeos, Supabase). Comece com `Content-Security-Policy-Report-Only` para não quebrar o site, confira o console e depois ative.

## Valores base
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'self'; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
```

## Vercel (vercel.json)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; frame-ancestors 'none'; base-uri 'self'" }
      ]
    }
  ]
}
```

## Next.js (next.config.js)
```js
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'DENY' },
];
module.exports = {
  poweredByHeader: false,
  async headers() { return [{ source: '/(.*)', headers: securityHeaders }]; },
};
```

## Netlify (_headers)
```
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
```

## Express
```js
import helmet from 'helmet';
app.use(helmet());
app.disable('x-powered-by');
```
