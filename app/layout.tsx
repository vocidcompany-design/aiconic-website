import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import CrispChat from "@/components/CrispChat";
import LeftBeam from "@/components/LeftBeam";
import { ThemeProvider } from "@/src/context/ThemeContext";
import ThemeWrapper from "@/components/ThemeWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AIconic — AI-Powered Visual Marketing",
  description:
    "Premium AI-powered visual marketing for Georgia's leading luxury real estate developers.",
  openGraph: {
    title: "AIconic — AI-Powered Visual Marketing",
    description:
      "We don't create content. We engineer perception. Premium visual marketing for luxury real estate.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(history.scrollRestoration)history.scrollRestoration='manual';window.scrollTo(0,0);`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <ThemeProvider>
          <ThemeWrapper>
            <ScrollToTop />
            <CrispChat />
            <LeftBeam />
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
