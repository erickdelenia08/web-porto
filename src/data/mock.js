// Mock data for Erick Delenia's Portfolio

import profile from "../assets/images/ErickDelenia_Foto.jpg"

export const personalInfo = {
  name: "Erick Delenia",
  title: "Data Scientist & Creative Developer",
  tagline: "Blending code and creativity, crafting interactive experiences that merge precise programming with dynamic motion design — turning ideas into smooth, engaging visuals driven by technology and art.",
  email: "erickdelenia08@gmail.com",
  location: "Indonesia",
  profileImage: profile,
  cvUrl: "/assets/Erick_Delenia_CV.pdf"
};

export const aboutData = {
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
  education: [
    {
      degree: "Informatics Engineering",
      institution: "Institut Teknologi Sepuluh Nopember",
      year: "2023-2025",
      focus: "Data Science & Network Security"
    },
    {
      degree: "Bachelor of Mathematics",
      institution: "University of Jember",
      year: "2019-2023",
      focus: "Applied Mathematics"
    }
  ]
};

export const projects = [
  {
    id: 1,
    title: "COVID-19 Data Visualization Dashboard",
    description: "Interactive dashboard analyzing COVID-19 trends across Indonesian provinces using real-time data and predictive modeling.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["Python", "Dash", "Pandas", "Plotly"],
    githubUrl: "https://github.com/erickdelenia/covid-dashboard",
    liveUrl: "https://covid-dashboard-demo.vercel.app",
    featured: true
  },
  
  {
    id: 6,
    title: "Cryptocurrency Price Predictor",
    description: "LSTM-based deep learning model for predicting cryptocurrency prices with real-time market sentiment analysis integration.",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop",
    tags: ["Python", "TensorFlow", "LSTM", "API Integration"],
    githubUrl: "https://github.com/erickdelenia/crypto-predictor",
    liveUrl: "https://crypto-predictor-demo.herokuapp.com",
    featured: false
  }
];

export const skills = {
  programming: [
    { name: "Python", level: 95, icon: "Code2" },
    { name: "JavaScript", level: 90, icon: "Code" },
    { name: "Dart", level: 85, icon: "Smartphone" },
    { name: "Java", level: 80, icon: "Coffee" },
    { name: "HTML/CSS", level: 92, icon: "Globe" },
    { name: "SQL", level: 88, icon: "Database" }
  ],
  frameworks: [
    { name: "React", level: 90, icon: "Atom" },
    { name: "Flutter", level: 85, icon: "Smartphone" },
    { name: "Node.js", level: 82, icon: "Server" },
    { name: "TensorFlow", level: 88, icon: "Brain" },
    { name: "Pandas", level: 92, icon: "BarChart3" },
    { name: "Scikit-learn", level: 85, icon: "TrendingUp" }
  ],
  creative: [
    { name: "After Effects", level: 88, icon: "Video" },
    { name: "Illustrator", level: 85, icon: "Video" },
    // { name: "Figma", level: 85, icon: "Figma" },
    { name: "Photoshop", level: 80, icon: "Image" },
    // { name: "Cinema 4D", level: 75, icon: "Box" },
    { name: "Auidition", level: 70, icon: "Boxes" },
    { name: "Premiere Pro", level: 82, icon: "Zap" }
  ]
};

