import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { EventCategory } from "@/models/eventCategoryModel";

// GET /api/event-category/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const category = await EventCategory.findById(params.id);
    if (!category)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(category);
  } catch (err) {
    return NextResponse.json({ error: "Error fetching" }, { status: 500 });
  }
}

// PUT /api/event-category/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const updates = await req.json();
    const updated = await EventCategory.findByIdAndUpdate(params.id, updates, {
      new: true,
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE /api/event-category/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    await EventCategory.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
