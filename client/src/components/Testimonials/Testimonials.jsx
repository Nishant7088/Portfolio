import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTestimonials } from "../../services/api.js";
import { useInView } from "../../hooks/useInView.js";
import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTestimonials();
        setTestimonials(res.data.data);
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };
    fetchData();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <div className="section-heading">
          <span className="tag">Testimonials</span>
          <h2>What People Say</h2>
        </div>

        <div className="testimonials-grid" ref={ref}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={t._id}
              className="testimonial-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <p className="testimonial-message">"{t.message}"</p>
              <div className="testimonial-author">
                {t.avatarUrl && <img src={t.avatarUrl} alt={t.name} />}
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}{t.company ? ` · ${t.company}` : ""}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
