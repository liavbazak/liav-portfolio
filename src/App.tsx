/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from "motion/react";
import { ArrowRight, Sparkles, ExternalLink, Github, Code2, Layout, Smartphone, X, Linkedin, Instagram, Menu, Loader2, Plus } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

interface Project {
  id: string;
  title: string;
  type: "product" | "brandbook";
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  fullImage?: string;
  contentBlocks?: { type: 'image' | 'figma'; url: string; title?: string }[];
  link: string;
  github: string;
}

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  imageClassName,
  objectFit = "object-contain" 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  imageClassName?: string;
  objectFit?: "object-contain" | "object-cover" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      <motion.img
        src={hasError ? `https://picsum.photos/seed/${alt}/800/600` : src}
        alt={alt}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(10px)"
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full block ${objectFit} ${imageClassName || ""}`}
        referrerPolicy="no-referrer"
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

const projects: Project[] = [
  {
    id: "hush-brand",
    title: "HUSH - Brand Book",
    type: "brandbook",
    description: "Premium audio brand identity focusing on the future of silence.",
    longDescription: "HUSH is a premium audio brand dedicated to crafting high-end noise-canceling headphones. This brand book explores the visual identity, from the minimalist logo design to the sophisticated color palette and typography that defines the brand's presence in the luxury audio market.",
    tags: ["Branding", "Identity", "Figma", "Photoshop", "Illustrator"],
    image: "https://mir-s3-cdn-cf.behance.net/projects/original/b5612e245416105.Y3JvcCwxMTk5LDkzOCwyMzQsMA.png",
    fullImage: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/f5b2b0245416105.69b28c9aa93b3.png",
    link: "#",
    github: "#"
  },
  {
    id: "compair",
    title: "ComPair-App Design Project",
    type: "product",
    description: "A comprehensive mobile app design project focused on comparison and user experience.",
    longDescription: "ComPair is a design-focused mobile application project. This case study explores the user research, wireframing, and high-fidelity UI design created to solve complex comparison challenges for modern users.",
    tags: ["UI/UX", "Mobile Design", "Figma", "Prototyping", "After Effects", "Photoshop"],
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/d37296245119295.Y3JvcCwxNjE2LDEyNjQsMCww.png",
    contentBlocks: [
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/647f90245119295.69aab15559409.png' },
      { type: 'figma', url: 'https://embed.figma.com/proto/E58ovL0zcS2aHiJI61rtgK/%D7%9E%D7%97%D7%A7%D7%A8?page-id=257%3A74&node-id=895-3905&viewport=3408%2C-2778%2C0.1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=895%3A3905&embed-host=share', title: 'Research & Wireframes' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/c02340245119295.69a6e30402c24.png' },
      { type: 'figma', url: 'https://embed.figma.com/proto/E58ovL0zcS2aHiJI61rtgK/%D7%9E%D7%97%D7%A7%D7%A8?page-id=0%3A1&node-id=644-2254&viewport=-5827%2C446%2C0.39&scaling=scale-down&content-scaling=fixed&starting-point-node-id=644%3A2254&embed-host=share', title: 'Interactive Prototype' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/beb059245119295.69a6e3040190c.png' }
    ],
    link: "#",
    github: "#"
  },
  {
    id: "bloomterra-brand",
    title: "BloomTerra - Brand Book",
    type: "brandbook",
    description: "A comprehensive brand identity for an eco-conscious floral and botanical brand.",
    longDescription: "BloomTerra is a brand identity project that focuses on the intersection of nature and modern design. This brand book details the visual strategy, color systems, and typography used to create a cohesive and sustainable brand image for a premium botanical service.",
    tags: ["Branding", "Identity", "Figma", "Photoshop", "Illustrator"],
    image: "https://mir-s3-cdn-cf.behance.net/projects/original/d38fa7246078727.Y3JvcCwxODY2LDE0NjAsMzQ2LDA.png",
    contentBlocks: [
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/79d22e246078727.69bbb136ebbf9.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/a2f322246078727.69bbb136de09c.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/301590246078727.69bbb136de75a.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/a54d9d246078727.69bbb136dd355.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/88e7c1246078727.69bbb136ecab2.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/2d1406246078727.69bbb136dd9cd.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/146526246078727.69bbb136dee47.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/19ad46246078727.69bbb136e3016.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d0650c246078727.69bbb136dfd3a.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/1f1b30246078727.69bbb136eab27.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d8d3e5246078727.69bbb136dbe1c.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/5d3fd1246078727.69bbb136e2282.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e8e070246078727.69bbb136e040a.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/deab07246078727.69bbb136e53c7.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e97b1f246078727.69bbb136e0aa5.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/0bc057246078727.69bbb136dc52a.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/8e1fb8246078727.69bbb136ec2f4.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/524e4d246078727.69bbb136eb3d1.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/99a014246078727.69bbb136df5be.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/1afea8246078727.69bbb136e11a1.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/ca0728246078727.69bbb136e293e.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/98b97b246078727.69bbb136e3f38.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/705a87246078727.69bbb136dcc25.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d27985246078727.69bbb136db6e3.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/c88647246078727.69bbb136e19f6.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/cb7407246078727.69bbb136e4614.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/994c1b246078727.69bbb136e71e4.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/a6458c246078727.69bbb136e8b21.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/0e9dd8246078727.69bbb136e7a82.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/16ab46246078727.69bbb136e607e.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/a5f164246078727.69bbb136ea2e2.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/ee1fc7246078727.69bbb136e4c92.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/928735246078727.69bbb136e93e0.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/e00082246078727.69bbb136e5a61.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d45908246078727.69bbb136e9a71.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/f36ffd246078727.69bbb136e8233.png' },
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/a155b6246078727.69bbb136e68cd.png' }
    ],
    link: "#",
    github: "#"
  },
  {
    id: "portfolio-design",
    title: "UX&UI - Portfolio Website Design",
    type: "product",
    description: "A modern and professional portfolio design focusing on UX/UI best practices and minimalist aesthetics.",
    longDescription: "This project highlights the creative process behind a professional design portfolio. It explores grid systems, typography, and dark-mode optimization to create a seamless user experience for showcasing creative work.",
    tags: ["UI/UX", "Web Design", "Figma", "Portfolio", "Photoshop", "Illustrator"],
    image: "https://mir-s3-cdn-cf.behance.net/projects/original/14475e247357063.Y3JvcCwzODYxLDMwMjAsMTUyLDA.png",
    contentBlocks: [
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e87187247357063.69d8e2bc610a8.png' }
    ],
    link: "#",
    github: "#"
  },
  {
    id: "inside-out-design",
    title: "Inside Out — One Pager Website Design",
    type: "product",
    description: "A vibrant and engaging one-pager website design inspired by the character-driven narrative of Inside Out.",
    longDescription: "This project explores narrative-driven web design through a one-pager layout. It focuses on using bold colors and character-driven aesthetics to reflect the emotional core of the 'Inside Out' theme, while maintaining a clean and responsive user interface.",
    tags: ["UI/UX", "Web Design", "Figma", "One Pager", "Photoshop", "Illustrator"],
    image: "https://mir-s3-cdn-cf.behance.net/projects/original/605576247366387.Y3JvcCwzNTU0LDI3ODAsMTQwLDA.png",
    contentBlocks: [
      { type: 'image', url: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/334564247366387.69d90d56015b1.png' }
    ],
    link: "#",
    github: "#"
  }
];

const MouseFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: x,
        y: y,
        left: 0,
        top: 0,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
    >
      {/* Core dot */}
      <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      
      {/* Outer glow layers */}
      <div className="absolute inset-0 w-full h-full bg-white/30 rounded-full blur-[4px]" />
      <div className="absolute inset-0 w-full h-full bg-white/10 rounded-full blur-[12px] scale-150" />
      <div className="absolute inset-0 w-full h-full bg-white/5 rounded-full blur-[24px] scale-[2.5]" />
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleProjects, setVisibleProjects] = useState(3);
  const isManualScroll = useRef(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualScroll.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = ["home", "about", "projects", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    isManualScroll.current = true;
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    // Reset manual scroll flag after animation finishes
    setTimeout(() => {
      isManualScroll.current = false;
    }, 1000);
  };

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black scroll-smooth">
      <MouseFollower />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-6 md:px-12 bg-black/50 backdrop-blur-md border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter relative z-[110]"
        >
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Liav Bazak<span className="text-white/50">.</span></a>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center space-x-8 text-sm font-medium"
        >
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a 
                key={item.name}
                href={item.href} 
                onClick={() => handleNavClick(sectionId)}
                className={`relative py-1 transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </motion.div>

        <div className="flex items-center space-x-4 relative z-[110]">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsContactModalOpen(true)}
            className="hidden md:flex group items-center space-x-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all"
          >
            <div className="bg-black text-white rounded-full p-1 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={14} />
            </div>
            <span>Contact Me</span>
          </motion.button>

          {/* Hamburger Button */}
          <button 
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(sectionId)}
                  className={`text-5xl font-bold tracking-tighter transition-colors ${
                    isActive ? "text-white" : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {item.name}
                </motion.a>
              );
            })}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              onClick={() => {
                setIsContactModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="mt-8 flex items-center space-x-3 bg-white text-black px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform"
            >
              <span>Contact Me</span>
              <ArrowRight size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section 
        id="home" 
        className="relative flex flex-col justify-start md:justify-end min-h-screen px-6 pt-32 pb-24 md:pt-0 md:px-12 md:pb-32 bg-none md:bg-cover md:bg-right md:bg-no-repeat scroll-mt-32"
        style={{ 
          backgroundImage: `url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3BILPolG518VwI2qZQd8dqrQVxZ%2Fhf_20260322_093257_03b40438-b2ca-4350-b456-b623f28feea1.png&w=1280&q=85')` 
        }}
      >
        {/* Mobile Image */}
        <div className="md:hidden absolute top-0 left-0 w-full h-[50vh] overflow-hidden">
          <img 
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_3BILPolG518VwI2qZQd8dqrQVxZ%2Fhf_20260322_093257_03b40438-b2ca-4350-b456-b623f28feea1.png&w=1280&q=85" 
            alt="Hero" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>

        {/* Dark overlay for readability (Desktop) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end relative z-10 mt-[45vh] md:mt-0">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-6xl md:text-9xl font-bold leading-[0.85] tracking-tighter mb-8">
                Product<br />
                <span className="text-white/40 italic">Designer</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-xl font-medium leading-relaxed">
                Crafting digital experiences that blend aesthetic precision with functional clarity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 border-t border-white/10 scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">01 / About</span>
            </div>
            <div className="md:col-span-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold leading-tight mb-8"
              >
                Bridging the gap between <span className="text-white/40 italic">imagination</span> and <span className="text-white/40 italic">implementation</span>.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/60 leading-relaxed max-w-2xl"
              >
                Based in Israel, I’m Liav Bazak, a Product Designer focused on crafting digital experiences that are both intuitive and visually compelling. With a strong foundation in user experience and interface design, I bring clarity, creativity, and attention to detail into every product I design.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 md:px-12 bg-[#050505] scroll-mt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-4">02 / Selected Works</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Projects</h2>
            </div>
            <p className="text-white/40 max-w-xs text-sm font-medium">
              A collection of experiments, client work, and passion projects that define my creative journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, visibleProjects).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 flex flex-col h-full cursor-pointer"
              >
                {/* Project Image Preview */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
                  <LazyImage 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full"
                    imageClassName="transition-transform duration-700 group-hover:scale-105"
                    objectFit="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      View Project
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>
  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-white/40 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleProjects < projects.length && (
            <div className="mt-16 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleProjects(prev => prev + 3)}
                className="px-8 py-4 bg-white text-black rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-colors flex items-center gap-2"
              >
                Load More Projects
                <Plus size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div className="min-h-screen py-12 md:py-20 px-4 flex items-start justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`bg-[#0a0a0a] border border-white/10 rounded-3xl w-full overflow-hidden relative shadow-2xl ${
                  selectedProject.type === 'brandbook' ? 'max-w-4xl' : 'max-w-5xl'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button Inside Modal */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-[110] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
                >
                  <X size={20} />
                </button>

                {selectedProject.type === 'brandbook' ? (
                  /* Brand Book Layout: Vertical Scroll Content */
                  <div className="flex flex-col">
                    <div className="p-8 md:p-16 border-b border-white/10">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4 block">Brand Identity Case Study</span>
                      <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">{selectedProject.title}</h2>
                      <p className="text-white/60 text-xl leading-relaxed max-w-2xl mb-8">
                        {selectedProject.longDescription}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-mono uppercase tracking-wider px-4 py-2 bg-white/5 rounded-full text-white/60 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* The Image(s) Container */}
                    <div className="w-full bg-black flex flex-col items-center justify-center relative">
                      {selectedProject.contentBlocks && selectedProject.contentBlocks.length > 0 ? (
                        selectedProject.contentBlocks.map((block, index) => (
                          <div key={index} className="w-full">
                            {block.type === 'image' ? (
                              <LazyImage 
                                src={block.url} 
                                alt={`${selectedProject.title} - Page ${index + 1}`}
                                className="w-full h-auto"
                              />
                            ) : (
                              <div className="w-full aspect-video bg-white/5 flex items-center justify-center p-4">
                                <iframe 
                                  src={block.url}
                                  className="w-full h-full rounded-lg border border-white/10"
                                  allowFullScreen
                                />
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <LazyImage 
                          src={selectedProject.fullImage || selectedProject.image} 
                          alt={selectedProject.title}
                          className="w-full h-auto"
                        />
                      )}
                    </div>

                    <div className="p-16 text-center bg-white/5">
                      <h3 className="text-2xl font-bold mb-8">Ready to start your project?</h3>
                      <a 
                        href="#contact" 
                        onClick={() => setSelectedProject(null)}
                        className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                      >
                        <span>Get in Touch</span>
                        <ArrowRight size={20} />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Standard Product Layout: Split View */
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-full overflow-hidden bg-white/5 flex items-center justify-center">
                      <LazyImage 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Case Study</span>
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">{selectedProject.title}</h2>
                      <p className="text-white/60 text-lg leading-relaxed mb-8">
                        {selectedProject.longDescription}
                      </p>
    
                      <div className="flex flex-wrap gap-3 mb-12">
                        {selectedProject.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 bg-white/5 rounded-full text-white/60 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
    
                      <div className="flex space-x-4">
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center space-x-2 bg-white text-black py-4 rounded-xl font-bold hover:bg-white/90 transition-all"
                        >
                          <span>Live Preview</span>
                          <ExternalLink size={18} />
                        </a>
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                        >
                          <Github size={24} />
                        </a>
                      </div>
                    </div>

                    {/* Extra Content for Products (Figma Embeds & Images) */}
                    {selectedProject.contentBlocks && selectedProject.contentBlocks.length > 0 && (
                      <div className="col-span-1 md:col-span-2 border-t border-white/10 p-8 md:p-12 space-y-16 bg-black/20">
                        {selectedProject.contentBlocks.map((block, index) => (
                          <div key={index} className="space-y-6">
                            {block.type === 'image' ? (
                              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <LazyImage 
                                  src={block.url} 
                                  alt={`${selectedProject.title} - Block ${index + 1}`}
                                  className="w-full h-auto"
                                />
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {block.title && (
                                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 block">
                                    {block.title}
                                  </span>
                                )}
                                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                                  <iframe 
                                    style={{ border: "none" }} 
                                    width="100%" 
                                    height="100%" 
                                    src={block.url} 
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Contact Section */}
      <footer id="contact" className="py-24 px-6 md:px-12 border-t border-white/10 text-center scroll-mt-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's build something <span className="italic text-white/40">extraordinary</span>.</h2>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center space-x-4 bg-white text-black px-12 py-6 rounded-full text-xl md:text-2xl font-bold mb-12 hover:bg-white/90 transition-all"
          >
            <span>Contact Me</span>
            <ArrowRight size={28} />
          </motion.button>

          <div className="flex items-center justify-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/liav-bazak-13aa6419b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://www.instagram.com/liav.bazak/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://www.behance.net/liavbazak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Behance"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 12h2a2.5 2.5 0 0 0 0-5H9v5z"/>
                <path d="M9 17h2.5a2.5 2.5 0 0 0 0-5H9v5z"/>
                <path d="M16 11h5"/>
                <path d="M21 14c0 2-2 3-4 3s-4-1-4-3 2-3 4-3 4 1 4 3z"/>
                <rect x="2" y="4" width="20" height="16" rx="2"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tighter">Get in touch<span className="text-white/30">.</span></h2>
                <p className="text-white/50 mb-8">Fill out the form below and I'll get back to you as soon as possible.</p>

                <form 
                  noValidate
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setSubmitStatus('idle');
                    setErrorMessage("");
                    const formData = new FormData(e.currentTarget);
                    const data = Object.fromEntries(formData);
                    
                    // Basic validation
                    if (!data.firstName || !data.lastName) {
                      setErrorMessage("Please fill in your full name.");
                      setSubmitStatus('error');
                      setIsSubmitting(false);
                      return;
                    }

                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!data.email || !emailRegex.test(data.email as string)) {
                      setErrorMessage("The email address you entered is invalid. Please ensure it is correct (e.g., name@example.com).");
                      setSubmitStatus('error');
                      setIsSubmitting(false);
                      return;
                    }
                    
                    if (!data.message) {
                      setErrorMessage("Please enter a message.");
                      setSubmitStatus('error');
                      setIsSubmitting(false);
                      return;
                    }
                    
                    try {
                      console.log("Submitting to /api/contact (using Resend)...");
                      const response = await fetch("/api/contact", {
                        method: "POST",
                        headers: { 
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                        },
                        body: JSON.stringify(data)
                      });
                      
                      console.log("Response status:", response.status);
                      const result = await response.json();
                      console.log("Result:", result);
                      
                      if (response.ok && result.success) {
                        setSubmitStatus('success');
                        setTimeout(() => {
                          setIsContactModalOpen(false);
                          setSubmitStatus('idle');
                        }, 2000);
                      } else {
                        console.error("Server returned error:", response.status, result);
                        let msg = result.message || "Something went wrong. Please try again.";
                        setErrorMessage(msg);
                        setSubmitStatus('error');
                      }
                    } catch (error: any) {
                      console.error("Submission error details:", error);
                      setErrorMessage(`Connection Error: ${error.message || "Unknown error"}. Please use the direct link below.`);
                      setSubmitStatus('error');
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-6"
                >
                  {submitStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center"
                    >
                      Message sent successfully! I'll be in touch soon.
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center"
                    >
                      <p>{errorMessage}</p>
                    </motion.div>
                  ) : null}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-white/50 ml-1">First Name</label>
                      <input 
                        required
                        type="text" 
                        id="firstName"
                        name="firstName"
                        placeholder="Liav"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-white/50 ml-1">Last Name</label>
                      <input 
                        required
                        type="text" 
                        id="lastName"
                        name="lastName"
                        placeholder="Bazak"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/50 ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      id="email"
                      name="email"
                      placeholder="liav@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/50 ml-1">Message</label>
                    <textarea 
                      required
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 group"
                  >
                    {isSubmitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Background Grain/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
