"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import "lenis/dist/lenis.css";

export default function RolagemSuave() {
  const lenisRef = useRef<LenisRef>(null);

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    function atualizar(tempo: number) {
      lenisRef.current?.lenis?.raf(tempo * 1000);
    }

    gsap.ticker.add(atualizar);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(atualizar);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, anchors: true, respectReducedMotion: true }}
    />
  );
}
