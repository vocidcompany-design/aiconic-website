"use client";

import { motion } from "framer-motion";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
// import { BackgroundCellCore } from "@/components/ui/background-cell-animation";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AiChat() {
  return (
    <section
      className="relative py-32 md:py-48 px-6 overflow-hidden transition-colors duration-700"
      style={{ background: "var(--bg)" }}
    >
      {/* Background cell grid — fills section, sits behind everything */}
      {/* <BackgroundCellCore /> */}
      {/* All content above the cell grid */}
      <div className="relative z-50">

      {/* Top separator */}
      <div className="max-w-4xl mx-auto mb-20">
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

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="flex flex-col items-center gap-4"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase font-light"
            style={{ color: "var(--accent)" }}
          >
            Ask Anything
          </p>
          <h2
            className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 700,
              color: "var(--text-primary)",
            }}
          >
            What can we build
            <br />
            for you?
          </h2>
        </motion.div>

        {/* Chat interface */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="w-full"
        >
          <VercelV0Chat placeholder="Ask us anything about AIconic..." />
        </motion.div>
      </div>

      </div>{/* end z-50 wrapper */}
    </section>
  );
}
