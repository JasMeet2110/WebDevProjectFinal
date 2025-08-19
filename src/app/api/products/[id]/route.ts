import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import Product from "@/models/product";

// GET one product
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product, { status: 200 });
  } catch (err: any) {
    console.error("GET product error:", err.message);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// UPDATE a product
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const { name, price, description, image } = await req.json();

    const updated = await Product.findByIdAndUpdate(
      params.id,
      { name, price, description, image },
      { new: true }
    );

    if (!updated) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error("PUT product error:", err.message);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE a product
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const deleted = await Product.findByIdAndDelete(params.id);

    if (!deleted) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE product error:", err.message);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
