"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

export default function Message() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Helper to extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const VIDEO_URL = "https://www.youtube.com/watch?v=6lYA19_K2-w"; // Change this link to your video
  const videoId = getYouTubeId(VIDEO_URL);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    setShowConfetti(true);
    gsap.to(buttonRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setShowVideo(true);
      },
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {showConfetti && <Confetti />}
      
      <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
        Para a morena mais <br /> <span className="text-accent">linda do mundo</span>
      </h2>
      
      <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed">
        Que seu dia seja tão incrível quanto você é para mim. Te amo infinitamente.
      </p>

      <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
        ❤️ Feliz aniversário  <br /> <span className="text-accent">meu amor ❤️</span>
      </h2>

      <button
        ref={buttonRef}
        onClick={handleClick}
        className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold tracking-widest uppercase overflow-hidden hover:bg-white/20 transition-all duration-300"
      >
        <span className="relative z-10">Meu Presente</span>
        <div className="absolute inset-0 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </button>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-4">
          <button 
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-accent transition-colors z-50 bg-black/40 backdrop-blur-sm rounded-full p-3"
          >
            <X size={28} />
          </button>
          <div className="w-full max-w-md md:max-w-5xl aspect-[9/16] md:aspect-video max-h-[85vh] md:max-h-none rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center bg-black">
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation"
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="text-white text-xl">Vídeo indisponível</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Confetti() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ["#E63946", "#F5F5F5", "#FFD700", "#FF69B4"];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("absolute", "w-2", "h-2", "rounded-full");
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);

      gsap.fromTo(
        particle,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: Math.random() * 1.5,
        },
        {
          x: (Math.random() - 0.5) * 500,
          y: (Math.random() - 0.5) * 500,
          opacity: 0,
          duration: 1 + Math.random() * 2,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" />;
}
