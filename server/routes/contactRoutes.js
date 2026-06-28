import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";
import { ownerAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", ownerAuth, getContacts);

export default router;
