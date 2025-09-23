"use client";
import { useEffect, useState } from "react";
import SingleBrand from "../_components/SingleBrand";
import { BrandType } from "@/types/brand.type";

export default function BrandsPage() {
  const [brands, setBrands] = useState<BrandType[]>([]);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => res.json())
      .then((json) => setBrands(json.data))
      .catch((err) => console.error("Failed to fetch brands:", err))
  }, []);

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Our Brands</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {brands.map((brand) => (
          <SingleBrand key={brand._id} currentBrand={brand} />
        ))}
      </div>
    </div>
  )
}
