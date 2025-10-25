import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Download, ArrowDown, Code, Database, Palette } from "lucide-react";
import { personalInfo } from "../../data/mock";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const downloadCV = () => {
    // Mock CV download
    alert("not avaliable yet :)");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-[#00b4d8]/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.05}%`,
            top: `${10 + mousePosition.y * 0.05}%`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-[#0077b6]/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: `${15 + mousePosition.x * 0.03}%`,
            bottom: `${20 + mousePosition.y * 0.03}%`,
          }}
        />
        
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 opacity-20 animate-float">
          <Code className="w-8 h-8 text-[#00b4d8]" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-20 animate-float-delayed">
          <Database className="w-8 h-8 text-[#0077b6]" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 opacity-20 animate-float">
          <Palette className="w-8 h-8 text-[#00b4d8]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#00b4d8]/10 text-[#0077b6] border border-[#00b4d8]/20 mb-6">
              👋 Hi, I'm {personalInfo.name}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="block">Coder &</span>
            <span className="bg-gradient-to-r from-[#00b4d8] to-[#0077b6] bg-clip-text text-transparent">
              Motion Graphic Designer
            </span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {personalInfo.tagline}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Button
              onClick={scrollToProjects}
              className="bg-[#00b4d8] hover:bg-[#0077b6] text-white px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={downloadCV}
              className="border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Scroll to explore
            </span>
            <ArrowDown className="w-4 h-4 text-[#00b4d8]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(10px);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;