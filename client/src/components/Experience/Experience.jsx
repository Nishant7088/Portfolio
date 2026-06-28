import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getExperiences } from "../../services/api.js";
import { useInView } from "../../hooks/useInView.js";
import "./Experience.css";

const formatDate = (date) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExperiences();
        setExperiences(res.data.data);
      } catch (err) {
        console.error("Failed to fetch experiences", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="section-heading">
          <span className="tag">Experience</span>
          <h2>My Journey</h2>
          <p>Professional and virtual experiences that shaped my skills.</p>
        </div>

        <div className="experience-list" ref={ref}>
          {loading && <p className="experience-empty">Loading experience...</p>}
          {!loading && experiences.length === 0 && (
            <p className="experience-empty">Experience details coming soon.</p>
          )}

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id}
              className="experience-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="experience-dot" />
              <div className="experience-content">
                <div className="experience-header">
                  <h3>{exp.role}</h3>
                  <span className="experience-date">
                    {formatDate(exp.startDate)} — {exp.currentCompany ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="experience-company">
                  {exp.companyName} · {exp.employmentType} {exp.location && `· ${exp.location}`}
                </p>
                <p className="experience-description">{exp.description}</p>
                {exp.skillsUsed?.length > 0 && (
                  <div className="experience-skills">
                    {exp.skillsUsed.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
