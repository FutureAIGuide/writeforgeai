import Stripe from "stripe";
import { stripe } from "./client";

export async function constructWebhookEvent(
  body: string,
  signature: string
): Promise<Stripe.Event> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  return stripe.webhooks.constructEvent(body, signature, webhookSecret);
}

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  // Update subscription in database
  const orgId = subscription.metadata?.org_id;
  if (!orgId) return;
  // Implementation: update subscriptions table
  console.log("Subscription updated for org:", orgId, subscription.status);
}

export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
) {
  const orgId = session.metadata?.org_id;
  if (!orgId) return;
  console.log("Checkout completed for org:", orgId);
}
