// app/api/events/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/models/eventModel";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find();
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/events error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newEvent = await Event.create(body);
    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("POST /api/events error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
