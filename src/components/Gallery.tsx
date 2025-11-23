"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { id: 1, src: "/20251016_202129.jpg", caption: "Nós" },
  { id: 2, src: "/IMG-20251021-WA0096.jpg", caption: "Momentos" },
  { id: 3, src: "/IMG-20251021-WA0129.jpg", caption: "Sorrisos" },
  { id: 4, src: "/IMG-20251021-WA0134.jpg", caption: "Alegria" },
  { id: 5, src: "/IMG-20251021-WA0207.jpg", caption: "Amor" },
  { id: 6, src: "/IMG-20251021-WA0144.jpg", caption: "Cumplicidade" },
  { id: 7, src: "/IMG-20251021-WA0218.jpg", caption: "Carinho" },
  { id: 8, src: "/IMG-20251021-WA0255.jpg", caption: "Eternidade" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const trigger = triggerRef.current;

      if (!section || !trigger) return;

      const mm = gsap.matchMedia();

      // Desktop: Horizontal Pin
      mm.add("(min-width: 768px)", () => {
        const totalWidth = section.scrollWidth - window.innerWidth;

        gsap.to(section, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      });

      // Mobile: Vertical Fade In
      mm.add("(max-width: 767px)", () => {
        const cards = section.querySelectorAll(".gallery-card");
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          });
        });
      });

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="bg-[#050505] overflow-hidden">
      <div 
        ref={sectionRef} 
        className="flex flex-col md:flex-row h-auto md:h-screen w-full md:w-fit items-center px-4 md:px-20 gap-10 md:gap-20 py-20 md:py-0"
      >
        <div className="flex-shrink-0 w-full md:w-[30vw] flex flex-col justify-center text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-4">
            Momentos <br /> <span className="text-accent">Eternos</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            Cada foto guarda um pedaço da nossa alma.
          </p>
        </div>

        {photos.map((photo) => (
          <div
            key={photo.id}
            className="gallery-card relative flex-shrink-0 w-full md:w-[40vw] aspect-[4/5] md:h-[70vh] md:aspect-auto rounded-2xl overflow-hidden group"
          >
            <img 
              src={photo.src} 
              alt={photo.caption} 
              className="w-full h-full object-cover opacity-90 md:opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 flex items-end md:items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-black/20 md:group-hover:bg-transparent transition-colors duration-500 p-6 md:p-0">
              <span className="text-white text-2xl md:text-3xl font-bold opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-10 md:group-hover:translate-y-0 transition-all duration-500">
                {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
