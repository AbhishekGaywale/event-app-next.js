import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Event } from '@/models/eventModel';

interface EventData {
  name?: string;
  description?: string;
  icon?: string;
  price?: number;
  images?: string[]; // Changed to array of strings
  // Add other event properties as needed
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const event = await Event.findById(params.id);
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body: EventData = await req.json();
    
    console.log("Updating Event ID:", params.id);
    
    // Handle images array - ensure it's always an array
    if (body.images && !Array.isArray(body.images)) {
      body.images = [body.images];
    }
    
    const updated = await Event.findByIdAndUpdate(
      params.id, 
      { $set: body },
      { new: true }
    );
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const deleted = await Event.findByIdAndDelete(params.id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}