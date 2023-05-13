import mongoose from "mongoose";
const { Schema, model } = mongoose;

const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const University = model("University", universitySchema);

export default University;
