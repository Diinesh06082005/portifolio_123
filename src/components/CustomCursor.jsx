import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const SPRING = { stiffness: 500, damping: 32, mass: 0.6 };

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cursorX = useSpring(x, SPRING);
  const cursorY = useSpring(y, SPRING);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      x.set(event.clientX - 14);
      y.set(event.clientY - 14);
    };

    const hoverSelector = "a, button, input, textarea, [data-cursor='hover']";
    const handlePointerOver = (event) => {
      setHovering(Boolean(event.target.closest(hoverSelector)));
    };
    const handlePointerOut = (event) => {
      if (!event.relatedTarget?.closest?.(hoverSelector)) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handlePointerOver);
    document.addEventListener("mouseout", handlePointerOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handlePointerOver);
      document.removeEventListener("mouseout", handlePointerOut);
    };
  }, [enabled, x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        style={{ translateX: cursorX, translateY: cursorY }}
        className="pointer-events-none fixed left-[-286px] top-[-286px] z-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/15 to-fuchsia-500/15 blur-[120px]"
      />
      <motion.div
        style={{ translateX: cursorX, translateY: cursorY }}
        animate={{
          width: hovering ? 64 : 28,
          height: hovering ? 64 : 28,
          opacity: hovering ? 0.65 : 1,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-white/30 bg-white/10 backdrop-blur-md mix-blend-screen"
      />
      <motion.div
        style={{ translateX: cursorX, translateY: cursorY }}
        animate={{
          scale: hovering ? 0.6 : 1,
          opacity: hovering ? 0 : 1,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[91] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
      />
    </>
  );
};

export default CustomCursor;
