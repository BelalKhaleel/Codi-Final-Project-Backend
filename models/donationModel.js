import mongoose from "mongoose";

const { Schema, model } = mongoose;

const donationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["delivered", "not delivered"],
      default: "not delivered",
    },
  },
  {
    collection: "donations",
    timestamps: true,
  }
);

bookSchema.pre(["find", "findOne"], function () {
  this.populate("donor");
});

bookSchema.pre(["find", "findOne"], function () {
  this.populate("recipient");
});

bookSchema.pre(["find", "findOne"], function () {
  this.populate("book");
});

const Donation = model("Donation", donationSchema);

export default Donation;
