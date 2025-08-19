import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongo";
import Product from "@/models/product";

// GET all products
export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (err: any) {
    console.error("GET products error:", err.message);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST new product
export async function POST(req: Request) {
  try {
    await connectToDB();
    const { name, price, description, image } = await req.json();

    const newProduct = new Product({ name, price, description, image });
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err: any) {
    console.error("POST product error:", err.message);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}
