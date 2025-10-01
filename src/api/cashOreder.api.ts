"use server";

import getMyToken from "@/app/getMyToken/getMyToken";
import { checkOutSchemaType } from "@/types/Product";

export async function CashOrederApi(
cartId: string,
form: checkOutSchemaType
) {
const token = await getMyToken();
if (!token) throw new Error("Please, Login First.");

const response = await fetch(
`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
{
    method: "POST",
    headers: {
    "token": String(token),   // ✅ تأكد أنه string

    "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
}
);

if (!response.ok) throw new Error(`Checkout failed: ${response.statusText}`);

const payload: {
status: string;
session?: { url: string };
message?: string;
} = await response.json();

return payload;
}
