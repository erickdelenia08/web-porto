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

  const whatsappNumber = "6281334031474"; 

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Format pesan WhatsApp
    const messageText = `Halo Erick,\n\nSaya ingin berkomunikasi terkait project:\n\n*Nama:* ${formData.name}\n*Email:* ${formData.email}\n*Pesan:* ${formData.message}`;

    // Encode URL agar aman dibaca oleh browser
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Buka tautan WhatsApp di tab baru
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecting to WhatsApp!",
      description: "Membuka WhatsApp untuk mengirim pesan...",
    });

    // Reset Form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0e0d0d] text-white min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl sm:text-7xl text-[#d3bc9b] tracking-wide mb-2">
              LET'S WORK TOGETHER
            </h2>
            <p className="font-montserrat text-xs sm:text-sm text-stone-400 uppercase tracking-widest max-w-xl mx-auto">
              Have a project in mind or just want to chat about Web Development & Motion Design?
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div
              className={`lg:col-span-1 space-y-6 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              }`}
            >
              {/* Contact Details */}
              <Card className="bg-stone-900/60 border border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center font-bebas text-2xl tracking-wide text-white">
                    <MessageSquare className="w-5 h-5 mr-3 text-[#d3bc9b]" />
                    GET IN TOUCH
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#d3bc9b]/10 rounded-xl border border-[#d3bc9b]/20">
                      <Mail className="w-5 h-5 text-[#d3bc9b]" />
                    </div>
                    <div>
                      <p className="font-montserrat text-xs text-stone-400 uppercase tracking-wider">Email</p>
                      <p className="font-montserrat text-sm font-medium text-white">
                        {personalInfo.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#d3bc9b]/10 rounded-xl border border-[#d3bc9b]/20">
                      <MapPin className="w-5 h-5 text-[#d3bc9b]" />
                    </div>
                    <div>
                      <p className="font-montserrat text-xs text-stone-400 uppercase tracking-wider">Location</p>
                      <p className="font-montserrat text-sm font-medium text-white">
                        {personalInfo.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#d3bc9b]/10 rounded-xl border border-[#d3bc9b]/20">
                      <Phone className="w-5 h-5 text-[#d3bc9b]" />
                    </div>
                    <div>
                      <p className="font-montserrat text-xs text-stone-400 uppercase tracking-wider">Response Time</p>
                      <p className="font-montserrat text-sm font-medium text-white">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-stone-900/60 border border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-bebas text-2xl tracking-wide text-white">
                    CONNECT WITH ME
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((link, index) => {
                      const IconComponent = iconMap[link.icon] || Mail;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-auto py-3 px-4 flex flex-col items-center space-y-2 bg-stone-900/80 border-white/10 hover:border-[#d3bc9b] hover:bg-[#d3bc9b]/10 text-white transition-all duration-300"
                          onClick={() => window.open(link.url, "_blank")}
                        >
                          <IconComponent className="w-5 h-5 text-[#d3bc9b]" />
                          <span className="font-montserrat text-xs font-semibold">{link.name}</span>
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
              <Card className="bg-stone-900/60 border border-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-bebas text-3xl tracking-wide text-white">
                    SEND A MESSAGE
                  </CardTitle>
                  <p className="font-montserrat text-xs text-stone-400">
                    Fill out the form below and it will directly open your WhatsApp.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-montserrat text-xs text-stone-300 uppercase tracking-wider">
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
                          className="bg-stone-950 border-white/10 text-white placeholder:text-stone-600 focus:border-[#d3bc9b] focus:ring-[#d3bc9b]/20 font-montserrat text-sm"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-montserrat text-xs text-stone-300 uppercase tracking-wider">
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
                          className="bg-stone-950 border-white/10 text-white placeholder:text-stone-600 focus:border-[#d3bc9b] focus:ring-[#d3bc9b]/20 font-montserrat text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-montserrat text-xs text-stone-300 uppercase tracking-wider">
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
                        className="bg-stone-950 border-white/10 text-white placeholder:text-stone-600 focus:border-[#d3bc9b] focus:ring-[#d3bc9b]/20 font-montserrat text-sm resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={!isFormValid || isSubmitting}
                      className="w-full bg-[#d3bc9b] hover:bg-[#b8a082] text-black font-montserrat text-xs font-bold py-4 uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                          Redirecting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send to WhatsApp
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action Banner */}
          <div className="text-center mt-16">
            <div className="bg-stone-900/40 rounded-2xl p-8 border border-[#d3bc9b]/30 backdrop-blur-md">
              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
                READY TO START YOUR PROJECT?
              </h3>
              <p className="font-montserrat text-xs text-stone-400 mb-6 max-w-xl mx-auto">
                Let's discuss how I can help bring your ideas to life through creative design and robust technical execution.
              </p>
              <Button
                className="bg-[#d3bc9b] hover:bg-[#b8a082] text-black font-montserrat text-xs font-bold px-8 py-3 uppercase tracking-widest transition-all duration-300 hover:scale-105"
                onClick={() => {
                  const nameElement = document.getElementById('name');
                  if (nameElement) nameElement.focus();
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