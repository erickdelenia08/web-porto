import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  ArrowUp,
  Mail,
  Github,
  Linkedin,
  Palette,
  Code,
} from "lucide-react";
import { personalInfo, socialLinks } from "../data/mock";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const iconMap = {
    Mail,
    Github,
    Linkedin,
    Palette,
  };

  return (
    <footer className="bg-[#0e0d0d] text-white border-t border-white/10 relative">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#d3bc9b]/10 border border-[#d3bc9b]/30 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-[#d3bc9b]" />
              </div>
              <h3 className="font-bebas text-2xl tracking-wide text-white">
                {personalInfo.name}
              </h3>
            </div>
            
            <p className="font-montserrat text-xs text-stone-400 leading-relaxed">
              {personalInfo.title}. Crafting high-performance web applications and captivating motion graphics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bebas text-xl tracking-wide text-[#d3bc9b]">
              QUICK LINKS
            </h4>
            <nav className="space-y-2.5 font-montserrat text-xs">
              {[
                { label: "About", href: "#about" },
                { label: "Projects", href: "#projects" },
                { label: "Skills", href: "#skills" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    const element = document.querySelector(link.href);
                    if (element) {
                      const offsetTop = element.offsetTop - 80;
                      window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="block text-stone-400 hover:text-[#d3bc9b] transition-colors duration-200 text-left uppercase tracking-wider"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-bebas text-xl tracking-wide text-[#d3bc9b]">
              CONNECT
            </h4>
            
            <div className="space-y-3 font-montserrat text-xs">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#d3bc9b]" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-stone-400 hover:text-[#d3bc9b] transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-stone-400">
                  Available for new projects
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2 pt-2">
              {socialLinks.map((link, index) => {
                const IconComponent = iconMap[link.icon] || Mail;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(link.url, "_blank")}
                    className="p-2 text-stone-400 hover:text-[#d3bc9b] hover:bg-[#d3bc9b]/10 transition-all duration-200 border border-transparent hover:border-[#d3bc9b]/30 rounded-lg"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="sr-only">{link.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Copyright */}
          <div className="font-montserrat text-xs text-stone-500">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </div>

          {/* Back to Top */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="font-montserrat text-xs font-semibold text-stone-400 hover:text-[#d3bc9b] hover:bg-[#d3bc9b]/10 transition-all duration-200 uppercase tracking-wider group"
          >
            <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform duration-200 text-[#d3bc9b]" />
            Back to Top
          </Button>
        </div>
      </div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d3bc9b]/40 to-transparent" />
    </footer>
  );
};

export default Footer;