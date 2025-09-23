"use server"

export default async function VerifyResetCode(resetCode: string) {
const response = await fetch(
`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
{
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({ resetCode }),
}
);

const result = await response.json();

if (!response.ok) {
throw new Error(result.message || "Invalid or expired reset code");
}

return result; // هيبقى فيه status: "Success"
}
