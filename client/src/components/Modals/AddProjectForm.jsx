import { useState } from "react";
import { createProject } from "../../services/api.js";

const initialState = {
  name: "",
  category: "Frontend",
  shortDescription: "",
  detailedDescription: "",
  technologies: "",
  imageUrl: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  status: "Completed",
  completionDate: "",
};

const AddProjectForm = ({ onClose, onBack }) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.shortDescription || !form.detailedDescription || !form.imageUrl) {
      setError("Please fill all required fields.");
      return;
    }
    try {
      setSubmitting(true);
      await createProject({
        ...form,
        technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        completionDate: form.completionDate || new Date(),
      });
      setSuccess("Project saved successfully!");
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <label>Project Name *</label>
      <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Food Delivery App" />

      <div className="modal-row">
        <div>
          <label>Project Category *</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Frontend</option>
            <option>Full Stack</option>
            <option>UI/UX</option>
            <option>MERN</option>
          </select>
        </div>
        <div>
          <label>Project Status *</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Planned</option>
          </select>
        </div>
      </div>

      <label>Short Description *</label>
      <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} maxLength={200} />

      <label>Detailed Description *</label>
      <textarea name="detailedDescription" value={form.detailedDescription} onChange={handleChange} />

      <label>Technologies Used (comma separated) *</label>
      <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB" />

      <label>Project Image URL *</label>
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." />

      <div className="modal-row">
        <div>
          <label>Github URL</label>
          <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." />
        </div>
        <div>
          <label>Live URL</label>
          <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." />
        </div>
      </div>

      <label>Completion Date</label>
      <input type="date" name="completionDate" value={form.completionDate} onChange={handleChange} />

      <div className="checkbox-row">
        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
        <label style={{ margin: 0 }}>Featured Project</label>
      </div>

      {error && <p className="modal-error">{error}</p>}
      {success && <p className="modal-success">{success}</p>}

      <div className="modal-actions">
        <button type="button" className="btn btn-outline" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;
