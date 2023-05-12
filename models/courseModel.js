import mongoose from "mongoose";
const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    donor_id: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    recipient_id: { 
      type: Schema.Types.ObjectId, ref: "User", 
      required: true 
    },
    university_id: { 
      type: Schema.Types.ObjectId, 
      ref: "University" 
    },
  },
  { 
    collection: "courses",
    timestamps: true 
  }
);

bookSchema.pre(["find", "findOne"], function () {
  this.populate(["donor", "recipient", "university"]);
});

const Course = model("Course", courseSchema);

export default Course;
