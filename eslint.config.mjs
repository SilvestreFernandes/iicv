import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Material do template que não é código do site:
    ".claude/**",
    "projeto/**",
    ".playwright-mcp/**",
    // Clone do template usado só como referência; não é código do site.
    "template_sites/**",
  ]),
]);

export default eslintConfig;
