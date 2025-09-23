"use server";
import { cookies } from "next/headers";

export default async function getMyToken(): Promise<string | null> {
  try {
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll(); // Array<{name, value}>
    const tokenCookie = allCookies.find(c => c.name === "auth_token");
    return tokenCookie?.value || null;
  } catch (err) {
    console.error("Error getting token:", err);
    return null;
  }
}
