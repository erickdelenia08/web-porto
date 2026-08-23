import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  Code2, Globe, Database, Atom, Video, Figma, Zap, Sparkles 
} from "lucide-react";

// Local Skills Data (Self-contained & Relevant)
const skillsData = {
  development: [
    { name: "JavaScript / TypeScript", level: 90, icon: "Code2" },
    { name: "React.js / Next.js", level: 92, icon: "Atom" },
    { name: "Tailwind CSS", level: 95, icon: "Globe" },
    { name: "Node.js & Express", level: 85, icon: "Code2" },
    { name: "PostgreSQL & Prisma", level: 80, icon: "Database" },
  ],
  motion: [
    { name: "GSAP / ScrollTrigger", level: 88, icon: "Zap" },
    { name: "Figma (UI/UX)", level: 85, icon: "Figma" },
    { name: "After Effects", level: 82, icon: "Video" },
    { name: "Lottie Animation", level: 80, icon: "Sparkles" },
  ]
};

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});
  const sectionRef = useRef(null);

  const iconMap = {
    Code2, Globe, Database, Atom, Video, Figma, Zap, Sparkles
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            Object.keys(skillsData).forEach(category => {
              skillsData[category].forEach(skill => {
                setTimeout(() => {
                  setAnimatedSkills(prev => ({
                    ...prev,
                    [skill.name]: skill.level
                  }));
                }, Math.random() * 800);
              });
            });
          }, 300);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const renderSkillCard = (skill, index) => {
    const IconComponent = iconMap[skill.icon] || Code2;
    const animatedLevel = animatedSkills[skill.name] || 0;
    
    return (
      <Card
        key={skill.name}
        className={`group transition-all duration-500 bg-stone-900/60 border border-white/10 hover:border-[#d3bc9b]/50 backdrop-blur-md transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-[#d3bc9b]/10 rounded-lg group-hover:bg-[#d3bc9b]/20 transition-colors duration-300">
                <IconComponent className="w-5 h-5 text-[#d3bc9b]" />
              </div>
              <h4 className="font-montserrat text-sm font-semibold text-white group-hover:text-[#d3bc9b] transition-colors duration-300">
                {skill.name}
              </h4>
            </div>
            <Badge
              variant="secondary"
              className="bg-[#d3bc9b]/10 text-[#d3bc9b] border border-[#d3bc9b]/30 font-montserrat text-xs"
            >
              {skill.level}%
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-montserrat">
              <span className="text-stone-400">Proficiency</span>
              <span className="text-[#d3bc9b] font-medium">{animatedLevel}%</span>
            </div>
            <Progress 
              value={animatedLevel} 
              className="h-1.5 bg-stone-800"
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0e0d0d] text-white min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl sm:text-7xl text-[#d3bc9b] tracking-wide mb-2">
              SKILLS & EXPERTISE
            </h2>
            <p className="font-montserrat text-xs sm:text-sm text-stone-400 uppercase tracking-widest max-w-xl mx-auto">
              A curated stack for modern web development & interactive motion graphics
            </p>
          </div>

          {/* Skills Tabs */}
          <Tabs defaultValue="development" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-stone-900 border border-white/10 p-1 mb-12 rounded-xl">
              <TabsTrigger 
                value="development" 
                className="font-montserrat text-xs font-bold data-[state=active]:bg-[#d3bc9b] data-[state=active]:text-black transition-all rounded-lg"
              >
                WEB DEVELOPMENT
              </TabsTrigger>
              <TabsTrigger 
                value="motion" 
                className="font-montserrat text-xs font-bold data-[state=active]:bg-[#d3bc9b] data-[state=active]:text-black transition-all rounded-lg"
              >
                MOTION & DESIGN
              </TabsTrigger>
            </TabsList>

            <TabsContent value="development">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsData.development.map((skill, index) => 
                  renderSkillCard(skill, index)
                )}
              </div>
            </TabsContent>

            <TabsContent value="motion">
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {skillsData.motion.map((skill, index) => 
                  renderSkillCard(skill, index)
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Skills Summary Cards (Dua Pilar Utama) */}
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 bg-stone-900/40 border border-white/10 backdrop-blur-md">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-[#d3bc9b]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#d3bc9b]/20">
                  <Code2 className="w-6 h-6 text-[#d3bc9b]" />
                </div>
                <h3 className="font-bebas text-2xl text-white tracking-wide mb-2">
                  FULL-STACK ARCHITECTURE
                </h3>
                <p className="font-montserrat text-xs text-stone-400 leading-relaxed">
                  Fokus pada pembuatan web modern yang skalabel, integrasi database, arsitektur RESTful API, dan optimasi performa *front-end*.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-stone-900/40 border border-white/10 backdrop-blur-md">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-[#d3bc9b]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#d3bc9b]/20">
                  <Zap className="w-6 h-6 text-[#d3bc9b]" />
                </div>
                <h3 className="font-bebas text-2xl text-white tracking-wide mb-2">
                  MOTION & INTERACTION
                </h3>
                <p className="font-montserrat text-xs text-stone-400 leading-relaxed">
                  Menghidupkan tampilan web statis melalui animasi interaktif GSAP, *scroll-driven interaction*, dan elemen visual yang sinematik.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}