import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Code2,
  Database,
  Figma,
  Globe,
  Layers3,
  Mail,
  Server,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import myProfilePhoto from "./WhatsApp Image 2026-03-22 at 11.21.59 PM.jpeg";
import certGoogleData from "./google advance data anaylytics.pdf";
import certAwsCloud from "./aws cloud.pdf";
import certGoogleIT from "./google it automation using pythom.pdf";
import certCloudComputing from "./Cloud Computing.pdf";
import certInternsElite from "./internsellite.jpg";
import certInternsEliteNimbus from "./internsellite nimbus.jpg";
import resumePdf from "./CV_202512061027143160_12317422 (4).pdf";

// Centralized content makes the portfolio easy to personalize without touching layout code.
export const portfolioData = {
  personal: {
    name: "Dinesh Gonthina",
    role: "Computer Science Engineer & AI Enthusiast",
    email: "dinesh06082005@gmail.com",
    location: "Punjab, India",
    availability: "Available for internships and entry-level positions",
    bio: "I am a passionate computer science student combining strong core CS fundamentals with modern web development and AI skills to build impactful solutions.",
    profileImage: myProfilePhoto,
    resumeUrl: resumePdf,
  },
  hero: {
    eyebrow: "B.Tech CSE @ Lovely Professional University",
    headline: "Building intelligent web applications and robust software systems.",
    subheadline:
      "From AI-powered music players to comprehensive productivity dashboards, I blend modern frameworks with generative AI to create uniquely capable digital products.",
    primaryCta: {
      label: "View Projects",
      href: "#projects",
    },
    secondaryCta: {
      label: "Get in Touch",
      href: "#contact",
    },
    stats: [
      { label: "AI Models Tested", value: "3+" },
      { label: "Hackathons Attended", value: "2+" },
      { label: "Professional Certs", value: "5" },
    ],
    floatingCards: [
      {
        title: "Generative AI",
        text: "Integrating LLMs like Gemini for smart app features.",
        icon: Sparkles,
      },
      {
        title: "Full Stack Dev",
        text: "Building dynamic apps with React, Node.js, and Firebase.",
        icon: Layers3,
      },
      {
        title: "Core CS",
        text: "Strong foundation in DSA, OOP, OS, and System Design.",
        icon: Database,
      },
    ],
  },
  about: {
    intro:
      "My passion lies at the intersection of robust backend systems, intuitive frontend interfaces, and artificial intelligence. I focus on finding smart solutions to complex problems.",
    details: [
      "I am currently pursuing my Bachelor of Technology in Computer Science and Engineering at Lovely Professional University, where I am building a strong foundation in computer engineering principles. During my time as an AI Intern at InternsElite, I successfully applied Python and Machine Learning algorithms to analyze complex training datasets, ultimately yielding a 15% improvement in predictive accuracy for internal models. Beyond academics and my professional work, I continuously push my technical boundaries by actively participating in competitive events like the Web Ka Hackathon and Finovation to refine my problem-solving skills and stay at the cutting edge of modern software development."
    ],
    highlights: [
      { label: "AI & ML Implementation", icon: Sparkles },
      { label: "System Architecture", icon: Server },
      { label: "Adaptability & Management", icon: BriefcaseBusiness },
    ],
  },
  skills: [
    {
      title: "Languages & Core CS",
      icon: Code2,
      description: "Strong foundational knowledge to build robust and optimized logic.",
      items: [
        { name: "C++ & C", level: 90, accent: "from-blue-500 to-indigo-400" },
        { name: "JavaScript", level: 88, accent: "from-yellow-400 to-amber-500" },
        { name: "Data Structures & Algos", level: 85, accent: "from-cyan-500 to-teal-400" },
        { name: "System Design & DBMS", level: 80, accent: "from-emerald-500 to-lime-400" },
      ],
    },
    {
      title: "Web Technologies",
      icon: Globe,
      description: "Modern frameworks and databases for scalable full-stack applications.",
      items: [
        { name: "React.js", level: 88, accent: "from-sky-500 to-cyan-400" },
        { name: "Node.js & PHP", level: 82, accent: "from-green-500 to-emerald-400" },
        { name: "Tailwind CSS", level: 92, accent: "from-teal-500 to-cyan-500" },
        { name: "MySQL & MongoDB", level: 80, accent: "from-amber-500 to-orange-400" },
      ],
    },
    {
      title: "DevOps & Cloud",
      icon: Server,
      description: "Leveraging modern DevOps practices and reliable tools for streamlined deployment workflows.",
      items: [
        { name: "Git & GitHub", level: 88, accent: "from-slate-600 to-gray-400" },
        { name: "Docker", level: 85, accent: "from-cyan-500 to-blue-400" },
        { name: "Maven", level: 75, accent: "from-red-500 to-rose-400" },
        { name: "Python & Gen AI", level: 88, accent: "from-indigo-500 to-purple-500" },
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: "Music Player",
      category: "AI Web Application",
      summary: "A modern music player with Web Audio API, Gemini AI integration, and Drive sync.",
      description:
        "Delivered a themed music player with a Music Visualizer and Equalizer using the Web Audio API. Integrated Google Drive API for library sync and the Gemini AI API to create smart features like an AI DJ, playlist generation, and lyric fetching. Also built a YT-to-MP3 feature using YouTube Search API.",
      image:
        "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=1200&q=80",
      metrics: [
        { label: "Sync Capacity", value: "100+ tracks" },
        { label: "Launch", value: "Feb 2025" },
      ],
      tech: ["JavaScript", "Web Audio API", "Gemini AI", "Google Drive API"],
      details: [
        "Interactive Music Visualizer and Equalizer using Web Audio API.",
        "Gemini AI features including AI DJ (Text-to-Speech) and dynamic playlist generation.",
        "YouTube to MP3 fetching and playback via the YT Search API.",
      ],
      liveUrl: " https://diinesh06082005.github.io/music-player-devops/",
      repoUrl: "https://github.com/Diinesh06082005/music-player-devops",
    },
    {
      id: 2,
      title: "Pro Plus Productivity Dashboard",
      category: "Full Stack Dashboard",
      summary: "A comprehensive productivity app with AI Command Center and streak tracking.",
      description:
        "Engineered an all-in-one productivity application with real-time cloud sync using Firebase. Implemented an AI Command Center using Gemini AI to parse natural language into structured JSON actions. Architected a heavy data system for tracking Projects, Tasks, and Habits.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      metrics: [
        { label: "Export Formats", value: "4 Formats" },
        { label: "Launch", value: "Jan 2025" },
      ],
      tech: ["JavaScript", "Firebase", "Firestore", "Gemini AI"],
      details: [
        "AI Command Center powered by Gemini for natural language task creation.",
        "Comprehensive Project, Task, and Habit tracker with streak calculations.",
        "4-way export functionality to PDF, .ICS (iCal), CSV, and Word documents.",
      ],
      liveUrl: "https://dinesh0189.github.io/task-manager-proplus",
      repoUrl: "https://github.com/Diinesh06082005/task-2-mn",
    },
    {
      id: 3,
      title: "Expense Tracker",
      category: "Full Stack MERN Application",
      summary: "A comprehensive expense tracking application built using the MERN stack.",
      description:
        "Developed a robust full-stack expense tracker application allowing users to manage their daily finances, track income and expenses, and view detailed financial summaries.",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      metrics: [
        { label: "Stack", value: "MERN" },
        { label: "Status", value: "Live" },
      ],
      tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
      details: [
        "RESTful API backend constructed with Node.js and Express.",
        "Interactive and fluid user interface built with React.",
        "Secure and efficient data storage using MongoDB.",
      ],
      liveUrl: "https://expense-tracker-2abo.vercel.app/",
      repoUrl: "https://github.com/Diinesh06082005/expense-tracker4",
    },
  ],
  certifications: [
    {
      title: "Google Advanced Data Analytics Professional",
      issuer: "Coursera",
      year: "Sep '25",
      icon: Trophy,
      tag: "Data Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      fileUrl: certGoogleData,
    },
    {
      title: "AWS Cloud Solutions Architect Professional",
      issuer: "Coursera",
      year: "Sep '25",
      icon: ShieldCheck,
      tag: "Cloud Computing",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      fileUrl: certAwsCloud,
    },
    {
      title: "Google IT Automation with Python",
      issuer: "Coursera",
      year: "Sep '25",
      icon: Code2,
      tag: "Automation",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      fileUrl: certGoogleIT,
    },
    {
      title: "Cloud Computing",
      issuer: "NPTEL",
      year: "Jul '25",
      icon: Server,
      tag: "Cloud Infrastructure",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      fileUrl: certCloudComputing,
    },
    {
      title: "AI Intern Certificate",
      issuer: "InternsElite",
      year: "Feb '24",
      icon: Sparkles,
      tag: "Internship",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80",
      fileUrl: certInternsElite,
    },
    {
      title: "Nimbus Contribution Certificate",
      issuer: "InternsElite",
      year: "Feb '24",
      icon: Award,
      tag: "Achievement",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      fileUrl: certInternsEliteNimbus,
    },
  ],
  contact: {
    title: "Let’s build something intelligent.",
    text: "Whether you need a full-stack developer, an AI solutions enthusiast, or a creative problem solver, I'm ready to bring my dedication and hard work to your team.",
    quickFacts: [
      { label: "Email", value: "dinesh06082005@gmail.com", icon: Mail },
      { label: "Phone", value: "+91-8008590502", icon: Globe },
      { label: "Status", value: "Open to Collaborations", icon: ArrowUpRight },
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/Diinesh06082005", short: "GH" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/DineshGonthina", short: "LI" },
    ],
  },
};
