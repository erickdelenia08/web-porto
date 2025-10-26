import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { MapPin, Calendar, GraduationCap } from "lucide-react";
import { aboutData, personalInfo } from "../../data/mock";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transform transition-all duration-1000 ${isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
            }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image and Info */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
                }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] rounded-2xl transform rotate-6 scale-105 opacity-20" />
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-[#00b4d8]/20">
                        <img
                          src={personalInfo.profileImage}
                          alt={personalInfo.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#00b4d8] rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {personalInfo.name}
                    </h3>

                    <p className="text-[#00b4d8] font-semibold mb-4">
                      {personalInfo.title}
                    </p>

                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                      <MapPin className="w-4 h-4 mr-2" />
                      {personalInfo.location}
                    </div>

                    <div className="space-y-3 w-full">
                      {aboutData.education.map((edu, index) => (
                        <div
                          key={index}
                          className="text-left p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                        >
                          <div className="flex items-center mb-1">
                            <Calendar className="w-3 h-3 mr-2 text-[#00b4d8]" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {edu.year}
                            </span>
                          </div>
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                            {edu.degree}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {edu.institution}
                          </p>
                          <Badge
                            variant="secondary"
                            className="mt-1 text-xs bg-[#00b4d8]/10 text-[#0077b6] border-[#00b4d8]/20"
                          >
                            {edu.focus}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className={`transform transition-all duration-1000 delay-500 ${isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
                }`}
            >
              <div className="space-y-6">
                <div className="prose prose-lg dark:prose-invert max-w-none text-justify">
                  {aboutData.description.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key Stats or Highlights */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <Card className="text-center p-6 bg-gradient-to-br from-[#00b4d8]/5 to-[#0077b6]/5 border-[#00b4d8]/20">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-[#00b4d8] mb-2">4+</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Years of Experience
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center p-6 bg-gradient-to-br from-[#0077b6]/5 to-[#00b4d8]/5 border-[#0077b6]/20">
                    <CardContent className="p-0">
                      <div className="text-2xl font-bold text-[#0077b6] mb-2">20+</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Projects Completed
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Mission Statement */}
                <Card className="bg-gradient-to-r from-[#00b4d8]/10 to-[#0077b6]/10 border-l-4 border-l-[#00b4d8] mt-8">
                  <CardContent className="p-6">
                    <blockquote className="text-gray-700 dark:text-gray-300 italic">
                      "I believe that technology and creativity move best together. Every line of code and every frame of motion is a chance to tell a story — where logic shapes movement, and design brings it to life."
                    </blockquote>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;