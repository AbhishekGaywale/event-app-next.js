// models/eventCategoryModel.ts
import { number } from "framer-motion";
import mongoose, { Schema, models, model } from "mongoose";

const eventCategorySchema = new Schema(
  {
    eventName:String,
    categoryName: String,
    description: String,
    image: String,
    price:Number,
  },
  { timestamps: true }
);

export const EventCategory = models.EventCategory || model("EventCategory", eventCategorySchema);
