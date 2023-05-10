import mongoose from "mongoose";

const { Schema, model } = mongoose;

const testimonialSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    collection: "testimonials",
    timestamps: true,
  }
);

const Testimonial = model("Testimonial", testimonialSchema);

export default Testimonial;
