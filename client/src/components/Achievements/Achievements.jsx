import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView.js";
import "./Achievements.css";

const ACHIEVEMENTS = [
  { icon: "🏆", title: "100+ GeeksForGeeks Problems", desc: "Solved over 100 data structure and algorithm problems." },
  { icon: "⭐", title: "HackerRank 4 Star", desc: "Achieved a 4-star rating in problem solving on HackerRank." },
  { icon: "🎯", title: "Accenture Product Designer Experience", desc: "Completed Accenture's Product Designer Virtual Experience Program." },
  { icon: "🥇", title: "College Competition Achievement", desc: "Recognized for outstanding performance in a college-level tech competition." },
];

const Achievements = () => {
  const [ref, inView] = useInView();

  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <div className="section-heading">
          <span className="tag">Achievements</span>
          <h2>Milestones</h2>
          <p>A few highlights from my learning and growth journey.</p>
        </div>

        <div className="achievements-grid" ref={ref}>
          {ACHIEVEMENTS.map((item, idx) => (
            <motion.div
              key={item.title}
              className="achievement-card glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="achievement-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
