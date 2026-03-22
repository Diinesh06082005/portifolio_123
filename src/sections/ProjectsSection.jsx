import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import GlassPanel from "../components/GlassPanel";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

const ProjectsSection = ({ onProjectSelect }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Create stronger staggered parallax values for more scrolling effect
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const yParallax3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section id="projects" className="section-shell" ref={targetRef}>
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects shaped by modern algorithms and full-stack thinking."
          description="Each project here is set up to showcase process, impact, and implementation quality."
        />

        <div className="grid gap-6 lg:grid-cols-3 xl:gap-8 max-w-7xl mx-auto">
          {portfolioData.projects.map((project, index) => {
            const parallaxStyle =
              index % 3 === 0 ? yParallax1 : index % 3 === 1 ? yParallax2 : yParallax3;

            return (
              <motion.article
                key={project.id}
                style={{ y: parallaxStyle }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: parallaxStyle.get() - 8, scale: 1.02 }}
                className="group w-full"
                data-cursor="hover"
              >
                <GlassPanel className="flex h-full flex-col overflow-hidden p-0 relative">
                  {/* Glowing background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-fuchsia-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl" />
                  
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                    <div className="absolute left-5 top-5">
                      <span className="eyebrow border-white/20 bg-slate-950/[0.35] text-white/[0.85]">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-6 pt-5 relative z-10 transition-transform duration-300">
                    <h3 className="font-display text-2xl font-semibold text-primary">{project.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{project.summary}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span key={item} className="skill-chip border border-white/5 bg-white/5 transition-colors group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition group-hover:bg-white/10 group-hover:border-white/20"
                        >
                          <p className="text-xs text-muted group-hover:text-cyan-200 transition-colors">{metric.label}</p>
                          <p className="mt-1 font-display text-xl font-semibold text-primary">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onProjectSelect(project)}
                      className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-left text-sm text-primary transition hover:border-cyan-300/40 hover:bg-white/20 hover:text-cyan-200 group-hover:border-cyan-500/30"
                    >
                      <span>View project details</span>
                      <ArrowUpRight size={18} className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-300" />
                    </button>
                  </div>
                </GlassPanel>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
