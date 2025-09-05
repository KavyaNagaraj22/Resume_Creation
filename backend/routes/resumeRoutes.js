import verifyToken from "../middleware/authMiddleware.js";
import express from "express";
import {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume, // ✅ Now this will work
} from "../controllers/resumeController.js";


const router = express.Router();

router.get("/", getAllResumes);
router.get("/:id", getResumeById);
router.post("/", verifyToken, createResume);
router.put("/:id", verifyToken, updateResume);
router.delete("/:id", deleteResume);

export default router;


