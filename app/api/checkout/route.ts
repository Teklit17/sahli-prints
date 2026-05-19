import { NextResponse } from "next/server";
import { getDatabase } from "@/src/lib/mongodb";
import { getStripe } from "@/src/lib/stripe";
import { getCurrentUser } from "@/src/lib/auth/session";
import type { CartItem } from "@/src/types";

export async function POST(request: Request) {
  try {
    const { items } = (await request.json()) as { items?: CartItem[] };
    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? request.headers.get("origin") ?? "";
    const stripe = getStripe();
    const currentUser = await getCurrentUser();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              productId: item.productId,
              size: item.size ?? "",
              color: item.color ?? "",
              printType: item.printType ?? "",
            },
          },
        },
      })),
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        source: "sahli-prints",
        userId: currentUser?.id ?? "",
      },
      customer_email: currentUser?.email,
    });

    try {
      const db = await getDatabase();
      await db.collection("orders").insertOne({
        items,
        userId: currentUser?.id,
        email: currentUser?.email,
        customerName: currentUser?.name,
        subtotal: items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
        status: "pending",
        stripeSessionId: session.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch {
      // Checkout should still work during early setup if MongoDB is not ready.
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed." },
      { status: 500 },
    );
  }
}
