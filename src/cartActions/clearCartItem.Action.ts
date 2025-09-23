// cartActions/clearCartItem.action.ts
"use server";

import getMyToken from "@/app/getMyToken/getMyToken";

export default async function clearCartItem() {
const token = await getMyToken();

if (!token) {
throw new Error("User not authenticated");
}

const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
method: "DELETE",
headers: {
    token: String(token) ,
    "Content-type" : "application/json"// ✅ بقيت من session.token
},
});

if (!res.ok) {
throw new Error("Failed to clear cart");
}

return res.json();
}
