import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import GlassPanel from "../components/GlassPanel";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";
import { X } from "lucide-react";

const TiltCard = ({ certification, index, onClick, isSelected }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = certification.icon;

  return (
    <motion.div
      layoutId={isSelected ? undefined : `cert-${certification.title}`}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-[85vw] sm:w-[380px] cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => onClick(certification)}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full group rounded-[2rem]"
      >
        <GlassPanel 
          className="h-full p-6 relative overflow-hidden flex flex-col transition-all duration-300 group-hover:border-white/30 group-hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Hover Image Background */}
          {certification.image && (
            <>
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-500 group-hover:opacity-40" 
                style={{ backgroundImage: `url(${certification.image})`, transform: "translateZ(1px)" }} 
              />
              <div 
                className="absolute inset-0 z-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                style={{ transform: "translateZ(2px)" }}
              />
            </>
          )}
          
          {/* Content */}
          <div className="relative z-10 flex items-start justify-between gap-4" style={{ transform: "translateZ(50px)" }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-cyan-200 transition-colors duration-300 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 shadow-xl">
              <Icon size={22} />
            </div>
            <span className="eyebrow bg-background/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">{certification.tag}</span>
          </div>

          <div className="relative z-10 mt-auto pt-14" style={{ transform: "translateZ(40px)" }}>
            <h3 className="font-display text-2xl font-semibold text-primary transition-colors group-hover:text-white drop-shadow-md">
              {certification.title}
            </h3>
            <p className="mt-3 text-sm text-cyan-100/70 font-medium">{certification.issuer}</p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 shadow-lg">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/50">Year</p>
              <p className="mt-1 text-sm font-medium text-white">{certification.year}</p>
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="section-shell relative">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials that support the craft behind the interface."
          description="A selection of distinct qualifications and continuous learning achievements backing my skillset."
        />

        {/* Horizontal scroll container with hidden scrollbar */}
        <div className="flex gap-6 overflow-x-auto pb-10 pt-4 px-4 -mx-4 scroll-smooth snap-x snap-mandatory flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {portfolioData.certifications.map((certification, index) => (
            <div key={certification.title} className="snap-center flex items-stretch">
              <TiltCard 
                certification={certification} 
                index={index} 
                isSelected={selectedCert?.title === certification.title}
                onClick={(cert) => setSelectedCert(cert)} 
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div
                layoutId={`cert-${selectedCert.title}`}
                className="relative w-full max-w-4xl max-h-[90vh] rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 shadow-2xl pointer-events-auto flex flex-col"
              >
                <div className="relative w-full h-[50vh] md:h-[65vh] flex-shrink-0 bg-slate-950 p-2 border-b border-white/10">
                  {selectedCert.fileUrl && String(selectedCert.fileUrl).toLowerCase().includes(".pdf") ? (
                    <iframe
                      src={`${selectedCert.fileUrl}#view=FitH`}
                      title={selectedCert.title}
                      className="w-full h-full rounded-2xl bg-white border-none"
                    />
                  ) : selectedCert.fileUrl ? (
                    <img
                      src={selectedCert.fileUrl}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain rounded-2xl bg-black/50"
                    />
                  ) : (
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="w-full h-full object-cover opacity-60 rounded-2xl"
                    />
                  )}
                  
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent pointer-events-none" />
                  
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/60 border border-white/20 text-white backdrop-blur-md transition-colors hover:bg-slate-950 shadow-xl z-20"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start gap-6 relative z-10 overflow-y-auto">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-4 shadow-lg">
                      {(() => {
                        const Icon = selectedCert.icon;
                        return <Icon size={18} className="text-cyan-300" />;
                      })()}
                      <span className="text-sm font-medium text-cyan-50">{selectedCert.tag}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">
                      {selectedCert.title}
                    </h2>
                    <p className="text-lg text-cyan-100/80">{selectedCert.issuer}</p>
                  </div>

                  <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
                    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-4 min-w-[160px] shadow-lg flex-shrink-0">
                      <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/50">Awarded</p>
                      <p className="mt-1 text-xl font-medium text-white">{selectedCert.year}</p>
                    </div>
                    {selectedCert.fileUrl && (
                      <a href={selectedCert.fileUrl} download className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-500/20 shadow-lg">
                        Download Credential
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;
