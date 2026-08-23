import React, { useState } from "react";
import { Monitor, AlertTriangle, X } from "lucide-react";
import { Button } from "./ui/button";

export default function WelcomeModal() {
  // State default langsung 'true' agar modal selalu muncul tiap kali halaman di-refresh
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-[#0e0d0d] border border-[#d3bc9b]/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Tombol Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-[#d3bc9b] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Konten Modal */}
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-[#d3bc9b]/10 border border-[#d3bc9b]/30 rounded-full flex items-center justify-center mx-auto">
            <Monitor className="w-7 h-7 text-[#d3bc9b]" />
          </div>

          <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
            WELCOME TO MY PORTFOLIO
          </h3>

          {/* Badge Status */}
          <div className="inline-flex items-center space-x-2 bg-[#d3bc9b]/10 border border-[#d3bc9b]/30 px-3 py-1 rounded-full text-xs font-montserrat text-[#d3bc9b]">
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
            <span>Under Development</span>
          </div>

          {/* Pesan */}
          <p className="font-montserrat text-xs sm:text-sm text-stone-300 leading-relaxed pt-2">
            Website ini masih dalam tahap pengembangan aktif. Beberapa fitur dan animasi interaktif terus dioptimalkan.
          </p>

          {/* Rekomendasi Device */}
          <div className="bg-stone-900/80 border border-white/10 rounded-xl p-4 text-left space-y-1">
            <p className="font-montserrat text-xs font-semibold text-[#d3bc9b] uppercase tracking-wider">
              💡 Rekomendasi Perangkat
            </p>
            <p className="font-montserrat text-xs text-stone-400 leading-normal">
              Gunakan **PC / Laptop** untuk pengalaman visual, interaksi motion, dan tata letak yang paling maksimal.
            </p>
          </div>

          {/* Tombol Lanjutkan */}
          <Button
            onClick={handleClose}
            className="w-full bg-[#d3bc9b] hover:bg-[#b8a082] text-black font-montserrat text-xs font-bold py-3 uppercase tracking-widest transition-all duration-300 mt-4"
          >
            Lanjutkan Eksplorasi
          </Button>
        </div>
      </div>
    </div>
  );
}