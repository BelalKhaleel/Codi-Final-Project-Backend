import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";
import Address from "./addressModel.js";
// import addressModel from "../models/addressModel.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      unique: true,
      trim: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
  }
);

userSchema.plugin(mongoosePaginate);

userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    console.log(this.password);
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

userSchema.pre(["find", "findOne"], function () {
  this.populate({ path: "address", model: Address });
});

const User = model("User", userSchema);
export default User;
