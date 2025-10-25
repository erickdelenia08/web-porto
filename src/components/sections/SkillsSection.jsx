import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  Code2, Code, Smartphone, Coffee, Globe, Database,
  Atom, Server, Brain, BarChart3, TrendingUp, Video,
  Figma, Image, Box, Boxes, Zap
} from "lucide-react";
import { skills } from "../../data/mock";

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});
  const sectionRef = useRef(null);

  const iconMap = {
    Code2, Code, Smartphone, Coffee, Globe, Database,
    Atom, Server, Brain, BarChart3, TrendingUp, Video,
    Figma, Image, Box, Boxes, Zap
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars with delay
          setTimeout(() => {
            const skillsToAnimate = {};
            Object.keys(skills).forEach(category => {
              skills[category].forEach(skill => {
                setTimeout(() => {
                  setAnimatedSkills(prev => ({
                    ...prev,
                    [skill.name]: skill.level
                  }));
                }, Math.random() * 1000);
              });
            });
          }, 500);
        }
      },
      { threshold: 0.3 }
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

  const renderSkillCard = (skill, index, category) => {
    const IconComponent = iconMap[skill.icon] || Code;
    const animatedLevel = animatedSkills[skill.name] || 0;
    
    return (
      <Card
        key={skill.name}
        className={`group hover:shadow-lg transition-all duration-500 bg-white dark:bg-slate-800 border-0 shadow-sm hover:-translate-y-1 transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-[#00b4d8]/10 to-[#0077b6]/10 rounded-lg group-hover:from-[#00b4d8]/20 group-hover:to-[#0077b6]/20 transition-colors duration-300">
                <IconComponent className="w-5 h-5 text-[#00b4d8]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#00b4d8] transition-colors duration-300">
                  {skill.name}
                </h4>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-[#00b4d8]/10 text-[#0077b6] border-[#00b4d8]/20"
            >
              {skill.level}%
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
              <span className="text-[#00b4d8] font-medium">{animatedLevel}%</span>
            </div>
            <Progress 
              value={animatedLevel} 
              className="h-2 bg-gray-200 dark:bg-slate-600"
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and creative tools
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] mx-auto rounded-full" />
          </div>

          {/* Skills Tabs */}
          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-100 dark:bg-slate-700 mb-12">
              <TabsTrigger 
                value="programming" 
                className="data-[state=active]:bg-[#00b4d8] data-[state=active]:text-white"
              >
                Programming
              </TabsTrigger>
              <TabsTrigger 
                value="frameworks" 
                className="data-[state=active]:bg-[#00b4d8] data-[state=active]:text-white"
              >
                Frameworks
              </TabsTrigger>
              <TabsTrigger 
                value="creative" 
                className="data-[state=active]:bg-[#00b4d8] data-[state=active]:text-white"
              >
                Creative Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="programming">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.programming.map((skill, index) => 
                  renderSkillCard(skill, index, 'programming')
                )}
              </div>
            </TabsContent>

            <TabsContent value="frameworks">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.frameworks.map((skill, index) => 
                  renderSkillCard(skill, index, 'frameworks')
                )}
              </div>
            </TabsContent>

            <TabsContent value="creative">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.creative.map((skill, index) => 
                  renderSkillCard(skill, index, 'creative')
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Skills Summary */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gradient-to-br from-[#00b4d8]/5 to-[#0077b6]/5 border-[#00b4d8]/20">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#00b4d8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code2 className="w-8 h-8 text-[#00b4d8]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Backend Development
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Python, Node.js, APIs, Database Design
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-[#0077b6]/5 to-[#00b4d8]/5 border-[#0077b6]/20">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#0077b6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-[#0077b6]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Data Science & AI
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Machine Learning, Deep Learning, Analytics
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-[#00b4d8]/5 to-[#0077b6]/5 border-[#00b4d8]/20">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#00b4d8]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-[#00b4d8]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Creative Technology
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Motion Graphics, UI/UX Design, Visualization
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;