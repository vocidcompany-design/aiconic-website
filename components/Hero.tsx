"use client";

import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#080808]">
      {/* Spotlight — interactive mouse-follow glow */}
      <Spotlight className="z-[2]" fill="rgba(200,200,200,0.9)" />

      {/* Nav */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <span
          className="text-[#C8C8C8] tracking-[0.25em] uppercase text-sm font-light"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          AIconic
        </span>
        <a
          href="mailto:contact@aiconic.ge"
          className="text-[#6B6A5E] hover:text-[#C8C8C8] text-xs tracking-[0.2em] uppercase transition-colors duration-300"
        >
          Contact
        </a>
      </motion.nav>

      {/* Two-column layout */}
      <div className="relative z-10 flex flex-col md:flex-row flex-1 min-h-screen">
        {/* ── Left column: text content ── */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-28 pb-32 md:pt-20 md:pb-28 w-full md:w-[52%] lg:w-[48%]">
          <motion.p
            {...fadeUp(0.3)}
            className="text-[#C8C8C8] text-xs md:text-sm tracking-[0.4em] uppercase mb-8 font-light"
          >
            AI-Powered Visual Marketing · Georgia
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
            className="text-[clamp(2.4rem,5.5vw,6rem)] leading-[1.05] tracking-tight mb-8 text-[#F5F0E8]"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
          >
            Premium
            <br />
            Developers
            <br />
            Deserve
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #C8C8C8 0%, #E8E8E8 50%, #C8C8C8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Premium
              <br />
              Perception
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.9)}
            className="text-[#6B6A5E] text-base md:text-lg max-w-sm mb-12 leading-relaxed font-light tracking-wide"
          >
            AI-powered visual marketing for Georgia&apos;s leading real estate
            brands
          </motion.p>

          <motion.div {...fadeUp(1.15)}>
            <a
              href="#work"
              className="group inline-flex items-center gap-4 px-10 py-4 border border-[#C8C8C8] text-[#C8C8C8] text-xs tracking-[0.3em] uppercase hover:bg-[#C8C8C8] hover:text-[#080808] transition-all duration-500 font-light"
            >
              See Our Work
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

        </div>

        {/* ── Right column: Spline 3D robot ── */}
        <motion.div
          className="relative w-full md:w-[48%] lg:w-[52%] flex-1 min-h-[50vh] md:min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          {/* Edge fade — blends left edge of canvas into background */}
          <div
            className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #080808, transparent)",
            }}
          />
          {/* Bottom fade for mobile */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none md:hidden"
            style={{
              background: "linear-gradient(to bottom, transparent, #080808)",
            }}
          />

          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Scroll indicator — bottom center of the full section */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span className="text-[#6B6A5E] text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#C8C8C8] to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
