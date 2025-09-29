"use server";

export default async function ResetPass(email: string, newPassword: string) {
try {
const response = await fetch(
`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
{
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
    email,
    newPassword,
}),
}
);


const data = await response.json();

if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
}

return data;


} catch (error: unknown) {
    if(error instanceof Error){
        throw new Error(error.message || "Something went wrong");
    }
    throw new Error("Something went wrong");
}
}
