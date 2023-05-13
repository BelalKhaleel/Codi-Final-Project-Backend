import express from "express";
import {
  getAllUniversities,
  getUniversityById,
  getUniversityByName,
  createUniversity,
  updateUniversityById,
  updateUniversityByName,
  deleteUniversityById,
  deleteUniversityByName
} from "../controllers/universityController.js";

const router = express.Router();

// GET all universities
router.get("/", getAllUniversities);

// GET university by ID
router.get("/:id", getUniversityById);

// GET university by name
router.get("/name/:name", getUniversityByName);

// POST create university
router.post("/", createUniversity);

// PUT update university by ID
router.put("/:id", updateUniversityById);

// PUT update university by name
router.put("/name/:name", updateUniversityByName);

// DELETE university by ID
router.delete("/:id", deleteUniversityById);

// DELETE university by name
router.delete('/name/:name', deleteUniversityByName);


export default router;
