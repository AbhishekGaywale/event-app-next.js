import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EventCategory } from '@/models/eventCategoryModel';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const eventCategorys = await EventCategory.findById(params.id);
  return NextResponse.json(eventCategorys);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    console.log("Updating EventCategory ID:", params.id);
    const updated = await EventCategory.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await EventCategory.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
