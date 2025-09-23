// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
const body = await req.json();

const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(body),
});

const data = await res.json();

if (!res.ok) {
return NextResponse.json({ message: data.message || "Login failed" }, { status: 400 });
}

const response = NextResponse.json({ message: "Login successful" });

// هنا نخزن token كـ httpOnly cookie
response.cookies.set({
name: "auth_token",
value: data.token,
httpOnly: true,
path: "/",
secure: process.env.NODE_ENV === "production",
sameSite: "strict",
});

return response;
}
