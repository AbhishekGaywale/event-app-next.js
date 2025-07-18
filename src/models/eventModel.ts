// models/eventModel.ts
import mongoose, { Schema, models, model } from "mongoose";

const eventSchema = new Schema(
  {
    name: String,
    description: String,
    icon: String,
  },
  { timestamps: true }
);

export const Event = models.Event || model("Event", eventSchema);
