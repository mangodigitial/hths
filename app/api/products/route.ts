import { NextRequest, NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function PUT(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await req.json();
    saveProducts(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
