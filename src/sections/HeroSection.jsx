import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolioData";

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        setDisplayedText(text);
        clearInterval(interval);
      }
    }, 45); // Typing speed in ms
    
    return () => clearInterval(interval);
  }, [text]);

  const words = displayedText.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className={`mr-4 inline-block ${index % 5 === 2 ? "text-gradient" : ""}`}>
          {word}
        </span>
      ))}
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[0.1em] h-[0.9em] bg-cyan-400 align-baseline ml-1"
      />
    </>
  );
};

const HeroSection = () => {
  const { hero } = portfolioData;

  return (
    <section id="home" className="section-shell pt-10 sm:pt-16">
      <div className="container max-w-4xl mx-auto flex flex-col items-center text-center pt-4 sm:pt-12 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow inline-flex"
        >
          <Sparkles size={14} />
          {hero.eyebrow}
        </motion.div>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-primary sm:text-6xl xl:text-7xl min-h-[120px]">
          <TypewriterText text={hero.headline} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 max-w-2xl mx-auto text-base leading-8 text-muted sm:text-lg"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row justify-center"
        >
          <a href={hero.primaryCta.href} className="button-primary">
            {hero.primaryCta.label}
            <ArrowRight size={18} />
          </a>
          
          <a href="#resume" className="button-secondary">
            <FileText size={18} className="text-cyan-400" />
            View Resume
          </a>
          
          <a href={hero.secondaryCta.href} className="button-secondary border-none bg-transparent hover:bg-white/5">
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
