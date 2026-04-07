import { NextRequest, NextResponse } from "next/server";
import { addOrder, getOrders, type Order } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const order: Order = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      timestamp: new Date().toISOString(),
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      company: body.company || "",
      depot: body.depot || "",
      howHeard: body.howHeard || "",
      phone: body.phone || "",
      email: body.email || "",
      requirements: body.requirements || "",
      complimentarySelected: body.complimentarySelected || [],
      paidSelected: body.paidSelected || [],
    };
    addOrder(order);
    return NextResponse.json({ success: true, id: order.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getOrders());
}
