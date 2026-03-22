import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, X, Play, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const ProjectModal = ({ project, onClose }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    if (!project) {
      return undefined;
    }
    
    // Reset preview mode when opened/changed
    setIsPreviewMode(false);

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, project]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/[0.78] px-4 py-6 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={`glass-panel w-full flex flex-col transition-all duration-300 ${isPreviewMode ? "h-[90vh] max-w-6xl overflow-hidden" : "max-h-[90vh] max-w-4xl overflow-y-auto"}`}
            onClick={(event) => event.stopPropagation()}
          >
            {isPreviewMode ? (
              // Live Interactive Preview Mode
              <>
                <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Monitor size={20} className="text-cyan-400" />
                    <h3 className="text-white font-display text-lg font-medium">{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 rounded-full border border-cyan-500 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20"
                    >
                      <ExternalLink size={16} /> Open in New Page
                    </a>
                    <button 
                      onClick={() => setIsPreviewMode(false)} 
                      className="rounded-full bg-white/10 p-2 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
                      title="Back to Details"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-slate-950 relative">
                  <iframe 
                    src={project.liveUrl} 
                    className="absolute inset-0 w-full h-full border-none" 
                    title={`${project.title} Live Preview`} 
                    allowFullScreen 
                  />
                </div>
              </>
            ) : (
              // Standard Details Mode
              <>
                <div className="relative h-64 overflow-hidden md:h-80 flex-shrink-0">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/[0.35] to-transparent" />
                  <button
                    type="button"
                    onClick={onClose}
                    className="icon-button absolute right-5 top-5"
                    aria-label="Close project details"
                  >
                    <X size={18} />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="eyebrow border-white/20 bg-slate-950/[0.35] text-white/[0.85]">
                      {project.category}
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-8 p-6 md:grid-cols-[1.2fr,0.8fr] md:p-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-muted">Highlights</p>
                      <div className="mt-4 space-y-3">
                        {project.details.map((detail) => (
                          <div
                            key={detail}
                            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                          >
                            <ArrowUpRight size={18} className="mt-0.5 text-cyan-300" />
                            <p className="text-sm leading-6 text-muted">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-muted">Technology</p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {project.tech.map((item) => (
                          <span key={item} className="skill-chip border border-white/10 bg-white/5">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm">
                        <p className="text-sm text-muted">{metric.label}</p>
                        <p className="mt-2 font-display text-3xl font-semibold text-primary text-cyan-50">
                          {metric.value}
                        </p>
                      </div>
                    ))}

                    <div className="flex flex-col gap-3 pt-2">
                      <button onClick={() => setIsPreviewMode(true)} className="button-primary w-full justify-center">
                        <Play size={18} className="fill-current" />
                        Preview in Portfolio
                      </button>
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button-secondary w-full justify-center">
                        <ExternalLink size={18} />
                        Open live in new tab
                      </a>
                      <a href={project.repoUrl} target="_blank" rel="noreferrer" className="button-secondary w-full justify-center border-white/10">
                        <Github size={18} />
                        Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ProjectModal;
