import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { ownerAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", ownerAuth, createProject);
router.put("/:id", ownerAuth, updateProject);
router.delete("/:id", ownerAuth, deleteProject);

export default router;
