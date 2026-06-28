import { useState } from "react";
import { motion } from "framer-motion";
import AddProjectForm from "./AddProjectForm.jsx";
import AddExperienceForm from "./AddExperienceForm.jsx";
import "./Modal.css";

const AddContentModal = ({ onClose }) => {
  const [type, setType] = useState(null); // "project" | "experience"

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-content glass-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Add Content</h3>

        {!type && (
          <div className="modal-tabs">
            <button onClick={() => setType("project")}>+ Add Project</button>
            <button onClick={() => setType("experience")}>+ Add Experience</button>
          </div>
        )}

        {type === "project" && <AddProjectForm onClose={onClose} onBack={() => setType(null)} />}
        {type === "experience" && <AddExperienceForm onClose={onClose} onBack={() => setType(null)} />}
      </motion.div>
    </div>
  );
};

export default AddContentModal;
