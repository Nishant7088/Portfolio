import express from "express";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";
import { ownerAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getExperiences);
router.post("/", ownerAuth, createExperience);
router.put("/:id", ownerAuth, updateExperience);
router.delete("/:id", ownerAuth, deleteExperience);

export default router;
