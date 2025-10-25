import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ExternalLink, Github, Star, Filter } from "lucide-react";
import { projects } from "../../data/mock";

const ProjectsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "featured") return project.featured;
    return project.tags.some(tag => tag.toLowerCase().includes(filter));
  });

  const filterOptions = [
    { value: "all", label: "All Projects" },
    // { value: "featured", label: "Featured" },
    // { value: "react", label: "React" },
    { value: "apps", label: "Apps" },
    { value: "data", label: "Data" },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800"
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
              IT Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              My collection of works related to IT
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] mx-auto rounded-full" />
          </div>

          {/* Filter Tabs */}
          <Tabs value={filter} onValueChange={setFilter} className="mb-12">
            <TabsList className="flex w-full max-w-xl mx-auto bg-white dark:bg-slate-700">
              {filterOptions.map((option) => (
                <TabsTrigger
                  key={option.value}
                  value={option.value}
                  className="flex-1 text-sm data-[state=active]:bg-[#00b4d8] data-[state=active]:text-white"
                >
                  {option.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-white dark:bg-slate-900 border-0 shadow-md overflow-hidden transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}>
                    <div className="absolute bottom-4 left-4 right-4 flex space-x-2">
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white text-gray-900"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          className="bg-[#00b4d8] hover:bg-[#0077b6] text-white"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#00b4d8] text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#00b4d8] transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs bg-[#00b4d8]/10 text-[#0077b6] border-[#00b4d8]/20 hover:bg-[#00b4d8]/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#00b4d8] hover:bg-[#0077b6] text-white"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More Projects */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white px-8 py-3"
              onClick={() => window.open('https://github.com/erickdelenia08', '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              View All Projects on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;