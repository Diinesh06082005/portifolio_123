import { AnimatePresence, motion } from "framer-motion";
import { Menu, MoonStar, SunMedium, X } from "lucide-react";
import { useState } from "react";
import GlassPanel from "./GlassPanel";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const Navbar = ({ isDark, toggleTheme, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 pt-4 sm:pt-6">
      <GlassPanel className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <a href="#home" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.12] text-sm font-semibold text-primary ring-1 ring-white/20 transition group-hover:scale-105">
            DK
          </span>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-semibold tracking-wide text-primary">Dinesh</p>
            <p className="text-xs text-muted">Frontend Engineer</p>
          </div>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-pill ${isActive ? "nav-pill-active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="icon-button"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="icon-button lg:hidden"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </GlassPanel>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="lg:hidden"
          >
            <GlassPanel className="mx-auto mt-3 max-w-6xl px-3 py-3">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`nav-pill justify-between ${activeSection === item.id ? "nav-pill-active" : ""}`}
                  >
                    {item.label}
                    <span className="text-xs text-muted">0{item.id.length}</span>
                  </a>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
