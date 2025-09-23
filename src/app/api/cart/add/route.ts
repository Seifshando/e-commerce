// // app/api/cart/add/route.ts
// import { NextResponse } from "next/server";
// import AddToCart from "@/cartActions/AddToCart.Action";

// export async function POST(req: Request) {
// try {
// const { id } = await req.json();
// const result = await AddToCart(id); // هنا السيرفر هيقدر يشوف الكوكيز
// return NextResponse.json(result);
// } catch (error: any) {
// console.error("❌ API /cart/add error:", error);
// return NextResponse.json(
//     { status: "error", message: error.message || "Something went wrong" },
//     { status: 500 }
// );
// }
// }
