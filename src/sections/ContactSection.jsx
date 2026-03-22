import { motion } from "framer-motion";
import GlassPanel from "../components/GlassPanel";
import ContactForm from "../components/ContactForm";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

const ContactSection = () => {
  return (
    <section id="contact" className="section-shell pb-16">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="Get In Touch"
          title={portfolioData.contact.title}
          description={portfolioData.contact.text}
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {portfolioData.contact.quickFacts.map((fact, index) => {
              const Icon = fact.icon;

              return (
                <GlassPanel
                  key={fact.label}
                  as={motion.div}
                  className="flex items-center gap-4 px-5 py-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-200">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted">{fact.label}</p>
                    <p className="mt-1 text-sm font-medium text-primary">{fact.value}</p>
                  </div>
                </GlassPanel>
              );
            })}

            <GlassPanel className="p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-muted">Social Links</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {portfolioData.contact.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-primary transition hover:border-cyan-300/40 hover:bg-white/10"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                      {social.short}
                    </span>
                    {social.label}
                  </a>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
