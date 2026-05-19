import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import type { NextResponse } from "next/server";
import { getDatabase } from "@/src/lib/mongodb";
import type { CurrentUser } from "@/src/types/auth";

export const sessionCookieName = "sahli_user_id";

const maxAge = 60 * 60 * 24 * 30;

export function setSessionCookie(response: NextResponse, userId: string) {
  response.cookies.set(sessionCookieName, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(sessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(sessionCookieName)?.value;

  if (!userId || !ObjectId.isValid(userId)) {
    return null;
  }

  try {
    const db = await getDatabase();
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(userId) },
      { projection: { name: 1, email: 1, role: 1 } },
    );

    if (!user) return null;

    return {
      id: user._id.toString(),
      name: String(user.name),
      email: String(user.email),
      role: user.role === "admin" ? "admin" : "customer",
    };
  } catch {
    return null;
  }
}
