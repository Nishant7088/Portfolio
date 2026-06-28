import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView.js";
import SkillSphere from "../ThreeScene/SkillSphere.jsx";
import "./Skills.css";

const SKILL_CATEGORIES = [
  { title: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React"] },
  { title: "Backend", skills: ["Node", "Express"] },
  { title: "Database", skills: ["MongoDB"] },
  { title: "Programming", skills: ["C", "C++", "Java", "Python"] },
  { title: "Tools", skills: ["VS Code", "Postman", "Git", "MongoDB Atlas", "Figma"] },
  { title: "Soft Skills", skills: ["Communication", "Product Thinking", "Problem Solving"] },
];

const ALL_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.skills);

const Skills = () => {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div className="section-heading">
          <span className="tag">Skills</span>
          <h2>What I Work With</h2>
          <p>A blend of technologies and tools I use to build digital experiences.</p>
        </div>

        <div className="skills-layout">
          <div className="skill-sphere-wrapper">
            <SkillSphere skills={ALL_SKILLS} />
          </div>

          <div className="skill-categories" ref={ref}>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.title}
                className="skill-category glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <h4>{cat.title}</h4>
                <div className="skill-tags">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
