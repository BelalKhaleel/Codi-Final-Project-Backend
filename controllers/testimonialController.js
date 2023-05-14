import Testimonial from "../models/testimonialModel.js";

// Add a new testimonial
// Add a new testimonial
export const addTestimonial = async (req, res) => {
  console.log(req.body);
  try {
    const { user, comment } = req.body;
    const newTestimonial = new Testimonial({ user, comment });
    if (!comment) {
      return res.status(400).json({ error: "Please provide a comment" });
    }
    const savedTestimonial = await newTestimonial.save();
    const populatedTestimonial = await Testimonial.findById(savedTestimonial._id).populate("user");
    res.status(201).json({
      message: "Testimonial added successfully.",
      data: { id: savedTestimonial._id, info: populatedTestimonial },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to add testimonial." });
  }
};


// Get all testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().populate("user");
    res.json({
      message: "Testimonials fetched successfully.",
      data: testimonials,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to get testimonials." });
  }
};

// Get a testimonial by ID
export const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id).populate("user");
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }
    res.json({
      message: "Testimonial fetched successfully.", testimonial
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to get testimonial." });
  }
};

// Edit a testimonial by ID
export const editTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, comment } = req.body;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { user, comment },
      { new: true }
    );
    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }
    res.json({
      message: "Testimonial updated successfully.",
      data: { id: updatedTestimonial._id, info: updatedTestimonial },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to update testimonial." });
  }
};

// Delete a testimonial by ID
export const deleteTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimonial = await Testimonial.findByIdAndRemove(id);
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }
    res.json({
      message: "Testimonial deleted successfully.", deletedTestimonial
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to delete testimonial." });
  }
};
