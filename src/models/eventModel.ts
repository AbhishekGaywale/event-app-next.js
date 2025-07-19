// models/eventModel.ts
import  { Schema, models, model } from "mongoose";

const eventSchema = new Schema(
  {
    name: String,
    description: String,
    icon: String,
    images: [{ type: String }],
  },
  { timestamps: true }
);

export const Event = models.Event || model("Event", eventSchema);
