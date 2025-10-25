import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { supabase } from "../../lib/supabaseClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Play,
  Pause,
  ExternalLink,
  Clock,
  Calendar,
  Video,
  Palette,
  Filter,
  Maximize2
} from "lucide-react";
// import { motionGraphicsProjects } from "../../data/mock";

const MotionGraphicsSection = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);


  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("motion_graphics_projects")
          .select("*");
        if (error) throw error;

        // Dapatkan URL publik untuk video & thumbnail
        const projectsWithUrls = await Promise.all(
          data.map(async (project) => {
            const { data: thumbData } = supabase.storage
              .from("images")
              .getPublicUrl(project.thumbnail_path);
            const { data: videoData } = supabase.storage
              .from("videos")
              .getPublicUrl(project.video_path);

            return {
              ...project,
              thumbnail_url: thumbData.publicUrl,
              video_url: videoData.publicUrl,
              tools: project.tools // kalau tools disimpan string
            };
          })
        );

        setProjects(projectsWithUrls);
        console.log(projectsWithUrls);

      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

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

  const handleMouseEnter = (projectId) => {
    setHoveredProject(projectId);
    const video = videoRefs.current[projectId];
    if (video) {
      video.muted = true;
      video.currentTime = 0;
      video.play().catch(console.error);
    }
  };

  const handleMouseLeave = (projectId) => {
    setHoveredProject(null);
    const video = videoRefs.current[projectId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter(project => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "goverment", label: "Goverment" },
    { value: "others", label: "Others" },
  ];

  return (
    <section
      id="motion-graphics"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#00b4d8]/10 to-[#0077b6]/10 border border-[#00b4d8]/20 mb-6">
              <Video className="w-5 h-5 text-[#00b4d8] mr-2" />
              <span className="text-[#0077b6] font-medium">Motion Graphics Portfolio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Visual Storytelling Through Motion
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Bringing ideas to life through motion and interactivity — blending design, animation, and code to create visuals that move with purpose.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] mx-auto rounded-full" />
          </div>

          {/* Filter Tabs */}
          <Tabs value={filter} onValueChange={setFilter} className="mb-12">
            <TabsList className="flex w-full max-w-xl mx-auto bg-gray-100 dark:bg-slate-700">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="flex-1 text-xs sm:text-sm data-[state=active]:bg-[#00b4d8] data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 bg-white dark:bg-slate-800 border-0 shadow-md overflow-hidden transform ${isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={() => handleMouseLeave(project.id)}
                onClick={() => openModal(project)}
              >
                {/* Video Preview */}
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  {/* Thumbnail */}
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredProject === project.id ? "opacity-0" : "opacity-100"
                      }`}
                  />

                  {/* Video */}
                  <video
                    ref={(el) => (videoRefs.current[project.id] = el)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"
                      }`}
                    muted
                    loop
                    playsInline
                    poster={project.thumbnail_url}
                  >
                    <source src={project.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${hoveredProject === project.id ? "opacity-0" : "opacity-100"
                    }`}>
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-gray-900 ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/70 text-white border-0 backdrop-blur-sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {project.duration}
                    </Badge>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#00b4d8] text-white border-0">
                      {project.year}
                    </Badge>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-[#00b4d8]/80 via-transparent to-transparent transition-opacity duration-300 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    }`}>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <Button
                        size="sm"
                        className="bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(project);
                        }}
                      >
                        <Maximize2 className="w-4 h-4 mr-1" />
                        Full View
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Project Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#00b4d8] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools.map((tool, toolIndex) => (
                      <Badge
                        key={toolIndex}
                        variant="secondary"
                        className="text-xs bg-gradient-to-r from-[#00b4d8]/10 to-[#0077b6]/10 text-[#0077b6] border-[#00b4d8]/20 hover:from-[#00b4d8]/20 hover:to-[#0077b6]/20 transition-colors"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-[#00b4d8] to-[#0077b6] hover:from-[#0077b6] hover:to-[#00b4d8] text-white transition-all duration-300 group-hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(project);
                    }}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    View Full Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Work CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#00b4d8]/5 to-[#0077b6]/5 rounded-2xl p-8 border border-[#00b4d8]/20">
              <Palette className="w-12 h-12 text-[#00b4d8] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Interested in Motion Design?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                I create custom motion graphics for storytelling, branding, and visual communication.
                Let’s bring your ideas to life through motion!
              </p>
              <Button
                className="bg-[#00b4d8] hover:bg-[#0077b6] text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={() => {
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    const offsetTop = contactElement.offsetTop - 80;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <Video className="w-5 h-5 mr-2" />
                Discuss Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <div className="relative">
              {/* Video Player */}
              <div className="relative h-64 sm:h-80 lg:h-96 bg-black">
                <video
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  poster={selectedProject.thumbnailUrl}
                >
                  <source src={selectedProject.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Content */}
              <div className="p-6">
                <DialogHeader className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedProject.title}
                      </DialogTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {selectedProject.year}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedProject.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Project Overview
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedProject.long_description}
                  </p>
                </div>

                {/* Tools & Technology */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Tools & Technology
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tools.map((tool, index) => (
                      <Badge
                        key={index}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-[#00b4d8]/10 to-[#0077b6]/10 text-[#0077b6] border-[#00b4d8]/30"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <Button
                    className="flex-1 bg-[#00b4d8] hover:bg-[#0077b6] text-white"
                    onClick={() => {
                      const contactElement = document.getElementById('contact');
                      if (contactElement) {
                        closeModal();
                        setTimeout(() => {
                          const offsetTop = contactElement.offsetTop - 80;
                          window.scrollTo({
                            top: offsetTop,
                            behavior: "smooth",
                          });
                        }, 300);
                      }
                    }}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Discuss Similar Project
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white"
                    onClick={() => window.open(selectedProject.video_url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Video
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MotionGraphicsSection;