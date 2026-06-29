import { useState } from "react";
import { motion } from "framer-motion";
import { sendContactMessage } from "../../services/api.js";
import { useInView } from "../../hooks/useInView.js";
import "./Contact.css";

const CONTACT_INFO = [
  { icon: "📞", label: "Phone", value: "+91 70883 11316 ", href: "tel:+917088311316" },
  { icon: "📧", label: "Email", value: "nishant.agarwal@example.com", href: "mailto:nishant.agarwal@example.com" },
  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/nishantagarwal", href: "https://linkedin.com/in/nishantagarwal" },
  { icon: "🐙", label: "GitHub", value: "github.com/nishantagarwal", href: "https://github.com/nishantagarwal" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [ref, inView] = useInView();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    try {
      setSubmitting(true);
      await sendContactMessage(form);
      setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-heading">
          <span className="tag">Contact</span>
          <h2>Let's Work Together</h2>
          <p>Have a project in mind? Reach out and let's build something great.</p>
        </div>

        <div className="contact-layout" ref={ref}>
          <motion.form
            className="contact-form glass-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />

            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />

            <label>Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." />

            {status.message && (
              <p className={status.type === "error" ? "modal-error" : "modal-success"}>{status.message}</p>
            )}

            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {CONTACT_INFO.map((info) => (
              <a key={info.label} href={info.href} target="_blank" rel="noopener noreferrer" className="contact-info-item glass-card">
                <span className="contact-icon">{info.icon}</span>
                <div>
                  <h4>{info.label}</h4>
                  <p>{info.value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
