import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import GlassPanel from "./GlassPanel";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [formValues, setFormValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formValues.name.trim()) {
      nextErrors.name = "Please add your name.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Please add your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formValues.message.trim()) {
      nextErrors.message = "Please share a few details about your project.";
    } else if (formValues.message.trim().length < 20) {
      nextErrors.message = "A bit more context helps. Aim for at least 20 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const { name, subject, message } = formValues;
    const mailtoSubject = subject ? encodeURIComponent(subject) : encodeURIComponent("New Message from Portfolio");
    const body = encodeURIComponent(`Hi Dinesh,\n\n${message}\n\nBest regards,\n${name}`);
    window.location.href = `mailto:dinesh06082005@gmail.com?subject=${mailtoSubject}&body=${body}`;

    setStatus({
      type: "success",
      message: "Redirecting to your email client...",
    });
    setFormValues(initialForm);
  };

  const inputClassName =
    "w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-primary outline-none transition placeholder:text-slate-400 focus:border-cyan-300/40 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]";

  return (
    <GlassPanel className="p-6 md:p-8">
      <div className="mb-6">
        <span className="eyebrow">Start a Conversation</span>
        <h3 className="mt-4 font-display text-2xl font-semibold text-primary">
          Tell me about your next idea
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-muted">Name</span>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Your name"
            />
            {errors.name ? <p className="text-sm text-rose-300">{errors.name}</p> : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm text-muted">Email</span>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className={inputClassName}
              placeholder="you@example.com"
            />
            {errors.email ? <p className="text-sm text-rose-300">{errors.email}</p> : null}
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-sm text-muted">Subject</span>
          <input
            type="text"
            name="subject"
            value={formValues.subject}
            onChange={handleChange}
            className={inputClassName}
            placeholder="Project type, timeline, or quick note"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm text-muted">Message</span>
          <textarea
            name="message"
            value={formValues.message}
            onChange={handleChange}
            rows="6"
            className={`${inputClassName} resize-none`}
            placeholder="Share your goals, timeline, and the kind of experience you want to build."
          />
          {errors.message ? <p className="text-sm text-rose-300">{errors.message}</p> : null}
        </label>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
          <button type="submit" className="button-primary min-w-[180px]" disabled={isSubmitting}>
            {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {status ? (
            <motion.div
              key={status.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`rounded-2xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-400/30 bg-emerald-400/[0.12] text-emerald-100"
                  : "border-rose-400/30 bg-rose-400/[0.12] text-rose-100"
              }`}
            >
              {status.message}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>
    </GlassPanel>
  );
};

export default ContactForm;
