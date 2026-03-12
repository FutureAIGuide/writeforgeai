import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";

export async function POST(request: NextRequest) {
  try {
    const { customerId } = await request.json();

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
