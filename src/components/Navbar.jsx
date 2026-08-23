import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['HOME', 'ABOUT', 'PROJECT', 'SKILLS', 'CONTACT'];

  // Handle Scroll Direction (Show/Hide Navbar)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Sembunyikan navbar jika scroll ke bawah, tampilkan jika scroll ke atas
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsScrolled(true); // Hide
      } else {
        setIsScrolled(false); // Show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Header Container (Auto Hide on Scroll Down) */}
      <header
        className={`fixed left-0 w-full z-50 flex justify-center px-4 transition-transform duration-300 ease-in-out ${isScrolled ? '-translate-y-[150%]' : 'translate-y-6'
          }`}
      >
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 px-10 py-3 bg-[#a88a64] rounded-full shadow-lg">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleScrollTo(e, item.toLowerCase())}
              className="font-montserrat text-sm font-bold tracking-wider text-black hover:opacity-75 transition-opacity"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Icon (Visible only on small screens) */}
        <div className="flex md:hidden w-full justify-end">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
            className="p-3 bg-[#a88a64] text-black rounded-full shadow-lg focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* --- MOBILE FULLSCREEN MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-[#0e0d0d] z-[60] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-[#a88a64] p-2 focus:outline-none"
          aria-label="Close Menu"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Mobile Nav Links */}
        <nav className="flex flex-col gap-8 text-center">
          {navItems.map((item, index) => (
            <Link
              key={item}
              to={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-bebas text-5xl tracking-widest text-[#a88a64] hover:text-white transition-colors"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: 'all 0.4s ease-out',
              }}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}