import Stripe from "stripe"

function getStripeServerClient() {
  const stripeSecretKey =
    process.env.STRIPE_SECRET_KEY ?? process.env.VITE_STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    throw new Error("Stripe secret key not configured")
  }

  return new Stripe(stripeSecretKey)
}

export async function createOfferCheckoutSessionUrl(origin: string) {
  const stripe = getStripeServerClient()

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "brl",
          unit_amount: 1000,
          product_data: { name: "Oferta 10" },
        },
      },
    ],
    success_url: `${origin}/doe?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/doe?checkout=cancel`,
  })

  if (!session.url) {
    throw new Error("Checkout session URL not available")
  }

  return session.url
}
