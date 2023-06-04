import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import User from "./userModel.js";
import University from "./universityModel.js";

const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    course: {
      type: String,
      required: false,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    university: {
      type: Schema.Types.ObjectId,
      ref: "University",
      required: [true, "University is required"],
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Donor is required"],
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    condition: {
      type: String,
      enum: ["Like New", "Good", "Acceptable"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    collection: "books",
    timestamps: true,
  }
);

bookSchema.pre(["find", "findOne", "save", "findOneAndUpdate"], function () {
  this.populate({
    path: "donor",
    model: User,
    select: "-password -isAdmin",
  });
  this.populate({
    path: "recipient",
    model: User,
    select: "-password -isAdmin",
  });
  this.populate({
    path: "university",
    model: University,
    select: "-_id",
  });
});

bookSchema.plugin(mongoosePaginate);

const Book = model("Book", bookSchema);

export default Book;
