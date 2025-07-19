import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { EventCategory } from "@/models/eventCategoryModel";

// GET /api/event-category
export async function GET() {
  await connectDB();
  try {
    const categories = await EventCategory.find();
    return NextResponse.json(categories);
  } catch (_) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST /api/event-category
export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const newCategory = await EventCategory.create(body);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (_) {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}
