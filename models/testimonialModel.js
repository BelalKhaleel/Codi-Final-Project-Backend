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
      trim: true
    },
  },
  {
    collection: "testimonials",
    timestamps: true,
  }
);

testimonialSchema.pre(["find", "findOne"], function () {
  this.populate("user")
});

const Testimonial = model("Testimonial", testimonialSchema);

export default Testimonial;
