import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView.js";
import "./About.css";

const STATS = [
  { value: 12, suffix: "+", label: "Frontend Projects" },
  { value: 5, suffix: "+", label: "UI/UX Projects" },
  { value: 100, suffix: "+", label: "GeeksForGeeks Problems" },
];

const TIMELINE = [
  {
    title: "B.Tech CSE (IoT)",
    subtitle: "Education",
    description: "Pursued a Bachelor of Technology in Computer Science with a specialization in Internet of Things (IoT).",
  },
  {
    title: "Accenture Virtual Experience",
    subtitle: "Industry Program",
    description: "Completed the Accenture Product Designer Virtual Experience Program focused on product thinking and design.",
  },
  {
    title: "Career Objective",
    subtitle: "Goal",
    description: "Aspiring to build performant, user-centric full-stack applications while continuously sharpening design and engineering skills.",
  },
];

const Counter = ({ value, suffix, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [trigger, value]);

  return <span>{count}{suffix}</span>;
};

const About = () => {
  const [statsRef, statsInView] = useInView();

  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-heading">
          <span className="tag">About Me</span>
          <h2>Who I Am</h2>
          <p>A glimpse into my education, experience, and what drives me.</p>
        </div>

        <div className="about-timeline">
          {TIMELINE.map((item, idx) => {
            const [ref, inView] = useInView();
            return (
              <motion.div
                ref={ref}
                key={item.title}
                className="timeline-item glass-card"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="timeline-subtitle">{item.subtitle}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="about-stats" ref={statsRef}>
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card glass-card">
              <h3 className="gradient-text">
                <Counter value={stat.value} suffix={stat.suffix} trigger={statsInView} />
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
