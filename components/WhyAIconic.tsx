"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const statements = [
  {
    label: "AI + Craft",
    body: "We combine generative AI with human creative direction to produce visuals that feel impossible — and yet utterly real.",
  },
  {
    label: "Market-Specific",
    body: "Georgia's luxury real estate market has a distinct character. We know its buyers, its aesthetics, and its expectations.",
  },
  {
    label: "Results-Driven",
    body: "Every visual decision is tied to a strategic outcome — faster sales cycles, higher perceived value, stronger brand equity.",
  },
];

export default function WhyAIconic() {
  return (
    <section className="relative py-32 md:py-48 px-6 overflow-hidden transition-colors duration-700" style={{ background: "var(--bg)" }}>
      {/* Background texture */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,200,200,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Central statement */}
        <div className="text-center mb-24 md:mb-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.4em] uppercase mb-10"
            style={{ color: "var(--accent)" }}
          >
            Why AIconic
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          >
            <h2
              className="text-[clamp(2rem,6vw,5.5rem)] leading-[1.0] tracking-tight mb-6"
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              We don&apos;t create content.
            </h2>
            <h2
              className="text-[clamp(2rem,6vw,5.5rem)] leading-[1.0] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, color: "var(--accent)" }}
            >
              We engineer perception.
            </h2>
          </motion.div>
        </div>

        {/* Supporting statements */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {statements.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: EASE,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-px" style={{ background: "var(--accent)" }} />
                <span
                  className="text-xs tracking-[0.3em] uppercase font-light"
                  style={{ color: "var(--accent)" }}
                >
                  {s.label}
                </span>
              </div>
              <p className="text-sm leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
