"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    number: "01",
    title: "AI Video Production",
    description:
      "Cinematic property films and brand reels engineered with AI-enhanced visuals, color grading, and spatial storytelling that positions your development as a landmark.",
    icon: "▶",
  },
  {
    number: "02",
    title: "Cinematic Brand Campaigns",
    description:
      "Multi-format visual campaigns built around a single, powerful narrative. From hero imagery to social assets — every frame aligned with your brand's market position.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Strategic Visual Positioning",
    description:
      "We analyze your market, your competitors, and your buyers — then design a visual identity system that occupies a distinct and aspirational place in the minds of premium buyers.",
    icon: "◇",
  },
];

export default function WhatWeDo() {
  return (
    <section id="work" className="relative py-32 md:py-40 px-6 bg-[#080808]">
      {/* Separator */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="h-px bg-gradient-to-r from-transparent via-[#C8C8C8] to-transparent origin-left"
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
            className="text-[#C8C8C8] text-xs tracking-[0.4em] uppercase mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="text-[clamp(2rem,5vw,4rem)] leading-tight text-[#F5F0E8] max-w-2xl"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
          >
            Three disciplines.
            <br />
            <span className="text-[#6B6A5E]">One obsession.</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-[rgba(200,200,200,0.12)]">
          {services.map((service, i) => (
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
              whileHover={{
                y: -6,
                backgroundColor: "rgba(200,200,200,0.06)",
              }}
              className="relative bg-[#080808] p-10 md:p-12 cursor-default transition-colors duration-500 group"
            >
              {/* Hover top border accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-[#C8C8C8] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex items-start justify-between mb-10">
                <span className="text-[#C8C8C8] text-xs tracking-[0.3em] font-light">
                  {service.number}
                </span>
                <span className="text-[#C8C8C8] text-xl opacity-50">
                  {service.icon}
                </span>
              </div>

              <h3
                className="text-[#F5F0E8] text-xl md:text-2xl mb-5 leading-tight"
                style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
              >
                {service.title}
              </h3>
              <p className="text-[#6B6A5E] text-sm leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
