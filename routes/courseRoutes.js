import express from "express";
import {
  getCourses,
  createCourse,
  getCourseById,
  getCourseByTitle,
  updateCourseById,
  editCourseByTitle,
  deleteCourseById,
  deleteCourseByTitle,
} from "../controllers/courseController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

//GET routes
router.get("/", getCourses);
router.get("/title/:title", getCourseByTitle);
router.get("/:id", getCourseById);

//POST route
router.post("/", authenticateUser, createCourse);

//PUT routes
router.put("/:id", authenticateUser, updateCourseById);
router.put("/title/:title", authenticateUser, editCourseByTitle);

//PATCH routes
router.patch("/:id", authenticateUser, updateCourseById);
router.patch("/title/:title", authenticateUser, editCourseByTitle);

//DELETE routes
router.delete("/:id", authenticateUser, deleteCourseById);
router.delete("/title/:title", authenticateUser, deleteCourseByTitle);

export default router;
