import { connectDB } from "@/lib/db";
import { User } from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  
  try {
    const body = await req.json();
    const { email, password } = body;

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" }, // Generic message for security
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" }, // Same message as above for security
        { status: 401 }
      );
    }

    // Remove password before sending user data
    const userWithoutPassword = { ...user.toObject(), password: undefined };

    return NextResponse.json(
      { message: "Login successful", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        error: "An error occurred during login",
        details: error instanceof Error ? error.message : undefined
      },
      { status: 500 }
    );
  }
}