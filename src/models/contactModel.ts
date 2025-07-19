import  { Schema, model, models } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    whatsapp: { type: String, required: true },
    queryFor: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent model overwrite issue in Next.js
export const Contact = models.Contact || model("Contact", contactSchema);
