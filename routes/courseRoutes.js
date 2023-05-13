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

const router = express.Router();

//GET routes
router.get("/", getCourses);
router.get("/title/:title", getCourseByTitle);
router.get("/:id", getCourseById);

//POST route
router.post("/", createCourse);

//PUT routes
router.put("/:id", updateCourseById);
router.put("/title/:title", editCourseByTitle);

//PATCH routes
router.patch("/:id", updateCourseById);
router.patch("/title/:title", editCourseByTitle);

//DELETE routes
router.delete("/:id", deleteCourseById);
router.delete("/title/:title", deleteCourseByTitle);

export default router;
