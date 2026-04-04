"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

function TitleComponent() {
  return (
    <div className="mb-6 md:mb-10">
      <p className="text-[#C8C8C8] text-xs tracking-[0.4em] uppercase mb-5 font-light">
        Our Approach
      </p>
      <h2
        className="text-[clamp(2rem,4.5vw,4rem)] leading-tight tracking-tight text-[#F5F0E8] mb-4"
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700 }}
      >
        Where Strategy
        <br />
        Meets Vision
      </h2>
      <p className="text-[#6B6A5E] text-sm md:text-base font-light tracking-wide max-w-md mx-auto leading-relaxed">
        AI-powered campaigns that change how projects are perceived.
      </p>
    </div>
  );
}

function CardContent() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,200,200,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,200,200,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner accents */}
      {[
        "top-4 left-4",
        "top-4 right-4 rotate-90",
        "bottom-4 left-4 -rotate-90",
        "bottom-4 right-4 rotate-180",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-5 h-5 opacity-30`}>
          <div className="absolute top-0 left-0 w-full h-px bg-[#C8C8C8]" />
          <div className="absolute top-0 left-0 w-px h-full bg-[#C8C8C8]" />
        </div>
      ))}

      {/* Central brand mark */}
      <div className="relative flex flex-col items-center gap-5 z-10">
        {/* Thin decorative ring */}
        <div
          className="absolute rounded-full border border-[rgba(200,200,200,0.08)]"
          style={{ width: 260, height: 260 }}
        />
        <div
          className="absolute rounded-full border border-[rgba(200,200,200,0.04)]"
          style={{ width: 380, height: 380 }}
        />

        <p className="text-[#C8C8C8] text-[10px] tracking-[0.5em] uppercase font-light">
          AI · Visual · Strategy
        </p>

        <h3
          className="text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 800,
            background:
              "linear-gradient(160deg, #ffffff 0%, #C8C8C8 40%, #686868 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AIconic
        </h3>

        <div className="flex items-center gap-4">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-[rgba(200,200,200,0.4)]" />
          <p className="text-[#6B6A5E] text-[10px] tracking-[0.35em] uppercase font-light">
            Georgia · Since 2024
          </p>
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-[rgba(200,200,200,0.4)]" />
        </div>
      </div>

      {/* Bottom stat bar */}
      <div className="absolute bottom-0 left-0 right-0 flex border-t border-[rgba(200,200,200,0.06)]">
        {[
          { label: "Projects", value: "12+" },
          { label: "Markets", value: "GE" },
          { label: "Approach", value: "AI-First" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center py-4 gap-1 border-r border-[rgba(200,200,200,0.06)] last:border-r-0"
          >
            <span
              className="text-[#F5F0E8] text-base md:text-xl font-light"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {item.value}
            </span>
            <span className="text-[#6B6A5E] text-[9px] tracking-[0.3em] uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShowcaseScroll() {
  return (
    <section className="bg-[#080808] overflow-hidden">
      <ContainerScroll titleComponent={<TitleComponent />}>
        <CardContent />
      </ContainerScroll>
    </section>
  );
}
