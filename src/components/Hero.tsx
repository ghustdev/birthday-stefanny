"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Spline from '@splinetool/react-spline';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Spline Placeholder */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-50">
        {/* <Spline scene="https://prod.spline.design/YOUR_SCENE_URL/scene.splinecode" /> */}
        <div className="w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto flex flex-col justify-center min-h-[50vh] md:min-h-0">
        <h1 ref={titleRef} className="text-[clamp(2.5rem,8vw,6rem)] font-serif font-bold text-white mb-6 tracking-tight leading-[1.1]">
          Feliz Aniversário, <br className="md:hidden" /> <span className="text-accent">meu amor!❤️</span>
        </h1>
        <p ref={subtitleRef} className="text-[clamp(1rem,4vw,1.5rem)] text-white/80 font-light tracking-wide px-4 max-w-lg mx-auto">
          Role para descobrir nossa história
        </p>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        ↓
      </div>
    </section>
  );
}
