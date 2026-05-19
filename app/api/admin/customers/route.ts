import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCurrentUser } from "@/src/lib/auth/session";
import { getDatabase } from "@/src/lib/mongodb";

export const runtime = "nodejs";

async function requireAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      response: NextResponse.json({ error: "Login required." }, { status: 401 }),
      user: null,
    };
  }

  if (currentUser.role !== "admin") {
    return {
      response: NextResponse.json({ error: "Admin role required." }, { status: 403 }),
      user: null,
    };
  }

  return { response: null, user: currentUser };
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const db = await getDatabase();
  const customers = await db
    .collection("users")
    .find(
      {},
      {
        projection: {
          name: 1,
          email: 1,
          role: 1,
          marketingOptIn: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    )
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({
    customers: customers.map((customer) => ({
      id: customer._id.toString(),
      name: customer.name ?? "Unnamed customer",
      email: customer.email ?? "",
      role: customer.role === "admin" ? "admin" : "customer",
      marketingOptIn: Boolean(customer.marketingOptIn),
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    })),
  });
}

export async function PATCH(request: Request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const payload = (await request.json()) as {
    id?: string;
    role?: "customer" | "admin";
  };

  if (!payload.id || !ObjectId.isValid(payload.id)) {
    return NextResponse.json({ error: "Valid customer id is required." }, { status: 400 });
  }

  if (payload.role !== "customer" && payload.role !== "admin") {
    return NextResponse.json({ error: "Valid role is required." }, { status: 400 });
  }

  if (payload.id === guard.user?.id && payload.role !== "admin") {
    return NextResponse.json(
      { error: "You cannot remove your own admin role." },
      { status: 400 },
    );
  }

  const db = await getDatabase();
  await db.collection("users").updateOne(
    { _id: new ObjectId(payload.id) },
    {
      $set: {
        role: payload.role,
        updatedAt: new Date(),
      },
    },
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Valid customer id is required." }, { status: 400 });
  }

  if (id === guard.user?.id) {
    return NextResponse.json(
      { error: "You cannot delete your own account while signed in." },
      { status: 400 },
    );
  }

  const db = await getDatabase();
  await db.collection("users").deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ ok: true });
}
