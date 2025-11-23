"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = ["❤️", "🌸", "🌹", "✨", "💖"];
    const elementCount = 15;

    for (let i = 0; i < elementCount; i++) {
      const el = document.createElement("div");
      el.textContent = elements[Math.floor(Math.random() * elements.length)];
      el.classList.add("absolute", "text-2xl", "pointer-events-none", "opacity-50", "select-none");
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      container.appendChild(el);

      gsap.to(el, {
        y: "-=100vh",
        x: `+=${(Math.random() - 0.5) * 200}`,
        rotation: 360,
        duration: 10 + Math.random() * 20,
        repeat: -1,
        ease: "none",
        delay: Math.random() * -20,
      });
    }
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
