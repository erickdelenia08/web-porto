import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "../../data/mock";

const BlogSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  return (
    <section
      id="blog"
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
              Latest Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Thoughts on data science, technology, and the intersection of creativity and analytics
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] mx-auto rounded-full" />
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-2 bg-white dark:bg-slate-900 border-0 shadow-md overflow-hidden transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => openPost(post)}
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Read More Overlay */}
                  <div className="absolute inset-0 bg-[#00b4d8]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white text-[#00b4d8] hover:bg-gray-100">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Article
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Meta Information */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#00b4d8] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs bg-[#00b4d8]/10 text-[#0077b6] border-[#00b4d8]/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <div className="flex items-center text-[#00b4d8] font-medium text-sm group-hover:text-[#0077b6] transition-colors duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Posts Button */}
          <div className="text-center">
            <Button
              variant="outline"
              className="border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white px-8 py-3"
              onClick={() => alert('Blog page would open here!')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View All Posts
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedPost.title}
                </DialogTitle>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(selectedPost.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedPost.readTime}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-[#00b4d8]/10 text-[#0077b6] border-[#00b4d8]/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </DialogHeader>
              
              {/* Featured Image */}
              <div className="mb-6">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {selectedPost.excerpt}
                </p>
                
                <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg border-l-4 border-[#00b4d8]">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    This is a mock blog post. The full content would be loaded here from your CMS or markdown files.
                    In a real implementation, you would fetch the complete article content and render it here.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BlogSection;