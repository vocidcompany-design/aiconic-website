"use client";

import { useTheme } from "@/src/context/ThemeContext";

const themeVars = {
  dark: {
    "--bg": "#080808",
    "--text-primary": "#F5F0E8",
    "--text-secondary": "#6B6A5E",
    "--accent": "#C8C8C8",
    "--border": "rgba(255,255,255,0.1)",
  },
  blue: {
    "--bg": "#0A0E1A",
    "--text-primary": "#E8EAF0",
    "--text-secondary": "#6B7280",
    "--accent": "#4A7BF7",
    "--border": "rgba(74,123,247,0.15)",
  },
  cream: {
    "--bg": "#F5F0E8",
    "--text-primary": "#1A1814",
    "--text-secondary": "#6B6358",
    "--accent": "#8B7355",
    "--border": "rgba(139,115,85,0.15)",
  },
} as const;

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <div
      data-theme={theme}
      style={{ minHeight: "100%", ...themeVars[theme] } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
