"use client";

import { motion } from "framer-motion";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AiChat() {
  return (
    <section className="relative py-32 md:py-40 px-6 bg-[#080808]">
      {/* Top separator */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="h-px bg-gradient-to-r from-transparent via-[rgba(200,200,200,0.35)] to-transparent origin-left"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="md:sticky md:top-32"
          >
            <p className="text-[#C8C8C8] text-xs tracking-[0.4em] uppercase mb-6 font-light">
              Quick Answers
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.8rem)] leading-[1.08] tracking-tight text-[#F5F0E8] mb-8"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
            >
              Let&apos;s Talk About
              <br />
              Your Brand.
            </h2>
            <p className="text-[#6B6A5E] text-sm leading-relaxed font-light max-w-xs">
              Ask us anything — our services, past projects, how AI video
              production works, or how we approach your market.
            </p>

            <div className="mt-12 flex flex-col gap-3">
              {["AI Video Production", "Brand Campaigns", "Visual Positioning"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4 h-px bg-[rgba(200,200,200,0.3)]" />
                    <span className="text-[#6B6A5E] text-xs tracking-[0.2em] uppercase font-light">
                      {item}
                    </span>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Right: chat */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="border border-[rgba(200,200,200,0.08)] bg-[#0b0b0b] p-6 md:p-8 flex flex-col"
            style={{ minHeight: 520 }}
          >
            <VercelV0Chat
              heading="Let's Talk About Your Brand."
              placeholder="Ask us anything about your project..."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
