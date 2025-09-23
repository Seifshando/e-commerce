import { productType } from "@/types/Product";

interface ApiProduct {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  // لو فيه حقول تانية بترجع من الـ API ممكن تزودها هنا
}

interface ApiResponse {
  data: ApiProduct[];
}

export default async function getRelatedProducts(
  categoryId: string
): Promise<{ data: productType[] }> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
      { cache: "no-store" }
    );

    if (!res.ok) return { data: [] };

    const apiData: ApiResponse = await res.json();

    return {
      data: apiData.data.map((p) => ({
        _id: p._id,
        title: p.title,
        imageCover: p.imageCover,
        ratingsAverage: p.ratingsAverage,
      })),
    };
  } catch (error) {
    console.error("Error fetching related products:", error);
    return { data: [] };
  }
}
