"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import getMyToken from "@/app/getMyToken/getMyToken";

export default async function updateCartQuantity(productId: string, count: string) {
const token= await getMyToken()

if (!token) {
throw new Error("User not authenticated");
}

const res = await fetch(
`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
{
    method: "PUT",
    headers: {
    token: String(token) ,
    "Content-type" : "application/json"// ✅ بقيت من session.token
    },
    body: JSON.stringify({ count }),
}
);

if (!res.ok) {
throw new Error("Failed to update cart item");
}

return res.json();
}
