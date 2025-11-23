"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import Message from "@/components/Message";
import IntroOverlay from "@/components/IntroOverlay";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#050505] text-[#F5F5F5] overflow-x-hidden">
      <IntroOverlay onComplete={() => setIntroFinished(true)} />
      <div className={`transition-opacity duration-1000 ${introFinished ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        <Story />
        <Gallery />
        <Message />
      </div>
    </main>
  );
}
