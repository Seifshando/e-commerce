"use server"
import { ProductDetails } from "@/types/Product";

export default async function getProductsDetails(id: string): Promise<ProductDetails | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const apiData = await res.json();

    return {
      id: apiData.data._id,
      title: apiData.data.title,
      description: apiData.data.description,
      imageCover: apiData.data.imageCover,
      ratingsAverage: apiData.data.ratingsAverage,
      category: {
        name: apiData.data.category?.name || "",
      },
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}
