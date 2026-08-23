import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register Plugin GSAP
gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProject() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const techStack = ['Next.js', 'SQL', 'Tailwind', 'GSAP', 'Prisma'];

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Animasi berlaku khusus Desktop (> 768px)
    mm.add('(min-width: 768px)', () => {
      // 1. Animasi Teks "FEATURED PROJECT" (Besar di tengah -> Mengecil ke posisi kiri)
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',   // Mulai animasi saat section terlihat di layar
          end: 'top 20%',     // Animasi selesai saat section naik ke atas
          scrub: 1,           // Animasi mengikuti pergerakan scroll (smooth)
        },
        x: '30vw',            // Posisi awal di tengah horizontal
        y: '20vh',            // Posisi awal agak ke bawah
        scale: 1.8,           // Ukuran awal 1.8x lebih besar
        transformOrigin: 'left top',
        ease: 'power2.out',
      });

      // 2. Animasi Fade In Konten & Gambar
      gsap.from('.project-content, .project-gallery', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      id="project"
      ref={containerRef}
      className="relative min-h-screen bg-[#0e0d0d] text-white py-24 px-6 md:px-16 flex items-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* --- KOLOM KIRI: INFO PROYEK --- */}
        <div className="md:col-span-6 flex flex-col justify-center z-10">

          {/* Title Animasi GSAP */}
          <h2
            ref={titleRef}
            className="font-bebas text-5xl sm:text-6xl md:text-7xl text-[#d3bc9b] tracking-wide leading-none mb-4 inline-block origin-left"
          >
            FEATURED PROJECT
          </h2>

          <div className="project-content space-y-4">
            <h3 className="font-bebas text-2xl sm:text-3xl text-[#d3bc9b]/80 tracking-wider">
              CODEGRAPH - ECOMMERCE
            </h3>

            <p className="font-montserrat text-xs sm:text-sm text-stone-400 leading-relaxed max-w-lg">
              A digital store platform that offers
              a wide variety of digital products with
              payment methods commonly used in Indonesia. Designed
              to be interactive and secure, while prioritizing
              high web performance.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-4">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 rounded-full border border-[#d3bc9b]/40 text-[#d3bc9b] font-montserrat text-xs font-medium bg-[#d3bc9b]/5 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN: GALERI / SHOWCASE (1 Besar + 2 Kecil) --- */}
        <div className="project-gallery md:col-span-6 flex flex-col gap-4 z-10">

          {/* Gambar Utama (Besar) + Icon GitHub */}
          <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900">
            <img
              src="/codegraph1.png"
              alt="Codegraph Main Preview"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* GitHub Link Overlay Button */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-black p-2.5 rounded-full shadow-lg transition-transform hover:scale-110"
              aria-label="View Github Repository"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Grid 2 Gambar Kecil */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-stone-900 group">
              <img
                src="/codegraph2.png"
                alt="Codegraph Preview 2"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-stone-900 group">
              <img
                src="/codegraph3.png"
                alt="Codegraph Preview 3"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}