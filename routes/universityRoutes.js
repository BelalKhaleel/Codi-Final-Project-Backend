import express from "express";
import {
  getAllUniversities,
  getUniversityById,
  getUniversityByName,
  createUniversity,
  updateUniversityById,
  updateUniversityByName,
  deleteUniversityById,
  deleteUniversityByName,
} from "../controllers/universityController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all universities
router.get("/", getAllUniversities);

// GET university by ID
router.get("/:id", getUniversityById);

// GET university by name
router.get("/name/:name", getUniversityByName);

// POST create university
router.post("/", authenticateAdmin, createUniversity);

// PUT update university by ID
router.put("/:id", authenticateAdmin, updateUniversityById);

// PUT update university by name
router.put("/name/:name", authenticateAdmin, updateUniversityByName);

// DELETE university by ID
router.delete("/:id", authenticateAdmin, deleteUniversityById);

// DELETE university by name
router.delete("/name/:name", authenticateAdmin, deleteUniversityByName);

export default router;
