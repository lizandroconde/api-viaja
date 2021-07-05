//# DEPENDENCYS
import { Schema, model } from "mongoose";

const User = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    surname: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      unique: true,
    },
    location: {
      type: String,
      trim: true,
    },
    about_you: {
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("user", User);
