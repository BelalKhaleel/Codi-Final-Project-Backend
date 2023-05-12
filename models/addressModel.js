import mongoose from "mongoose";

const { Schema, model } = mongoose;

const addressSchema = new Schema(
  {
    governorate: {
      type: String,
      enum: [
        "Akkar",
        "Baalbeck-Hermel",
        "Beirut",
        "Bekaa",
        "Mount Lebanon",
        "North Lebanon",
        "Nabatiyeh",
        "South Lebanon",
      ],
      required: [true, "Governorate is required"],
      trim: true,
    },
    district: {
      type: String,
      required: [true, "District is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    building: {
      type: String,
      trim: true,
    },
    floor: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "addresses",
  }
);

const Address = model("Address", addressSchema);

export default Address;
