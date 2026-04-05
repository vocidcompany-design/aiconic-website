"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

function TitleComponent() {
  return (
    <div className="mb-6 md:mb-10">
      <p
        className="text-xs tracking-[0.4em] uppercase mb-5 font-light"
        style={{ color: "var(--accent)" }}
      >
        Our Approach
      </p>
      <h2
        className="text-[clamp(2rem,4.5vw,4rem)] leading-tight tracking-tight mb-4"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 700,
          color: "var(--text-primary)",
        }}
      >
        Where Strategy
        <br />
        Meets Vision
      </h2>
      <p
        className="text-sm md:text-base font-light tracking-wide max-w-md mx-auto leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        AI-powered campaigns that change how projects are perceived.
      </p>
    </div>
  );
}

function CardContent() {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
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
          <div className="absolute top-0 left-0 w-full h-px" style={{ background: "var(--accent)" }} />
          <div className="absolute top-0 left-0 w-px h-full" style={{ background: "var(--accent)" }} />
        </div>
      ))}

      {/* Central brand mark */}
      <div className="relative flex flex-col items-center gap-5 z-10">
        {/* Thin decorative rings */}
        <div
          className="absolute rounded-full"
          style={{
            width: 260,
            height: 260,
            border: "1px solid var(--border)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 380,
            height: 380,
            border: "1px solid var(--border)",
          }}
        />

        <p
          className="text-[10px] tracking-[0.5em] uppercase font-light"
          style={{ color: "var(--accent)" }}
        >
          AI · Visual · Strategy
        </p>

        <h3
          className="text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight"
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 800, color: "var(--text-primary)" }}
        >
          AIconic
        </h3>

        <div className="flex items-center gap-4">
          <div
            className="w-10 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--accent))",
            }}
          />
          <p
            className="text-[10px] tracking-[0.35em] uppercase font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Georgia · Since 2024
          </p>
          <div
            className="w-10 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, var(--accent))",
            }}
          />
        </div>
      </div>

      {/* Bottom stat bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex border-t"
        style={{ borderColor: "var(--border)" }}
      >
        {[
          { label: "Projects", value: "12+" },
          { label: "Markets", value: "GE" },
          { label: "Approach", value: "AI-First" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center py-4 gap-1 border-r last:border-r-0"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="text-base md:text-xl font-light"
              style={{
                fontFamily: "var(--font-playfair), serif",
                color: "var(--text-primary)",
              }}
            >
              {item.value}
            </span>
            <span
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "var(--text-secondary)" }}
            >
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
    <section className="overflow-hidden transition-colors duration-700" style={{ background: "var(--bg)" }}>
      <ContainerScroll titleComponent={<TitleComponent />}>
        <CardContent />
      </ContainerScroll>
    </section>
  );
}
