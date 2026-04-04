import Hero from "@/components/Hero";
import ShowcaseScroll from "@/components/ShowcaseScroll";
import AiChat from "@/components/AiChat";
import WhatWeDo from "@/components/WhatWeDo";
import WhyAIconic from "@/components/WhyAIconic";
import Results from "@/components/Results";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <ShowcaseScroll />
      <AiChat />
      <WhatWeDo />
      <WhyAIconic />
      <Results />
      <Contact />
    </main>
  );
}
