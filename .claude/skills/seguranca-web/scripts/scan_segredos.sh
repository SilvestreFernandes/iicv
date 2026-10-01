#!/usr/bin/env bash
# Varredura rápida e local de segredos e padrões inseguros no próprio projeto.
# Uso: bash scan_segredos.sh [pasta]   (padrão: pasta atual)
# Não substitui gitleaks/trufflehog; serve como primeira checagem.

ALVO="${1:-.}"
EXCLUIR="--exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude-dir=dist --exclude-dir=build --exclude-dir=.venv --exclude=*.lock --exclude=package-lock.json"

secao() { echo; echo "=== $1 ==="; }
busca() { grep -rnIE $EXCLUIR "$1" "$ALVO" 2>/dev/null | head -50; }

secao "Chaves com formato conhecido"
busca 'sk_live_[0-9a-zA-Z]{10,}|rk_live_[0-9a-zA-Z]{10,}'           # Stripe secret/restricted
busca 'sk-(proj-|ant-)?[A-Za-z0-9_-]{20,}'                          # OpenAI / Anthropic
busca 'AKIA[0-9A-Z]{16}'                                            # AWS
busca 'AIza[0-9A-Za-z_-]{35}'                                       # Google API
busca 'gh[pousr]_[A-Za-z0-9]{30,}'                                  # GitHub
busca '-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----'
busca 're_[A-Za-z0-9]{20,}|SG\.[A-Za-z0-9_-]{20,}'                  # Resend / SendGrid

secao "Supabase service_role (nunca deve estar no frontend)"
busca 'service_role|SERVICE_ROLE'

secao "Variáveis públicas com nome de segredo"
busca '(NEXT_PUBLIC_|VITE_|EXPO_PUBLIC_|REACT_APP_)[A-Z_]*(SECRET|SERVICE|PRIVATE|PASSWORD|TOKEN)'

secao "Atribuições suspeitas de segredo no código"
busca '(api[_-]?key|secret|password|senha|token)[\"'"'"']?\s*[:=]\s*[\"'"'"'][^\"'"'"']{8,}'

secao "Padrões perigosos"
busca 'dangerouslySetInnerHTML|\.innerHTML\s*=|v-html'
busca '\beval\(|new Function\(|child_process|exec\('
busca 'using \(true\)|with check \(true\)|allow read, write: if true'
busca 'Access-Control-Allow-Origin.{0,5}\*'

secao ".env fora do .gitignore"
for f in $(find "$ALVO" -maxdepth 3 -name ".env*" -not -name ".env.example" -not -path "*/node_modules/*" 2>/dev/null); do
  if git -C "$ALVO" check-ignore -q "$f" 2>/dev/null; then echo "ok (ignorado): $f"; else echo "ATENÇÃO, não ignorado pelo git: $f"; fi
done

echo; echo "Revise cada ocorrência: nem todo resultado é falha, e ausência de resultado não prova que está seguro."
