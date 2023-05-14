import mongoose from "mongoose";

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

donationSchema.pre(["find", "findOne"], function () {
  this.populate(["donor", "recipient", "book"]);
});

const Donation = model("Donation", donationSchema);

export default Donation;
