// src/app/api/users/[id]/route.ts
import { connectDB } from "@/lib/db";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface UserUpdateData {
  name?: string;
  email?: string;
  role?: string;
  password?: string;
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const user = await User.findById(params.id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : null },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const { name, email, password, role } = await req.json();

    const updateData: UserUpdateData = { name, email, role };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).select("-password");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User updated", user });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : null },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  try {
    const deleted = await User.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : null },
      { status: 500 }
    );
  }
}