import express from "express";
import {
  addTestimonial,
  getAllTestimonials,
  getTestimonialById,
  editTestimonialById,
  deleteTestimonialById,
} from "../controllers/testimonialController.js";

const router = express.Router();

// Add a new testimonial
router.post("/", addTestimonial);

// Get all testimonials
router.get("/", getAllTestimonials);

// Get testimonial by ID
router.get("/:id", getTestimonialById);

// Update testimonial by ID
router.put("/:id", editTestimonialById);

// Delete testimonial by ID
router.delete("/:id", deleteTestimonialById);

export default router;
