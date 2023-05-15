import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import User from "./userModel.js";
import Address from "./addressModel.js";

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
  this.populate({ path: "donor", model: User, select: "-password -phoneNumber -isAdmin"});
  this.populate({ path: "recipient", model: User, select: "-password -phoneNumber -isAdmin" });
});

// bookSchema.pre(["find", "findOne", "save", "findOneAndUpdate"], function () {
//   this.populate({ 
//     path: "donor", 
//     model: User, 
//     select: "-password -phoneNumber -isAdmin", 
//     // populate: { path: "address", model: Address } // Populate Address field in User model
//   });
//   this.populate({ 
//     path: "recipient", 
//     model: User, 
//     select: "-password -phoneNumber -isAdmin", 
//     // populate: { path: "address", model: Address } // Populate Address field in User model
//   });
// });

bookSchema.plugin(mongoosePaginate);

const Book = model("Book", bookSchema);

export default Book;
