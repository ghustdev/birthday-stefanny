"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    title: "Como nos Conhecemos ❤️",
    text: "Tudo começou de uma forma inesperada no IF. Um olhar, um sorriso, e o destino começou a traçar nossas linhas.",
    date: "O Início",
  },
  {
    title: "O Apaixonar ❤️",
    text: "Cada dia ao seu lado revelava uma nova cor no meu mundo. Seu riso se tornou minha música favorita.",
    date: "Crescendo",
  },
  {
    title: "Nossa Conexão ❤️",
    text: "Não é apenas amor, é cumplicidade. É saber o que você pensa apenas com um olhar. É sentir que encontramos nosso lar um no outro e que vamos viver juntos pra sempre!",
    date: "Hoje e Sempre",
  },
];

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Parallax Background Elements (Global)
      gsap.to(".floating-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        // Desktop: Full 3D Tilt
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(section, 
            { 
              rotationX: 45, 
              opacity: 0, 
              y: 100 
            },
            {
              rotationX: 0,
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 50%",
                scrub: 1,
              },
            }
          );
        });

        // Mobile: Simple Fade Up (No 3D)
        mm.add("(max-width: 767px)", () => {
          gsap.fromTo(section, 
            { 
              opacity: 0, 
              x: -30 
            },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
              },
            }
          );
        });

        // Text Reveal (Global)
        gsap.from(section.querySelectorAll(".animate-text"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-10 md:py-20 px-4 md:px-20 perspective-1000 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="floating-bg absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 bg-red-500/10 rounded-full blur-3xl" />
        <div className="floating-bg absolute top-1/2 right-10 w-48 h-48 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="floating-bg absolute bottom-10 left-1/3 w-24 h-24 md:w-48 md:h-48 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {chapters.map((chapter, index) => (
        <div
          key={index}
          ref={(el) => { sectionsRef.current[index] = el; }}
          className="relative z-10 min-h-[40vh] md:min-h-[80vh] flex flex-col justify-center items-start border-l-2 border-white/10 pl-6 md:pl-12 ml-2 md:ml-20 my-12 md:my-20 origin-left"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="animate-text text-accent text-xs md:text-base font-bold tracking-widest uppercase mb-2 md:mb-4">
            {chapter.date}
          </span>
          <h2 className="animate-text text-2xl md:text-6xl font-serif font-bold text-white mb-3 md:mb-6 transform translate-z-10 leading-tight">
            {chapter.title}
          </h2>
          <p className="animate-text text-sm md:text-xl text-white/70 max-w-2xl leading-relaxed transform translate-z-5">
            {chapter.text}
          </p>
        </div>
      ))}
    </section>
  );
}
