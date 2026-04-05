"use client";

import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { useTheme, Theme } from "@/src/context/ThemeContext";
import { useLang } from "@/src/context/LanguageContext";
import { en } from "@/src/messages/en";
import { ka } from "@/src/messages/ka";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

const themes = {
  dark: {
    bg: "#080808",
    logo: "#C8C8C8",
    contact: "#6B6A5E",
    label: "#C8C8C8",
    heading: "#F5F0E8",
    gradientFrom: "#C8C8C8",
    gradientTo: "#E8E8E8",
    sub: "#6B6A5E",
    btnBorder: "#C8C8C8",
    btnText: "#C8C8C8",
    btnHoverBg: "#C8C8C8",
    btnHoverText: "#080808",
    scrollText: "#6B6A5E",
    edgeFade: "#080808",
    spotlightFill: "rgba(200,200,200,0.9)",
  },
  blue: {
    bg: "#0A0E1A",
    logo: "#E8EAF0",
    contact: "#4A7BF7",
    label: "#8B9FBF",
    heading: "#E8EAF0",
    gradientFrom: "#4A7BF7",
    gradientTo: "#8B9FBF",
    sub: "#6B7280",
    btnBorder: "#4A7BF7",
    btnText: "#4A7BF7",
    btnHoverBg: "#4A7BF7",
    btnHoverText: "#0A0E1A",
    scrollText: "#4A7BF7",
    edgeFade: "#0A0E1A",
    spotlightFill: "rgba(74,123,247,0.4)",
  },
  cream: {
    bg: "#F5F0E8",
    logo: "#1A1814",
    contact: "#8B7355",
    label: "#6B6358",
    heading: "#1A1814",
    gradientFrom: "#8B7355",
    gradientTo: "#5C4A2A",
    sub: "#6B6358",
    btnBorder: "#8B7355",
    btnText: "#8B7355",
    btnHoverBg: "#8B7355",
    btnHoverText: "#F5F0E8",
    scrollText: "#8B7355",
    edgeFade: "#F5F0E8",
    spotlightFill: "rgba(139,115,85,0.3)",
  },
};

const themeOrder: Theme[] = ["dark", "blue", "cream"];
const themeLabels: Record<Theme, string> = {
  dark: "Dark",
  blue: "Blue",
  cream: "Cream",
};

export default function Hero() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const t = themes[theme];
  const t2 = lang === "ka" ? ka : en;
  const nextTheme = themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length];
  const georgianFont = lang === "ka" ? { fontFamily: '"BPG Nino Mtavruli", sans-serif', fontWeight: 700, letterSpacing: "0.05em" } : {};

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden transition-colors duration-700"
      style={{ background: t.bg }}
    >
      <Spotlight className="z-[2]" fill={t.spotlightFill} />

      {/* Nav */}
      <motion.nav
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 mx-4 mt-4 rounded-xl"
        style={{
          background: "color-mix(in srgb, var(--bg) 40%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "inset 0 1px 1px var(--border), 0 4px 24px rgba(0,0,0,0.15)",
          border: "1px solid var(--border)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <span
          className="tracking-[0.25em] uppercase text-sm font-light transition-colors duration-700"
          style={{ fontFamily: "var(--font-playfair), serif", color: t.logo }}
        >
          AIconic
        </span>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setLang(lang === "en" ? "ka" : "en")}
            className="text-[11px] tracking-[0.25em] uppercase font-light transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            {lang === "en" ? "KA" : "EN"}
          </button>
          <button
            onClick={() => setTheme(nextTheme)}
            className="text-[10px] tracking-widest uppercase font-light px-3 py-1 rounded-full border transition-colors duration-300"
            style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
          >
            {themeLabels[nextTheme]}
          </button>
          <a
            href="#contact"
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: t.contact, ...georgianFont }}
          >
            {t2.nav.contact}
          </a>
        </div>
      </motion.nav>

      {/* Two-column layout */}
      <div className="relative z-10 flex flex-col md:flex-row flex-1 min-h-screen">
        {/* Left column */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-28 pb-32 md:pt-20 md:pb-28 w-full md:w-[52%] lg:w-[48%]">
          <motion.p
            {...fadeUp(0.3)}
            className="text-xs md:text-sm tracking-[0.4em] uppercase mb-8 font-light transition-colors duration-700"
            style={{ color: t.label, ...georgianFont }}
          >
            {t2.hero.label}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
            className="text-[clamp(2.4rem,5.5vw,6rem)] leading-[1.05] tracking-tight mb-8 transition-colors duration-700"
            style={{ fontFamily: lang === "ka" ? '"BPG Nino Mtavruli", sans-serif' : "var(--font-playfair), serif", fontWeight: 700, color: t.heading }}
          >
            {t2.hero.heading1}
            <br />
            {t2.hero.heading2}
            <br />
            {t2.hero.heading3}
            <br />
            <span style={{ color: t.gradientFrom }}>
              {t2.hero.heading4}
              <br />
              {t2.hero.heading5}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.9)}
            className="text-base md:text-lg max-w-sm mb-12 leading-relaxed font-light tracking-wide transition-colors duration-700"
            style={{ color: t.sub, ...georgianFont }}
          >
            {t2.hero.sub}
          </motion.p>

          <motion.div {...fadeUp(1.15)}>
            <a
              href="#work"
              className="group inline-flex items-center gap-4 px-10 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-500 font-light border"
              style={{ borderColor: t.btnBorder, color: t.btnText, ...georgianFont }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = t.btnHoverBg;
                (e.currentTarget as HTMLAnchorElement).style.color = t.btnHoverText;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = t.btnText;
              }}
            >
              {t2.hero.cta}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right column: Spline 3D robot */}
        <motion.div
          className="relative w-full md:w-[48%] lg:w-[52%] flex-1 min-h-[50vh] md:min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          <div
            className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none transition-colors duration-700"
            style={{ background: `linear-gradient(to right, ${t.edgeFade}, transparent)` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none md:hidden transition-colors duration-700"
            style={{ background: `linear-gradient(to bottom, transparent, ${t.edgeFade})` }}
          />
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase transition-colors duration-700"
          style={{ color: t.scrollText }}
        >
          {t2.hero.scroll}
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
