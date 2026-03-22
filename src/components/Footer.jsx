import { portfolioData } from "../data/portfolioData";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 pb-10 pt-8">
      <div className="container flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {portfolioData.personal.name}. Crafted with React, Tailwind
          CSS, and motion.
        </p>
        <div className="flex flex-wrap gap-3">
          {portfolioData.contact.socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-cyan-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
