/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          lg: "2rem",
          xl: "2.5rem",
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(14, 165, 233, 0.22)",
        glass: "0 25px 60px rgba(2, 6, 23, 0.28)",
      },
      animation: {
        float: "float 10s ease-in-out infinite",
        "pulse-soft": "pulseSoft 7s ease-in-out infinite",
        drift: "drift 18s linear infinite",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.38", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
        drift: {
          from: { transform: "translateX(-8%) rotate(0deg)" },
          to: { transform: "translateX(8%) rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateY(200%)" },
        },
      },
    },
  },
  plugins: [],
};
