import mongoose from "mongoose";

const { Schema, model } = mongoose;

const addressSchema = new Schema(
  {
    governorate: {
      type: String,
      required: [true, "Governorate is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    street: {
      type: String,
      required: [true, "Street is required"],
      trim: true,
    },
    building: {
        type: String,
        trim: true
    },
    floor: {
      type: String,
      trim: true
    },
  },
  {
    collection: "addresses",
  }
);

const Address = model("Address", addressSchema);

export default Address;
