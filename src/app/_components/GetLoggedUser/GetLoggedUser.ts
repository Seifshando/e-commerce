// api/cart/getLoggedUserCart.ts
"use server";

import getMyToken from "@/app/getMyToken/getMyToken";


export default async function getLoggedUserCart() {
const token = await getMyToken();
console.log(token);


if (!token) {
throw new Error("User not authenticated");
}

const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
method: "GET",
headers: {
    token,
    "Content-Type" : "application/json",
},
});

const payload = await res.json()
return payload;
}
