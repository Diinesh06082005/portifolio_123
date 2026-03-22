import { motion } from "framer-motion";

const ringTransition = {
  repeat: Number.POSITIVE_INFINITY,
  duration: 2.4,
  ease: "easeInOut",
};

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950"
    >
      <div className="relative flex flex-col items-center gap-6 text-center">
        <div className="relative h-32 w-32">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={ringTransition}
            className="absolute inset-0 rounded-full border border-white/20"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 7, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-cyan-400/40"
          />
          <motion.div
            animate={{ scale: [0.8, 1.05, 0.8], rotate: [0, 180, 360] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.5, ease: "easeInOut" }}
            className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-fuchsia-500 shadow-glow"
          />
        </div>
        <div>
          <p className="font-display text-2xl font-semibold text-white">Loading the experience</p>
          <p className="mt-2 text-sm uppercase tracking-[0.32em] text-slate-400">
            React • Motion • Glass
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
