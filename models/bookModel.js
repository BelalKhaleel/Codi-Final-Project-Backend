import mongoose from "mongoose";

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
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
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
    image: {
      type: String,
      required: false,
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
  },
  {
    collection: "books",
    timestamps: true,
  }
);

bookSchema.pre(["find", "findOne"], function () {
  this.populate(["donor", "recipient"]);
});

const Book = model("Book", bookSchema);

export default Book;
