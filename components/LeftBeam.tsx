"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function LeftBeam() {
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Track window scroll — no target ref, never touches DOM layout
  const { scrollYProgress } = useScroll();

  // y1 and y2 move across the viewport height as the page scrolls
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [0, vh]),
    { stiffness: 500, damping: 90 }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, vh - 80]),
    { stiffness: 500, damping: 90 }
  );

  if (!vh) return null;

  return (
    <div
      className="fixed left-6 top-0 h-screen z-30 pointer-events-none hidden md:block"
      aria-hidden="true"
    >
      {/* Top dot */}
      <div className="absolute top-8 left-[3px] w-3 h-3 rounded-full border border-neutral-700 flex items-center justify-center">
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          animate={{ backgroundColor: ["#18CCFC", "#6344F5", "#AE48FF", "#18CCFC"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <svg
        viewBox={`0 0 10 ${vh}`}
        width="10"
        height={vh}
        className="absolute top-0 left-0"
      >
        {/* Static dim track — full viewport height */}
        <path
          d={`M 5 0 V ${vh}`}
          fill="none"
          stroke="#9091A0"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        {/* Animated gradient beam */}
        <motion.path
          d={`M 5 0 V ${vh}`}
          fill="none"
          stroke="url(#left-beam-gradient)"
          strokeWidth="1.5"
        />
        <defs>
          <motion.linearGradient
            id="left-beam-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            x2="0"
            y1={y1}
            y2={y2}
          >
            <stop stopColor="#18CCFC" stopOpacity="0" />
            <stop stopColor="#18CCFC" />
            <stop offset="0.4" stopColor="#6344F5" />
            <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  );
}
