import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // DESKTOP ANIMATION (> 768px)
    mm.add('(min-width: 768px)', () => {
      const tl = gsap.timeline();
      tl.from('.bg-title', { opacity: 0, y: 50, duration: 1.2, ease: 'power3.out' })
        .from('.hero-photo', { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.8')
        .from('.role-left, .role-right', { opacity: 0, y: 30, duration: 0.8, stagger: 0.2 }, '-=0.5');
    });

    // MOBILE ANIMATION (< 767px)
    mm.add('(max-width: 767px)', () => {
      gsap.from('.mobile-content', { opacity: 0, y: 20, duration: 1, ease: 'power2.out' });
      gsap.from('.hero-photo', { opacity: 0, scale: 0.9, duration: 1, ease: 'power2.out' });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen bg-[#0e0d0d] text-white flex flex-col justify-center md:justify-end items-center overflow-hidden pt-16 md:pt-24 pb-0 px-4 md:px-12"
    >
      {/* Background Typography */}
      <h1 className="bg-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bebas text-[25vw] leading-none tracking-tight text-[#d3bc9b] select-none pointer-events-none z-0 text-center w-full">
        PORTFOLIO
      </h1>

      {/* Hero Visual Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center h-full justify-center md:justify-end">

        {/* Person Photo:
            - Mobile: Position absolute center (vertikal & horizontal)
            - Desktop: Positioned at bottom center
        */}
        <div className="hero-photo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-auto md:bottom-0 md:translate-y-0 w-[240px] sm:w-[320px] md:w-[470px] xl:w-[550px] z-10 leading-none hidden md:block">
          <img
            src="/profile.png"
            alt="Erick Profile"
            className="w-full h-auto block object-cover  drop-shadow-[0_0_70px_rgba(0,0,0,0.8)] mx-auto"
          />
        </div>

        {/* --- DESKTOP LAYOUT (3-Column Editorial Grid) --- */}
        <div className="hidden md:flex justify-between items-end w-full absolute bottom-8 z-20 pointer-events-none">
          {/* Left Role */}
          <div className="role-left text-left max-w-xs pointer-events-auto">
            <h2 className="font-bebas text-3xl text-[#d3bc9b] tracking-wide mb-2">
              FULL STACK DEVELOPER
            </h2>
            <p className="font-montserrat text-xs text-stone-400 leading-relaxed">
              Building modern full-stack web applications with a reliable, efficient, and highly scalable system architecture.
            </p>
          </div>

          {/* Right Role */}
          <div className="role-right text-right max-w-xs pointer-events-auto">
            <h2 className="font-bebas text-3xl text-[#d3bc9b] tracking-wide mb-2">
              MOTION GRAPHIC DESIGNER
            </h2>
            <p className="font-montserrat text-xs text-stone-400 leading-relaxed">
              Designing dynamic UI animations and visual interactions to create a cinematic user experience.
            </p>
          </div>
        </div>

        {/* --- MOBILE LAYOUT (Stacked Vertical) --- */}
        <div className="mobile-content flex md:hidden flex-col justify-between items-center text-center h-full py-20 z-20 pointer-events-none">
          <div className="pointer-events-auto">
            <h2 className="font-bebas text-2xl text-[#d3bc9b] tracking-wide mb-1">
              FULL STACK DEVELOPER
            </h2>
            <p className="font-montserrat text-xs text-stone-400 leading-relaxed max-w-xs">
              Building modern full-stack web applications with a reliable, efficient, and highly scalable system architecture.
            </p>
          </div>

          <div className="pointer-events-auto">
            <h2 className="font-bebas text-2xl text-[#d3bc9b] tracking-wide mb-1">
              MOTION GRAPHIC DESIGNER
            </h2>
            <p className="font-montserrat text-xs text-stone-400 leading-relaxed max-w-xs">
              Designing dynamic UI animations and visual interactions to create a cinematic user experience.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}