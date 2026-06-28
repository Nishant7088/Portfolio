import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../services/api.js";
import { useInView } from "../../hooks/useInView.js";
import "./Projects.css";

const CATEGORIES = ["All", "Frontend", "Full Stack", "UI/UX", "MERN"];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProjects({ category, search, sort });
        setProjects(res.data.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    const debounce = setTimeout(fetchData, 300);
    return () => clearTimeout(debounce);
  }, [category, search, sort]);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-heading">
          <span className="tag">Projects</span>
          <h2>Things I've Built</h2>
          <p>A selection of my recent frontend and full-stack work.</p>
        </div>

        <div className="projects-controls">
          <div className="filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={category === cat ? "active" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-sort">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="project-search"
            />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="project-sort">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Featured</option>
            </select>
          </div>
        </div>

        <div className="projects-grid" ref={ref}>
          {loading && <p className="projects-empty">Loading projects...</p>}
          {!loading && projects.length === 0 && (
            <p className="projects-empty">No projects found. Check back soon!</p>
          )}

          {projects.map((project, idx) => (
            <motion.div
              key={project._id}
              className="project-card glass-card clickable"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              onClick={() => navigate(`/projects/${project._id}`)}
            >
              {project.featured && <span className="featured-badge">Featured</span>}
              <div className="project-image">
                <img src={project.imageUrl} alt={project.name} loading="lazy" />
              </div>
              <div className="project-body">
                <h3>{project.name}</h3>
                <p>{project.shortDescription}</p>
                <div className="project-tech">
                  {project.technologies?.slice(0, 4).map((tech) => (
                    <span key={tech} className="skill-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links" onClick={(e) => e.stopPropagation()}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                      Github
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
