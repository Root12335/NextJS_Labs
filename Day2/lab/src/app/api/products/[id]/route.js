import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch product", error: error.message }, { status: 500 });
  }
}
