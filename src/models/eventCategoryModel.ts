import { Schema, models, model } from "mongoose";

const eventCategorySchema = new Schema(
  {
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true
    },
    categoryName: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    images: {
      type: [String],
      default: []
    },
    price: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export const EventCategory = models.EventCategory || model("EventCategory", eventCategorySchema);