export const blogPosts = [
  {
    id: 1,
    title: "The Art of Data Storytelling: Beyond Charts and Graphs",
    excerpt: "Exploring how motion graphics and interactive visualizations can transform complex datasets into compelling narratives that drive decision-making.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Data Visualization", "Storytelling", "Design"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop",
    content: "Full blog post content would go here..."
  },
  {
    id: 2,
    title: "Building Ethical AI: A Developer's Responsibility",
    excerpt: "Discussing the importance of ethical considerations in AI development and practical steps developers can take to build more responsible systems.",
    date: "2024-01-08",
    readTime: "12 min read",
    tags: ["AI Ethics", "Machine Learning", "Technology"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop",
    content: "Full blog post content would go here..."
  },
  {
    id: 3,
    title: "Flutter vs React Native: A Data-Driven Comparison",
    excerpt: "Analyzing performance metrics, development speed, and ecosystem maturity to help developers choose the right cross-platform framework.",
    date: "2023-12-22",
    readTime: "10 min read",
    tags: ["Flutter", "React Native", "Mobile Development"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop",
    content: "Full blog post content would go here..."
  }
];

export const socialLinks = [
  {
    name: "Email",
    url: "mailto:erickdelenia08@gmail.com",
    icon: "Mail"
  },
  {
    name: "GitHub",
    url: "https://github.com/erickdelenia08",
    icon: "Github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/erickdelenia",
    icon: "Linkedin"
  },
  // {
  //   name: "Behance",
  //   url: "https://behance.net/erickdelenia",
  //   icon: "Palette"
  // }
];

export const motionGraphicsProjects = [
  {
    id: 1,
    title: "Data Visualization Animation",
    shortDescription: "Interactive animated charts showcasing Indonesian economic data trends over the past decade.",
    longDescription: "This project visualizes complex economic data from Indonesia's Central Bureau of Statistics, transforming static spreadsheets into engaging animated stories. The animation reveals patterns in GDP growth, inflation rates, and employment statistics through carefully choreographed motion graphics that guide viewers through key insights and correlations.",
    tools: ["After Effects", "Illustrator", "Cinema 4D"],
    videoUrl: "https://wkfsewrqcmkafqlourls.supabase.co/storage/v1/object/sign/videos/mur.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZTNjNTg5Mi04OTExLTQ5ZjctOWZlYi00YWI2MmRiODhiYmQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRlb3MvbXVyLm1wNCIsImlhdCI6MTc2MTMzMTEzMCwiZXhwIjoxNzkyODY3MTMwfQ.t-MBVr5uJvTDXvaZlUWdhCA-vpw6v9TKqqtufTPnWSQ",
    thumbnailUrl: "https://wkfsewrqcmkafqlourls.supabase.co/storage/v1/object/sign/images/t2.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZTNjNTg5Mi04OTExLTQ5ZjctOWZlYi00YWI2MmRiODhiYmQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvdDIuanBlZyIsImlhdCI6MTc2MTMzMTIzOSwiZXhwIjoxNzkyODY3MjM5fQ.gSYKL6BeKSNGSIUUPt5WNP9HCPSyXTk5mgh7CDRaxY4",
    category: "data-visualization",
    duration: "2:15",
    year: "2024"
  },
  {
    id: 6,
    title: "Flutter App Promo Animation",
    shortDescription: "Promotional video showcasing EcoTrack mobile app features and user interface.",
    longDescription: "Marketing animation created to showcase the EcoTrack Flutter application's key features. Combines screen recordings with motion graphics overlays, animated UI elements, and particle effects to create an engaging promotional piece that highlights the app's environmental impact tracking capabilities and gamification elements.",
    tools: ["After Effects", "Premiere Pro", "GSAP"],
    videoUrl: "src/data/idul fitri.mp4",
    thumbnailUrl: "https://wkfsewrqcmkafqlourls.supabase.co/storage/v1/object/sign/images/t3.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZTNjNTg5Mi04OTExLTQ5ZjctOWZlYi00YWI2MmRiODhiYmQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvdDMuanBlZyIsImlhdCI6MTc2MTMzMTIyMSwiZXhwIjoxNzkyODY3MjIxfQ.UP_ajwIfwmSR7KyL5y9f4l-VATyl7umVg5gFNOK6mkY",
    category: "app-promo",
    duration: "2:28",
    year: "2024"
  }
];

export const contactFormData = {
  placeholder: {
    name: "Your Name",
    email: "your.email@example.com",
    message: "Tell me about your project or just say hello!"
  },
  successMessage: "Thank you for reaching out! I'll get back to you within 24 hours.",
  errorMessage: "Something went wrong. Please try again or contact me directly via email."
};