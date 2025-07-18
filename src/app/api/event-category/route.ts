// app/api/events/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { EventCategory } from "@/models/eventCategoryModel";

export async function GET() {
  try {
    await connectDB();
    const eventCategory = await EventCategory.find();
    return NextResponse.json(eventCategory);
  } catch (error) {
    console.error("GET /api/event-category error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newEvent = await EventCategory.create(body);
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("POST /api/events-category error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
