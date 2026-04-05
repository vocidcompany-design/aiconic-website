"use client";

import { motion } from "framer-motion";
import { useLang } from "@/src/context/LanguageContext";
import { en } from "@/src/messages/en";
import { ka } from "@/src/messages/ka";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const icons = ["▶", "◈", "◇"];

export default function WhatWeDo() {
  const { lang } = useLang();
  const t = lang === "ka" ? ka : en;
  const georgianHeading = lang === "ka" ? { fontFamily: '"BPG Nino Mtavruli", sans-serif', fontWeight: 700 } : {};

  return (
    <section
      className="relative py-32 md:py-40 px-6 transition-colors duration-700"
      style={{ background: "var(--bg)" }}
    >
      {/* Separator */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="h-px origin-left"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--accent), transparent)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "var(--accent)" }}
          >
            {t.whatWeDo.label}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="text-[clamp(2rem,5vw,4rem)] leading-tight max-w-2xl"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              color: "var(--text-primary)",
              ...georgianHeading,
            }}
          >
            {t.whatWeDo.heading1}
            <br />
            <span style={{ color: "var(--text-secondary)" }}>{t.whatWeDo.heading2}</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div
          className="grid md:grid-cols-3 gap-0"
          style={{ border: "1px solid var(--border)" }}
        >
          {t.whatWeDo.services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: EASE,
              }}
              whileHover={{ y: -6 }}
              className="relative p-10 md:p-12 cursor-default transition-colors duration-500 group"
              style={{ background: "var(--bg)", backgroundColor: "var(--bg)" }}
            >
              {/* Hover top border accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "var(--accent)" }}
              />

              <div className="flex items-start justify-between mb-10">
                <span
                  className="text-xs tracking-[0.3em] font-light"
                  style={{ color: "var(--accent)" }}
                >
                  {service.number}
                </span>
                <span className="text-xl opacity-50" style={{ color: "var(--accent)" }}>
                  {icons[i]}
                </span>
              </div>

              <h3
                className="text-xl md:text-2xl mb-5 leading-tight"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  ...georgianHeading,
                }}
              >
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
