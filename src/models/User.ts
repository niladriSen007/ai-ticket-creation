import { model, Schema } from "mongoose";
import { ADMIN, MODERATOR, USER } from "../utils/constant";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: [ADMIN, USER, MODERATOR],
    default: USER,
  },
  skills: {
    type: [String],
    default: [],
  }
}, {
  timestamps: true
})

export const User = model("User", UserSchema);