import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getDatabase } from "@/src/lib/mongodb";
import { getStripe } from "@/src/lib/stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured." },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const db = await getDatabase();
      await db.collection("orders").updateOne(
        { stripeSessionId: session.id },
        {
          $set: {
            status: "paid",
            email: session.customer_details?.email,
            updatedAt: new Date(),
          },
        },
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook failed." },
      { status: 400 },
    );
  }
}
