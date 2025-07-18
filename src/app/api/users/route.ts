// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/userModel";
import bcrypt from "bcrypt";

// GET all users
export async function GET() {
  await connectDB();
  const users = await User.find().select("-password");
  return NextResponse.json(users);
}

// POST new user
export async function POST(req: Request) {
  await connectDB();
  const { name, email, password, role } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword, role });

  return NextResponse.json({ message: "User created", user: { name, email, role, _id: newUser._id } });
}
