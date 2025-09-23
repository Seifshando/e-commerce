"use server";

export default async function ForgotPass(email: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send reset email");
    }

    return data;
} catch (error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message || "Something went wrong");
  }
  throw new Error("Something went wrong");
}

}
