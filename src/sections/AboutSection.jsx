import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlassPanel from "../components/GlassPanel";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

const AboutSection = () => {
  const { about, personal } = portfolioData;
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const imgParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" className="section-shell" ref={targetRef}>
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="About Me"
          title="Frontend craft with a designer’s eye for rhythm and detail."
          description={about.intro}
        />

        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
          <motion.div
            style={{ y: imgParallax }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center justify-center p-6"
          >
            <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center group">
               {/* Outermost strong glow */}
               <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl group-hover:bg-cyan-400/40 group-hover:blur-[80px] transition-all duration-700" />
               
               {/* Clockwise rotating dialer ring */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                 className="absolute inset-[1px] rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(34,211,238,1)_360deg)] shadow-[0_0_30px_rgba(34,211,238,0.6)]"
               />

               {/* Counter-clockwise rotating dialer ring */}
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                 className="absolute inset-[-4px] rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(232,121,249,0.8)_360deg)] blur-[2px]"
               />
               
               {/* Inner glass ring */}
               <div className="absolute inset-0 z-10 rounded-full border border-white/20 shadow-[inset_0_4px_30px_rgba(255,255,255,0.1)] backdrop-blur-sm" />

               {/* The Profile Image */}
               <div className="relative z-20 w-full h-full rounded-full overflow-hidden border-[6px] border-slate-900/80 bg-slate-900 p-1">
                 <img
                    src={personal.profileImage}
                    alt={`${personal.name} portrait`}
                    className="w-full h-full object-cover rounded-full grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                 />
                 {/* Internal specular overlay to make it look like glass glass */}
                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-transparent pointer-events-none" />
               </div>
            </div>
          </motion.div>

          <motion.div style={{ y: textParallax }} className="space-y-6">
            {about.details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassPanel className="px-6 py-6 transition-transform duration-300 hover:scale-[1.01] hover:bg-white/10 md:px-8 md:py-8">
                  <p className="text-base sm:text-lg leading-relaxed text-muted/90">{detail}</p>
                </GlassPanel>
              </motion.div>
            ))}

            <div className="grid gap-4 sm:grid-cols-3">
              {about.highlights.map((highlight, index) => {
                const Icon = highlight.icon;

                return (
                  <motion.div
                    key={highlight.label}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55, delay: 0.2 + index * 0.08 }}
                  >
                    <GlassPanel className="h-full px-5 py-5 group transition-colors duration-300 hover:border-cyan-500/30 hover:bg-white/10">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200 transition-transform duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:text-cyan-100">
                        <Icon size={20} />
                      </div>
                      <p className="mt-4 text-sm leading-6 text-primary">{highlight.label}</p>
                    </GlassPanel>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
