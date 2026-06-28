import { useState } from "react";
import { createExperience } from "../../services/api.js";

const initialState = {
  companyName: "",
  role: "",
  employmentType: "Internship",
  location: "",
  startDate: "",
  endDate: "",
  currentCompany: false,
  description: "",
  skillsUsed: "",
};

const AddExperienceForm = ({ onClose, onBack }) => {
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
    if (!form.companyName || !form.role || !form.startDate || !form.description) {
      setError("Please fill all required fields.");
      return;
    }
    try {
      setSubmitting(true);
      await createExperience({
        ...form,
        skillsUsed: form.skillsUsed.split(",").map((s) => s.trim()).filter(Boolean),
        endDate: form.currentCompany ? null : form.endDate,
      });
      setSuccess("Experience saved successfully!");
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save experience.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <label>Company Name *</label>
      <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="e.g. Accenture" />

      <label>Role *</label>
      <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Developer" />

      <div className="modal-row">
        <div>
          <label>Employment Type</label>
          <select name="employmentType" value={form.employmentType} onChange={handleChange}>
            <option>Internship</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Virtual Experience</option>
            <option>Freelance</option>
          </select>
        </div>
        <div>
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} placeholder="Remote / City" />
        </div>
      </div>

      <div className="modal-row">
        <div>
          <label>Start Date *</label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            disabled={form.currentCompany}
          />
        </div>
      </div>

      <div className="checkbox-row">
        <input type="checkbox" name="currentCompany" checked={form.currentCompany} onChange={handleChange} />
        <label style={{ margin: 0 }}>Currently Working Here</label>
      </div>

      <label>Description *</label>
      <textarea name="description" value={form.description} onChange={handleChange} />

      <label>Skills Used (comma separated)</label>
      <input name="skillsUsed" value={form.skillsUsed} onChange={handleChange} placeholder="React, Node.js, Figma" />

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

export default AddExperienceForm;
