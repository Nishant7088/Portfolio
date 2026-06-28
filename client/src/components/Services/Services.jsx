import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView.js";
import "./Services.css";

const SERVICES = [
  { icon: "💻", title: "Frontend Development", desc: "Building fast, accessible, and visually rich interfaces with React." },
  { icon: "🛠️", title: "MERN Development", desc: "End-to-end full-stack applications using MongoDB, Express, React, and Node." },
  { icon: "🎨", title: "UI/UX Design", desc: "Designing intuitive, user-centric experiences with attention to detail." },
  { icon: "📱", title: "Responsive Website Development", desc: "Pixel-perfect websites that adapt seamlessly across all devices." },
  { icon: "🚀", title: "Portfolio Development", desc: "Crafting standout personal portfolios that leave a lasting impression." },
];

const Services = () => {
  const [ref, inView] = useInView();

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-heading">
          <span className="tag">Services</span>
          <h2>What I Offer</h2>
          <p>Helping individuals and teams bring their digital ideas to life.</p>
        </div>

        <div className="services-grid" ref={ref}>
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              className="service-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
