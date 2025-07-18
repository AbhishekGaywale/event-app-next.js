import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/testimonialModel";
import { NextRequest, NextResponse } from "next/server";

// PUT: Update testimonial by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const body = await req.json();
  const { name, message, videoUrl } = body;

  const updated = await Testimonial.findByIdAndUpdate(
    params.id,
    { name, message, videoUrl },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Updated successfully" });
}

// DELETE: Remove testimonial by ID
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  const deleted = await Testimonial.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
