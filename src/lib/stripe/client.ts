import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-02-25.clover",
});

export const STRIPE_PRICES: Record<string, string> = {
  starter_monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY ?? "",
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
  studio_monthly: process.env.STRIPE_PRICE_STUDIO_MONTHLY ?? "",
};
