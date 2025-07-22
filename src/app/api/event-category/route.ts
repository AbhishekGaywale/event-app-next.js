import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { EventCategory } from "@/models/eventCategoryModel";

// Inline TypeScript type
type EventCategoryType = {
  _id: string;
  eventName: string;
  categoryName: string;
  description: string;
  images: string[];
  price: number;
  createdAt?: string;
  updatedAt?: string;
};

// GET /api/event-category?eventName=Birthday
export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const eventName = searchParams.get("eventName");

  try {
    const query = eventName ? { eventName } : {};
    const categories = await EventCategory.find(query).lean<EventCategoryType[]>();

    const processed = categories.map((cat) => ({
      ...cat,
      images: Array.isArray(cat.images) && cat.images.length > 0
        ? cat.images
        : ["/default-category.jpg"],
    }));

    return NextResponse.json(processed);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST /api/event-category
export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();

    if (!body.eventName || !body.categoryName || !body.description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const images = Array.isArray(body.images)
      ? body.images
      : body.image
      ? [body.image]
      : [];

    const category = await EventCategory.create({
      ...body,
      images: images.length ? images : ["/default-category.jpg"],
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}
