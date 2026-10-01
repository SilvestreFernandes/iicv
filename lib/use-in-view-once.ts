"use client";

import { useEffect, useState, type RefObject } from "react";

export function useInViewOnce<T extends HTMLElement>(
  ref: RefObject<T | null>,
  rootMargin = "200px",
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, visible]);

  return visible;
}
