import { NextResponse } from "next/server";
import { getDatabase } from "@/src/lib/mongodb";
import { hashPassword } from "@/src/lib/auth/password";
import { setSessionCookie } from "@/src/lib/auth/session";

export const runtime = "nodejs";

type RegisterPayload = {
  name?: string;
  email?: string;
  password?: string;
  marketingOptIn?: boolean;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RegisterPayload;
    const name = cleanString(payload.name);
    const email = cleanString(payload.email).toLowerCase();
    const password = cleanString(payload.password);

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const db = await getDatabase();
    const users = db.collection("users");
    await users.createIndex({ email: 1 }, { unique: true });

    const existingUser = await users.findOne(
      { email },
      { projection: { _id: 1 } },
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const passwordFields = hashPassword(password);
    const now = new Date();

    const result = await users.insertOne({
      name,
      email,
      role: "customer",
      marketingOptIn: Boolean(payload.marketingOptIn),
      ...passwordFields,
      createdAt: now,
      updatedAt: now,
    });

    const response = NextResponse.json(
      {
        user: {
          id: result.insertedId.toString(),
          name,
          email,
          role: "customer",
        },
      },
      { status: 201 },
    );

    setSessionCookie(response, result.insertedId.toString());
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed.";

    if (message.includes("E11000")) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
