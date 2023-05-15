import mongoose from "mongoose";
import User from "./userModel.js";
import Book from "./bookModel.js";

const { Schema, model } = mongoose;

const donationSchema = new Schema(
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    status: {
      type: String,
      enum: ["delivered", "not delivered"],
      default: "not delivered",
      required: true
    },
  },
  {
    collection: "donations",
    timestamps: true,
  }
);

donationSchema.pre(["find", "findOne", "save", "findOneAndUpdate"], function () {
  this.populate({ path: "donor", model: User, select: "-password -phoneNumber -isAdmin"});
  this.populate({ path: "recipient", model: User, select: "-password -phoneNumber -isAdmin" });
  this.populate({ path: "book", model: Book, select: "-isDeleted" });
});

const Donation = model("Donation", donationSchema);

export default Donation;
