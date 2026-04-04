"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const projects = [
  {
    client: "Tempo District",
    category: "Mixed-Use Development",
    description:
      "Full visual brand campaign encompassing cinematic launch film, digital identity, and pre-sales marketing suite for a landmark mixed-use development in Tbilisi.",
    stat: "Pre-sale campaign",
    stat2: "Launch identity",
  },
  {
    client: "Lisi Trio",
    category: "Luxury Residential",
    description:
      "Strategic visual positioning and AI-enhanced campaign for three premium residential towers overlooking Lisi Lake — establishing a new benchmark for luxury living in Georgia.",
    stat: "3 towers",
    stat2: "Premium tier",
  },
];

export default function Results() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-[#080808]">
      {/* Top separator */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="h-px bg-gradient-to-r from-transparent via-[rgba(200,200,200,0.4)] to-transparent origin-left"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[#C8C8C8] text-xs tracking-[0.4em] uppercase mb-4"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="text-[clamp(2rem,5vw,4rem)] leading-tight text-[#F5F0E8]"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
          >
            Brands we&apos;ve elevated.
          </motion.h2>
        </div>

        <div className="space-y-px bg-[rgba(200,200,200,0.1)]">
          {projects.map((project, i) => (
            <motion.div
              key={project.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: EASE,
              }}
              whileHover={{ backgroundColor: "rgba(200,200,200,0.04)" }}
              className="grid md:grid-cols-12 gap-8 items-start bg-[#080808] px-10 py-12 group transition-colors duration-500"
            >
              {/* Left: number + category */}
              <div className="md:col-span-2">
                <span className="text-[#C8C8C8] text-xs tracking-[0.3em] font-light">
                  0{i + 1}
                </span>
              </div>

              {/* Center: main info */}
              <div className="md:col-span-6">
                <p className="text-[#6B6A5E] text-xs tracking-[0.25em] uppercase mb-3 font-light">
                  {project.category}
                </p>
                <h3
                  className="text-[#F5F0E8] text-2xl md:text-3xl mb-5 group-hover:text-[#E8E8E8] transition-colors duration-500"
                  style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
                >
                  {project.client}
                </h3>
                <p className="text-[#6B6A5E] text-sm leading-relaxed font-light max-w-md">
                  {project.description}
                </p>
              </div>

              {/* Right: stats */}
              <div className="md:col-span-4 flex flex-col gap-6 md:items-end">
                <div className="text-right">
                  <p className="text-[#F5F0E8] text-sm font-light">{project.stat}</p>
                  <div className="w-8 h-px bg-[#C8C8C8] mt-1 ml-auto opacity-50" />
                </div>
                <div className="text-right">
                  <p className="text-[#F5F0E8] text-sm font-light">{project.stat2}</p>
                  <div className="w-8 h-px bg-[#C8C8C8] mt-1 ml-auto opacity-50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
