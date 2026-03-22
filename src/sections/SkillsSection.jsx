import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GlassPanel from "../components/GlassPanel";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

const SkillsSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const yCol1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="skills" className="section-shell" ref={targetRef}>
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit shaped for polished interfaces and reliable delivery."
          description="I focus on pairing visual craft with durable engineering choices, so the final product looks great and stays maintainable."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {portfolioData.skills.map((skillGroup, groupIndex) => {
            const Icon = skillGroup.icon;
            const yTransform =
              groupIndex % 3 === 0 ? yCol1 : groupIndex % 3 === 1 ? yCol2 : yCol3;

            return (
              <motion.div
                key={skillGroup.title}
                style={{ y: yTransform }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
              >
                <GlassPanel className="h-full p-6 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <span className="eyebrow">{skillGroup.title}</span>
                      <motion.h3 
                        animate={{ 
                          opacity: [0.8, 1, 0.8], 
                          textShadow: ["0px 0px 0px rgba(34,211,238,0)", "0px 0px 8px rgba(34,211,238,0.6)", "0px 0px 0px rgba(34,211,238,0)"] 
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: groupIndex * 0.3 }}
                        className="mt-4 font-display text-2xl font-semibold text-primary transition-colors group-hover:text-cyan-200"
                      >
                        {skillGroup.title}
                      </motion.h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-cyan-500/20">
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className="relative z-10 mt-4 text-sm leading-6 text-muted">{skillGroup.description}</p>

                  <div className="relative z-10 mt-8 grid grid-cols-2 gap-3">
                    {skillGroup.items.map((item) => (
                      <motion.span
                        key={item.name}
                        whileHover={{ y: -2, scale: 1.05 }}
                        className="flex items-center rounded-xl border border-white/10 bg-white/5 p-3 text-xs md:text-sm font-medium text-primary shadow-sm backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-cyan-500/10"
                        data-cursor="hover"
                      >
                        <span className={`mr-2.5 h-2 w-2 rounded-full bg-gradient-to-r shadow-[0_0_8px_rgba(255,255,255,0.3)] ${item.accent}`} />
                        {item.name}
                      </motion.span>
                    ))}
                  </div>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
