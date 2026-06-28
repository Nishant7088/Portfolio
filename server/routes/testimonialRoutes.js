import express from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonialController.js";
import { ownerAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", ownerAuth, createTestimonial);

export default router;
