import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundOrbs from "./components/BackgroundOrbs";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ProjectModal from "./components/ProjectModal";
import { useTheme } from "./hooks/useTheme";
import AboutSection from "./sections/AboutSection";
import CertificationsSection from "./sections/CertificationsSection";
import Chatbot from "./components/Chatbot";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import ResumeSection from "./sections/ResumeSection";

const sectionIds = ["home", "about", "skills", "projects", "certifications", "resume", "contact"];

const darkBackgrounds = {
  home: "#020617",
  about: "#022c22",
  skills: "#451a03",
  projects: "#2e1065",
  certifications: "#172554",
  resume: "#1e1b4b",
  contact: "#083344",
};

const lightBackgrounds = {
  home: "#f8fafc",
  about: "#ecfdf5",
  skills: "#fffbeb",
  projects: "#faf5ff",
  certifications: "#eff6ff",
  resume: "#eef2ff",
  contact: "#ecfeff",
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const { isDark, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.18,
  });

  useEffect(() => {
    const loaderTimeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 1700);

    return () => window.clearTimeout(loaderTimeout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    const sectionElements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (sectionElements.length === 0) {
      return undefined;
    }

    // Observe section visibility to keep the navigation highlight synced with scroll position.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: "-10% 0px -25% 0px",
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">{isLoading ? <Loader key="loader" /> : null}</AnimatePresence>

      <CustomCursor />
      
      {/* Dynamic Theme Background */}
      <motion.div
        animate={{ 
          backgroundColor: isDark ? (darkBackgrounds[activeSection] || darkBackgrounds.home) : (lightBackgrounds[activeSection] || lightBackgrounds.home) 
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-[-1]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_22%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.08),transparent_24%)] pointer-events-none" />
      </motion.div>

      <BackgroundOrbs activeSection={activeSection} />

      <motion.div
        style={{ scaleX: progressScaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-cyan-400 via-sky-500 to-fuchsia-500"
      />

      <div className="relative z-10">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} activeSection={activeSection} />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection onProjectSelect={setSelectedProject} />
          <CertificationsSection />
          <ResumeSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Chatbot />
    </div>
  );
};

export default App;
