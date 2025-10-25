import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  ArrowUp,
  Mail,
  Github,
  Linkedin,
  Palette,
  Heart,
  Code,
  Coffee,
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
    <footer className="bg-gray-900 dark:bg-slate-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">{personalInfo.name}</h3>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              {personalInfo.title} Passionate in IT and creativity, crafting innovative digital experiences.
            </p>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Coffee className="w-4 h-4" />
              <span className="text-sm">Fueled by coffee and curiosity</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "IT Projects", href: "#projects" },
                { label: "Motion Graphics", href: "#motion-graphics" },
                { label: "Skills", href: "#skills" },
                { label: "Blog", href: "#blog" },
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
                  className="block text-gray-400 hover:text-[#00b4d8] transition-colors duration-200 text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#00b4d8]" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-400 hover:text-[#00b4d8] transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-gray-400 text-sm">
                  Available for new projects
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((link, index) => {
                const IconComponent = iconMap[link.icon] || Mail;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(link.url, "_blank")}
                    className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-[#00b4d8]/10 transition-all duration-200"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="sr-only">{link.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Separator className="border-gray-800" />

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>© {currentYear} {personalInfo.name}.</span>
            <span>All rights reserved.</span>
          </div>

          {/* Back to Top */}
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-gray-400 hover:text-[#00b4d8] hover:bg-[#00b4d8]/10 transition-all duration-200 group"
          >
            <ArrowUp className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform duration-200" />
            Back to Top
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00b4d8] via-[#0077b6] to-[#00b4d8]" />
    </footer>
  );
};

export default Footer;