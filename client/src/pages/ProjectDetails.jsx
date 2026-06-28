import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProjectById } from "../services/api.js";
import "../css/ProjectDetails.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await getProjectById(id);
        setProject(res.data.data);
      } catch (err) {
        setError("Project not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <div className="project-details-state container">Loading project...</div>;
  }

  if (error || !project) {
    return (
      <div className="project-details-state container">
        <p>{error || "Project not found."}</p>
        <button className="btn btn-outline" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <section className="project-details">
      <div className="container">
        <Link to="/#projects" className="back-link">
          ← Back to Projects
        </Link>

        <motion.div
          className="project-details-hero glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={project.imageUrl} alt={project.name} className="project-details-image" />
          <div className="project-details-content">
            <span className="tag">{project.category}</span>
            <h1>{project.name}</h1>
            <p className="project-details-short">{project.shortDescription}</p>

            <div className="project-details-tech">
              {project.technologies?.map((tech) => (
                <span key={tech} className="skill-tag">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-details-links">
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

        <motion.div
          className="project-details-description glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2>About This Project</h2>
          <p>{project.detailedDescription}</p>

          <div className="project-details-meta">
            <div>
              <h4>Status</h4>
              <p>{project.status}</p>
            </div>
            <div>
              <h4>Completion Date</h4>
              <p>{new Date(project.completionDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetails;
