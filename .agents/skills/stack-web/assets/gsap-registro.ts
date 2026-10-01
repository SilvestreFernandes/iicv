// Copiar para lib/gsap.ts. Registro único dos plugins do GSAP.
// Importe gsap, ScrollTrigger, SplitText e useGSAP SEMPRE daqui, e só em componentes "use client".
// Remova SplitText se a camada de tipografia animada não foi ativada.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
  // Evita recalcular tudo quando a barra de endereço do celular aparece/some.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
