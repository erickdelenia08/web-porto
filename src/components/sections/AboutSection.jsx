import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from '@gsap/react';
import Character from "../character/Character";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Memakai matchMedia untuk memisahkan logika Desktop dan Mobile
    let mm = gsap.matchMedia();

    // DESKTOP: (min-width: 768px) -> Jalankan Animasi Scroll Horizontal
    mm.add("(min-width: 768px)", () => {
      const panels = gsap.utils.toArray("#about > div");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${sectionRef.current.offsetWidth * (panels.length - 1)}`,
          invalidateOnRefresh: true,
        }
      });

      tl.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none"
      }, 0);

      // PANEL 1: Typing Text
      tl.to(".text-about", {
        text: "CREATIVE DEVELOPER & DESIGNER",
        duration: 0.1,
      }, 0);

      // PANEL 2: Cards Animation
      tl.from(".card-pendidikan", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.2,
      }, "<");

      // PANEL 3: Line Growth
      tl.from(".roadmap-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
      }, 0.1);

      tl.to(".char-parallax", {
        xPercent: 20,
        ease: "none"
      }, "<+=-0.8");
    });

    // MOBILE: (max-width: 767px) -> Cukup set teks default tanpa animasi scrub
    mm.add("(max-width: 767px)", () => {
      gsap.set(".text-about", { text: "CREATIVE DEVELOPER & DESIGNER" });
    });

    return () => mm.revert(); // Cleanup saat unmount
  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#0e0d0d] text-white h-screen w-full flex flex-nowrap overflow-hidden"
    >
      {/* PANEL 1: INTRO & CHARACTER (Aktif di Mobile & Desktop) */}
      <div className="w-screen shrink-0 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-6 md:px-24 py-12 md:py-0 gap-6">
        <div className="flex-1 space-y-3 md:space-y-4 text-center md:text-left">
          <span className="font-montserrat text-xs text-[#d3bc9b] tracking-widest uppercase">
            // ABOUT ME
          </span>
          <h1 className="font-bebas text-5xl sm:text-6xl md:text-8xl text-white leading-none">
            ERICK <br />
            <span className="text-[#d3bc9b] text-about">...</span>
          </h1>
          <p className="font-montserrat text-xs md:text-sm text-stone-400 max-w-md leading-relaxed mx-auto md:mx-0">
            We focus on creating digital solutions that combine efficient *full-stack* code architecture with impressive *motion graphics* animations.
          </p>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Character className="max-h-[250px] sm:max-h-[350px] md:max-h-[500px] character" />
        </div>
      </div>

      {/* PANEL 2: EDUCATION & EXPERIENCE (Disembunyikan di Mobile) */}
      <div className="panel hidden md:flex w-screen shrink-0 flex-col justify-center items-center px-12 md:px-24">
        <h2 className="font-bebas text-5xl md:text-6xl text-[#d3bc9b] tracking-wide mb-8">
          EDUCATION
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="card-pendidikan bg-stone-900/80 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <span className="text-[#d3bc9b] font-montserrat text-xs">2019 - 2023</span>
            <h3 className="font-bebas text-2xl text-white mt-1">Universitas Jember</h3>
            <p className="font-montserrat text-xs text-stone-400 mt-2">
              S1 Matematika.
            </p>
          </div>
          
          <div className="card-pendidikan bg-stone-900/80 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <span className="text-[#d3bc9b] font-montserrat text-xs">2023 - 2025</span>
            <h3 className="font-bebas text-2xl text-white mt-1">ITS Surabaya</h3>
            <p className="font-montserrat text-xs text-stone-400 mt-2">
              S2 Teknik Informatika.
            </p>
          </div>

          <div className="card-pendidikan bg-stone-900/80 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
            <span className="text-[#d3bc9b] font-montserrat text-xs">2026</span>
            <h3 className="font-bebas text-2xl text-white mt-1">Koding Akademi</h3>
            <p className="font-montserrat text-xs text-stone-400 mt-2">
              Full Stack Web Developer - Bootcamp.
            </p>
          </div>
        </div>
      </div>

      {/* PANEL 3: ROADMAP BELAJAR (Disembunyikan di Mobile) */}
      <div className="panel hidden md:flex w-screen shrink-0 flex-col justify-center items-center px-12 md:px-24">
        <h2 className="font-bebas text-5xl md:text-6xl text-[#d3bc9b] tracking-wide mb-12">
          SKILL GROWTH ROADMAP
        </h2>
        
        <div className="w-full max-w-3xl relative py-8">
          <div className="w-full h-1 bg-stone-800 absolute top-1/2 left-0 -translate-y-1/2"></div>
          <div className="roadmap-line absolute top-1/2 left-0 -translate-y-1/2 h-1 w-full bg-[#d3bc9b]"></div>

          <div className="relative z-10 flex justify-between items-center w-full">
            {[
              { step: "01", title: "Frontend Core", desc: "HTML, CSS, JS, Tailwind" },
              { step: "02", title: "Full-Stack Dev", desc: "React, Next.js, Prisma" },
              { step: "03", title: "Motion & UI", desc: "GSAP, After Effects" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center max-w-[150px]">
                <div className="w-10 h-10 rounded-full bg-[#0e0d0d] border-2 border-[#d3bc9b] text-[#d3bc9b] font-bebas text-lg flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h4 className="font-bebas text-xl text-white">{item.title}</h4>
                <p className="font-montserrat text-[10px] text-stone-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PANEL 4: OUTRO (Disembunyikan di Mobile) */}
      <div className="hidden md:flex w-screen shrink-0 flex-col justify-center items-center px-12">
        <h1 className="font-bebas text-6xl md:text-8xl text-stone-700 text-center char-parallax">
          KEEP SCROLLING <br />
          <span className="text-[#d3bc9b]">TO EXPLORE PROJECTS</span>
        </h1>
      </div>
    </section>
  );
};

export default AboutSection;