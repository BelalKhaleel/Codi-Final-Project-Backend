import Course from "../models/courseModel.js";
import mongoose from "mongoose";

// POST /courses
// Create a new course
const createCourse = async (req, res, next) => {
  const { title, description, donor, recipient, university } = req.body;

  try {
    // Validate required fields
    if (!title) throw new Error("Title is required.");
    if (!donor) throw new Error("Donor ID is required.");
    if (!university) throw new Error("University ID is required.");

    const courseData = { title, description, donor, university };

    // Only add recipient_id to courseData if it is provided in the request body
    if (recipient) {
      courseData.recipient = recipient;
    }

    const course = new Course(courseData);
    const newCourse = await course.save();

    // Retrieve the new course from the database and populate the donor, recipient, and university fields
    const populatedCourse = await Course.findById(newCourse._id)
      .populate("donor", { fullName: 1, email: 1, phoneNumber: 1, Address: 1 })
      .populate("recipient", {
        fullName: 1,
        email: 1,
        phoneNumber: 1,
        Address: 1,
      })
      .populate("university", { name: 1 })
      .exec();

    res
      .status(201)
      .json({ message: "Course created successfully.", data: populatedCourse });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
    next(error);
  }
};

// GET /courses
// Get all courses
const getCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get page number from query parameter, default to 1
    const perPage = parseInt(req.query.perPage) || 10; // Get number of items per page from query parameter, default to 10

    const courses = await Course.find()
      .skip((page - 1) * perPage) // Skip the first (page - 1) * perPage items
      .limit(perPage) // Return only perPage items
      .populate(["donor", "recipient", "university"]);

    res.status(200).json({
      message: "Courses retrieved successfully.",
      data: courses,
      currentPage: page,
      totalPages: Math.ceil((await Course.countDocuments()) / perPage),
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};


// GET /courses/:id
// Get a course by id
const getCourseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id).populate([
      "donor",
      "recipient",
      "university",
    ]);
    if (course) {
      res
        .status(200)
        .json({ message: "Course retrieved successfully.", data: course });
    } else {
      res.status(404).json({ message: "Course not found." });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(404).json({ message: "Course not found." });
    } else {
      res.status(500).json({ message: "Something went wrong." });
    }
  }
};

// Get course by title
export const getCourseByTitle = async (req, res) => {
  try {
    const course = await Course.findOne({ title: req.params.title })
      .populate("donor_id")
      .populate("recipient_id")
      .populate("university_id");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// PUT /courses/:id
// Update a course by id
const updateCourseById = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, donor_id, recipient_id, university_id } =
    req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, donor_id, recipient_id, university_id },
      { new: true }
    ).populate(["donor", "recipient", "university"]);
    if (updatedCourse) {
      res
        .status(200)
        .json({ message: "Course updated successfully.", data: updatedCourse });
    } else {
      res.status(404).json({ message: "Course not found." });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid data." });
  }
};

// Edit course by title
export const editCourseByTitle = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// DELETE /courses/:id
// Delete a course by id
const deleteCourseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndRemove(id);
    if (deletedCourse) {
      res.status(200).json({
        message: "Course deleted successfully.",
        data: { id: deletedCourse._id, info: deletedCourse },
      });
    } else {
      res.status(404).json({ message: "Course not found." });
    }
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ message: "Course not found." });
    }
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Delete course by title
export const deleteCourseByTitle = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ title: req.params.title });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({
      message: "Course deleted successfully",
      data: { id: course._id, info: course },
    });
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ message: "Course not found." });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getCourses,
  createCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
};
