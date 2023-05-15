import express from "express";
import {
  addTestimonial,
  getAllTestimonials,
  getTestimonialById,
  editTestimonialById,
  deleteTestimonialById,
} from "../controllers/testimonialController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new testimonial
router.post("/", authenticateUser, addTestimonial);

// Get all testimonials
router.get("/", getAllTestimonials);

// Get testimonial by ID
router.get("/:id", getTestimonialById);

// Update testimonial by ID
router.put("/:id", authenticateUser, editTestimonialById);

// Delete testimonial by ID
router.delete("/:id", authenticateUser, deleteTestimonialById);

export default router;
