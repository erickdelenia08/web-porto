import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useToast } from "../../hooks/use-toast";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Palette,
  MessageSquare,
} from "lucide-react";
import { personalInfo, socialLinks, contactFormData } from "../../data/mock";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const { toast } = useToast();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      
      toast({
        title: "Message Sent!",
        description: contactFormData.successMessage,
      });
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  const iconMap = {
    Mail,
    Github,
    Linkedin,
    Palette,
  };

  return (
    <section
      id="contact"
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
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Have a project in mind or just want to chat about IT and Motion graphic Project? 
              I'd love to hear from you!
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div
              className={`lg:col-span-1 space-y-8 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              {/* Contact Details */}
              <Card className="bg-gradient-to-br from-[#00b4d8]/5 to-[#0077b6]/5 border-[#00b4d8]/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-white">
                    <MessageSquare className="w-5 h-5 mr-2 text-[#00b4d8]" />
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#00b4d8]/10 rounded-lg">
                      <Mail className="w-5 h-5 text-[#00b4d8]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {personalInfo.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#0077b6]/10 rounded-lg">
                      <MapPin className="w-5 h-5 text-[#0077b6]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {personalInfo.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#00b4d8]/10 rounded-lg">
                      <Phone className="w-5 h-5 text-[#00b4d8]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-gradient-to-br from-[#0077b6]/5 to-[#00b4d8]/5 border-[#0077b6]/20">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">
                    Connect With Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((link, index) => {
                      const IconComponent = iconMap[link.icon] || Mail;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-center space-y-2 border-[#00b4d8]/20 hover:bg-[#00b4d8]/10 hover:border-[#00b4d8] transition-all duration-300"
                          onClick={() => window.open(link.url, "_blank")}
                        >
                          <IconComponent className="w-6 h-6 text-[#00b4d8]" />
                          <span className="text-sm font-medium">{link.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div
              className={`lg:col-span-2 transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <Card className="bg-white dark:bg-slate-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 dark:text-white">
                    Send me a message
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    I'll get back to you as soon as possible!
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder={contactFormData.placeholder.name}
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-gray-300 dark:border-slate-600 focus:border-[#00b4d8] focus:ring-[#00b4d8]/20"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={contactFormData.placeholder.email}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-gray-300 dark:border-slate-600 focus:border-[#00b4d8] focus:ring-[#00b4d8]/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder={contactFormData.placeholder.message}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="border-gray-300 dark:border-slate-600 focus:border-[#00b4d8] focus:ring-[#00b4d8]/20 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full bg-[#00b4d8] hover:bg-[#0077b6] text-white py-3 text-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#00b4d8]/10 to-[#0077b6]/10 rounded-2xl p-8 border border-[#00b4d8]/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to start your project?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Let's discuss how I can help bring your ideas to life through IT or creative solutions.
              </p>
              <Button
                className="bg-[#00b4d8] hover:bg-[#0077b6] text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={() => {
                  const emailElement = document.getElementById('email');
                  if (emailElement) emailElement.focus();
                }}
              >
                <Mail className="w-4 h-4 mr-2" />
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;