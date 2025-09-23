"use server";

export default async function ResetPass(resetCode: string, newPassword: string) {
try {
const response = await fetch(
`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
{
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
    resetCode,
    newPassword,
}),
}
);


const data = await response.json();

if (!response.ok) {
throw new Error(data.message || "Failed to reset password");
}

return data;
} catch (error: any) {
throw new Error(error.message || "Something went wrong");
}
}
