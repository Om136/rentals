// config/stripe.js
import "dotenv/config";
import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  throw new Error(
    "Missing STRIPE_SECRET_KEY. Set it in backend .env / host environment variables."
  );
}

export const stripe = Stripe(apiKey);
