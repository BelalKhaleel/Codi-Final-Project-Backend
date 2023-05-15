import University from "../models/universityModel.js";
import Course from "../models/courseModel.js";

// Get all universities
export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    res.status(200).json(universities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single university by id
export const getUniversityById = async (req, res) => {
  const { id } = req.params;
  try {
    const university = await University.findById(id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: 'University retrieved!', university});
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid university id" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single university by name
export const getUniversityByName = async (req, res) => {
  const { name } = req.params;
  try {
    const university = await University.findOne({ name });
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: 'University retrieved!', university});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new university
export const createUniversity = async (req, res) => {
  const { name, course } = req.body;
  if(!name) {
    return res.status(400).json({ message: "Please choose a university" }); 
  }
  try {
    const existingUniversity = await University.findOne({ name });
    if (existingUniversity) {
      return res.status(400).json({ message: "University already exists" });
    }
    const university = await University.create({ name, course });
    res.status(201).json(university);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing university by id
export const updateUniversityById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Please provide university id" });
  }
  const update = req.body;
  try {
    const university = await University.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res
      .status(200)
      .json({ message: "University updated successfully!", university });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid university id" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing university by name
export const updateUniversityByName = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ message: "Please provide university name" });
  }
  const { newName } = req.body;
  try {
    const university = await University.findOneAndUpdate(
      { name },
      { name: newName },
      { new: true, runValidators: true }
    );
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res
      .status(200)
      .json({ message: "University updated successfully!", university });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid university name" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an existing university by id
export const deleteUniversityById = async (req, res) => {
  const { id } = req.params;
  try {
    const university = await University.findByIdAndDelete(id);
    if (!university) {
      throw new Error("University not found");
    }
    const { name } = university;
    res.status(200).json({
      message: "University deleted successfully",
      id,
      name,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "University not found" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an existing university by name
export const deleteUniversityByName = async (req, res) => {
  const { name } = req.params;
  try {
    const university = await University.findOneAndDelete({ name });
    if (!university) {
      throw new Error("University not found");
    }
    const { _id, name: deletedName } = university;
    res.status(200).json({
      message: "University deleted successfully",
      id: _id,
      name: deletedName,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "University not found") {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
