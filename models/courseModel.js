import mongoose from "mongoose";
const { Schema, model } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: { 
      type: String,
      required: false,
      trim: true
    },
    donor: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    recipient: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: false
    },
    university: { 
      type: Schema.Types.ObjectId, 
      ref: "University",
      required: true
    },
  },
  { 
    collection: "courses",
    timestamps: true 
  }
);

courseSchema.pre(["find", "findOne"], function () {
  this.populate(["donor", "recipient", "university"])
});

const Course = model("Course", courseSchema);

export default Course;
