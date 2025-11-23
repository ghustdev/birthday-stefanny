"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heartbeat animation
      gsap.to(heartRef.current, {
        scale: 1.2,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    if (!containerRef.current || !heartRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      },
    });

    // Stop heartbeat
    gsap.killTweensOf(heartRef.current);

    // Zoom in effect
    tl.to(heartRef.current, {
      scale: 50,
      duration: 1.5,
      ease: "power4.in",
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
    }, "-=0.5");
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black cursor-pointer"
      onClick={handleEnter}
    >
      <div className="absolute bottom-10 text-white/50 animate-pulse text-sm tracking-widest">
        CLIQUE PARA DESCOBRIR O MEU AMOR
      </div>
      <div
        ref={heartRef}
        className="relative w-24 h-24 md:w-32 md:h-32"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full text-[#E63946] drop-shadow-[0_0_15px_rgba(230,57,70,0.8)]"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
}
