import React, { useRef } from 'react';
import gsap from 'gsap';
// import useGSAP from '@gsap/react';

// Sample Data Proyek
const projectData = [
  {
    id: 1,
    title: 'CODEGRAPH E-COMMERCE',
    category: 'FULL STACK WEB',
    description: 'A platform for buying and selling digital products with instant payment processing and interactive animations.',
    tags: ['Next.js', 'Tailwind', 'GSAP', 'Prisma'],
    image: '/codegraph1.png',
  },
  {
    id: 2,
    title: 'FLUTTER MOBILE APP',
    category: 'MOBILE DEVELOPMENT',
    description: 'A mobile app that makes it easy for student organizations on campus to create activity groups, add events, and send messages to all members—without having to manually coordinate class schedules.',
    tags: ['Flutter', 'Dart', 'REST API', 'Provider'],
    image: '/img3.png',
  },
  {
    id: 3,
    title: 'MOTION GRAPHIC SHOWCASE',
    category: 'MOTION DESIGN',
    description: 'Creating 2D animations and motion graphics using After Effects and Illustrator, with a focus on storytelling and visual impact.',
    tags: ['After Effects', 'Adobe Illustrator'],
    image: '/img3.png',
  },
  // {
  //   id: 4,
  //   title: 'ANOTHER PROJECT',
  //   category: 'WEB APP',
  //   description: 'Dashboard analitik real-time dengan visualisasi data interaktif.',
  //   tags: ['React', 'Chart.js', 'Node.js'],
  //   image: '/img2.png',
  // },
];

export default function CuratedProjects() {
  const scrollContainerRef = useRef(null);

  // Fungsi Navigasi Scroll Manual (Tombol Kiri & Kanan)
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420; // Jarak geser (lebar card + gap)
      const targetScroll = 
        direction === 'left' 
          ? scrollContainerRef.current.scrollLeft - scrollAmount 
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      gsap.to(scrollContainerRef.current, {
        scrollLeft: targetScroll,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0e0d0d] text-white py-24 px-4 md:px-12 flex flex-col justify-center overflow-hidden">
      
      {/* --- HEADER SECTION --- */}
      <div className="text-center mb-12">
        <h2 className="font-bebas text-5xl md:text-7xl text-[#d3bc9b] tracking-wider mb-2">
          CURATED PROJECTS
        </h2>
        <p className="font-montserrat text-xs md:text-sm text-stone-400 tracking-widest uppercase">
          A collection of selected works in full-stack development & motion design
        </p>
      </div>

      {/* --- CAROUSEL CONTAINER WITH NAVIGATION BUTTONS --- */}
      <div className="relative w-full max-w-7xl mx-auto group">
        
        {/* Tombol Scroll Kiri */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-30 bg-[#d3bc9b] text-black p-3 md:p-4 rounded-full shadow-2xl opacity-90 hover:opacity-100 hover:scale-110 transition-all focus:outline-none"
          aria-label="Scroll Left"
        >
          <svg className="w-5 h-5 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Tombol Scroll Kanan */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-30 bg-[#d3bc9b] text-black p-3 md:p-4 rounded-full shadow-2xl opacity-90 hover:opacity-100 hover:scale-110 transition-all focus:outline-none"
          aria-label="Scroll Right"
        >
          <svg className="w-5 h-5 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* --- HORIZONTAL SCROLL AREA --- */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth py-6 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projectData.map((project) => (
            <div
              key={project.id}
              className="flex-none w-[300px] sm:w-[360px] md:w-[400px] bg-stone-900/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col justify-between group/card hover:border-[#d3bc9b]/50 transition-all duration-300"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
                <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[#d3bc9b] font-montserrat text-[10px] tracking-wider px-3 py-1 rounded-full border border-[#d3bc9b]/30">
                  {project.category}
                </span>
              </div>

              {/* Card Body Information */}
              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <h3 className="font-bebas text-2xl text-[#d3bc9b] tracking-wide mb-2 group-hover/card:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-montserrat text-xs text-stone-400 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md border border-white/10 text-stone-300 font-montserrat text-[10px] bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}