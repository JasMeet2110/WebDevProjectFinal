import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectToDB } from "@/lib/mongo";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      return NextResponse.json({
        message: "Admin login successful",
        user: { email, role: "admin" },
      });
    }

    
    await connectToDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      user: { email: user.email, role: user.role },
    });
  } catch (err: any) {
    console.error("Login error:", err.message);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
