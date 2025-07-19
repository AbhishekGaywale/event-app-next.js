import { connectDB } from "@/lib/db";
import { Contact } from "@/models/contactModel";
import { NextResponse } from "next/server";

// POST: Save contact form
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  try {
    const contact = await Contact.create(body);
    return NextResponse.json({ message: "Submitted", contact }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { message: "Error saving contact", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// GET: Fetch all contact submissions
export async function GET() {
  await connectDB();

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { message: "Error fetching contacts", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}