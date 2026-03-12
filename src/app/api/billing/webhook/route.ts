import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent, handleSubscriptionUpdated, handleCheckoutCompleted } from "@/lib/stripe/webhooks";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = await constructWebhookEvent(body, signature);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook handler error";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
