"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Lock scroll restoration so the browser never jumps
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollTop = () => window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });

    // Immediate — catches normal cases
    scrollTop();

    // After first paint
    const raf1 = requestAnimationFrame(() => {
      scrollTop();
      // After second paint — catches synchronous layout work
      const raf2 = requestAnimationFrame(scrollTop);
      return () => cancelAnimationFrame(raf2);
    });

    // 200 ms — catches Spline / Three.js canvas resize reflows
    const t1 = setTimeout(scrollTop, 200);
    // 800 ms — catches slow async asset loads that shift layout
    const t2 = setTimeout(scrollTop, 800);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
