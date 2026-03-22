import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

const ResumeModal = ({ isOpen, onClose, resumeUrl }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-slate-900 shadow-2xl pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/80 px-6 py-4 backdrop-blur-md">
                <h3 className="font-display text-lg font-semibold text-white">Resume / CV</h3>
                <div className="flex items-center gap-3">
                  <a
                    href={resumeUrl}
                    download
                    className="flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-500/30"
                  >
                    <Download size={16} />
                    Download PDF
                  </a>
                  <button
                    onClick={onClose}
                    className="rounded-full bg-white/10 p-2 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Preview Area */}
              <div className="relative flex-1 bg-slate-950">
                <iframe
                  src={resumeUrl + "#view=FitH"}
                  title="Resume PDF"
                  className="absolute inset-0 h-full w-full border-none"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
