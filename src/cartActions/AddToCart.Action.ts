"use server";
import getMyToken from "@/app/getMyToken/getMyToken";

export default async function AddToCart(id: string) {
  try {
    const token = await getMyToken();

    if (!token) {
      // المستخدم مش مسجل دخول
      return {
        status: "error",
        message: "User not authenticated",
      };
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: {
        token, // الـ API بيقبل الـ raw token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        status: "error",
        message: errorData.message || "Failed to add product",
      };
    }

    const payload = await res.json();
    return payload;
  } catch (error: unknown) {
    if(error instanceof Error){

      console.error("❌ AddToCart Error:", error);
      return {
        status: "error",
        message: error.message || "Something went wrong",
      }
      };
  }
}
