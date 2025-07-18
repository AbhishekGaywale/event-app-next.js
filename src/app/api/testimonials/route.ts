import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/testimonialModel";
import path from "path";
import fs from "fs/promises";

// GET: Fetch all testimonials
export async function GET() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json(testimonials);
}

// POST: Create new testimonial with video upload
export async function POST(req: NextRequest) {
  await connectDB();

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  const file = formData.get("video") as File;

  if (!file || !name || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Save video to /public/uploads
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadsDir = path.join(process.cwd(), "public/uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadsDir, filename);
  await fs.writeFile(filepath, buffer);

  // Save record to DB
  const videoUrl = `/uploads/${filename}`;
  const newTestimonial = new Testimonial({ name, message, videoUrl });
  await newTestimonial.save();

  return NextResponse.json({ message: "Testimonial saved" }, { status: 201 });
}
