import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const orbTransition = {
  repeat: Number.POSITIVE_INFINITY,
  repeatType: "mirror",
  duration: 14,
  ease: "easeInOut",
};

const sectionColors = {
  home: [
    "rgba(34, 211, 238, 0.2)",  // cyan
    "rgba(217, 70, 239, 0.16)", // fuchsia
    "rgba(99, 102, 241, 0.12)", // indigo
    "rgba(59, 130, 246, 0.15)", // blue
    "rgba(45, 212, 191, 0.08)", // teal
  ],
  about: [
    "rgba(16, 185, 129, 0.2)",  // emerald
    "rgba(132, 204, 22, 0.16)", // lime
    "rgba(20, 184, 166, 0.12)", // teal
    "rgba(34, 197, 94, 0.15)",  // green
    "rgba(5, 150, 105, 0.08)",  // emerald-600
  ],
  skills: [
    "rgba(245, 158, 11, 0.2)",  // amber
    "rgba(249, 115, 22, 0.16)", // orange
    "rgba(239, 68, 68, 0.12)",  // red
    "rgba(234, 179, 8, 0.15)",  // yellow
    "rgba(244, 63, 94, 0.08)",  // rose
  ],
  projects: [
    "rgba(168, 85, 247, 0.2)",  // purple
    "rgba(217, 70, 239, 0.16)", // fuchsia
    "rgba(236, 72, 153, 0.12)", // pink
    "rgba(244, 63, 94, 0.15)",  // rose
    "rgba(219, 39, 119, 0.08)", // pink-600
  ],
  certifications: [
    "rgba(99, 102, 241, 0.2)",  // indigo
    "rgba(139, 92, 246, 0.16)", // violet
    "rgba(59, 130, 246, 0.12)", // blue
    "rgba(14, 165, 233, 0.15)", // sky
    "rgba(79, 70, 229, 0.08)",  // indigo-600
  ],
  contact: [
    "rgba(14, 165, 233, 0.2)",  // sky
    "rgba(20, 184, 166, 0.16)", // teal
    "rgba(34, 211, 238, 0.12)", // cyan
    "rgba(59, 130, 246, 0.15)", // blue
    "rgba(6, 182, 212, 0.08)",  // cyan-500
  ],
};

const BackgroundOrbs = ({ activeSection = "home" }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -200]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentColors = sectionColors[activeSection] || sectionColors.home;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="grid-overlay absolute inset-0 opacity-[0.15]" />
      
      {/* Scroll-based parallax orbs */}
      <motion.div
        style={{ y: y1 }}
        animate={{ 
          x: [0, 70, -30], 
          scale: [1, 1.08, 0.96],
          backgroundColor: currentColors[0]
        }}
        transition={{ ...orbTransition, backgroundColor: { duration: 1.2, ease: "easeInOut" } }}
        className="absolute -left-20 top-16 h-72 w-72 rounded-full blur-[100px] md:h-96 md:w-96"
      />
      <motion.div
        style={{ y: y2 }}
        animate={{ 
          x: [0, -90, 20], 
          scale: [1.05, 0.9, 1.1],
          backgroundColor: currentColors[1]
        }}
        transition={{ ...orbTransition, duration: 18, backgroundColor: { duration: 1.2, ease: "easeInOut" } }}
        className="absolute right-[-6rem] top-[12%] h-80 w-80 rounded-full blur-[100px] md:h-[28rem] md:w-[28rem]"
      />
      <motion.div
        style={{ y: y3 }}
        animate={{ 
          x: [0, 40, -40], 
          rotate: [0, 35, -25],
          backgroundColor: currentColors[2]
        }}
        transition={{ ...orbTransition, duration: 20, backgroundColor: { duration: 1.2, ease: "easeInOut" } }}
        className="absolute bottom-[-8rem] left-[20%] h-96 w-96 rounded-full blur-[100px]"
      />
      <motion.div
        style={{ y: y4 }}
        animate={{ 
          x: [0, -50, 50], 
          scale: [0.9, 1.1, 1],
          backgroundColor: currentColors[3]
        }}
        transition={{ ...orbTransition, duration: 16, backgroundColor: { duration: 1.2, ease: "easeInOut" } }}
        className="absolute bottom-[10%] right-[20%] h-72 w-72 rounded-full blur-[100px]"
      />

      {/* Mouse following interactive orb */}
      <motion.div
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
          backgroundColor: currentColors[4]
        }}
        transition={{ 
          x: { type: "spring", stiffness: 50, damping: 20, mass: 0.5 },
          y: { type: "spring", stiffness: 50, damping: 20, mass: 0.5 },
          backgroundColor: { duration: 1.2, ease: "easeInOut" }
        }}
        className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full blur-[80px]"
      />

      {/* Floating particles background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            opacity: Math.random() * 0.5 + 0.3,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [null, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundOrbs;
