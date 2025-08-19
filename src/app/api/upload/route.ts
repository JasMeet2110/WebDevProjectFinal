import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, file.name);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${file.name}` });
  } catch (err: any) {
    console.error("Upload error:", err.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
