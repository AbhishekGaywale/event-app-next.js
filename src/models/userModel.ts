// src/models/userModel.ts
import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }, // e.g. "admin", "user"
}, { timestamps: true });

export const User = models.User || model("User", userSchema);
