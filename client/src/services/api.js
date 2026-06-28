import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const secret = sessionStorage.getItem("owner-secret");
  if (secret) {
    config.headers["x-owner-secret"] = secret;
  }
  return config;
});

// Projects
export const getProjects = (params) => api.get("/projects", { params });
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Experience
export const getExperiences = () => api.get("/experience");
export const createExperience = (data) => api.post("/experience", data);
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`);

// Contact
export const sendContactMessage = (data) => api.post("/contact", data);

// Testimonials
export const getTestimonials = () => api.get("/testimonials");

export default api;
