import { NextResponse } from "next/server";
import { getDatabase } from "@/src/lib/mongodb";
import { verifyPassword } from "@/src/lib/auth/password";
import { setSessionCookie } from "@/src/lib/auth/session";

export const runtime = "nodejs";

type LoginPayload = {
  email?: string;
  password?: string;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LoginPayload;
    const email = cleanString(payload.email).toLowerCase();
    const password = cleanString(payload.password);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const db = await getDatabase();
    const user = await db.collection("users").findOne({ email });

    if (
      !user ||
      !verifyPassword({
        password,
        passwordHash: String(user.passwordHash ?? ""),
        passwordSalt: String(user.passwordSalt ?? ""),
      })
    ) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role ?? "customer",
      },
    });

    setSessionCookie(response, user._id.toString());
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed." },
      { status: 500 },
    );
  }
}
