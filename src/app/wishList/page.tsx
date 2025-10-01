"use client";

import React, { useEffect, useState } from "react";
import removeFromWishList from "@/api/removeFromWishList.api";
import { toast } from "sonner";
import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { products, fetchWishlist, removeFromWishlist } = useWishlist();
  const [processingIds, setProcessingIds] = useState<string[]>([]);

  async function toggleWishlist(id: string) {
    setProcessingIds((prev) => [...prev, id]);
    try {
      const response = await removeFromWishList(id);
      if (response) {
        removeFromWishlist(id);
        toast.success("Product Removed Successfully", {
          position: "top-center",
          duration: 2000,
        });
      } else {
        toast.error("Can't Remove This Product", { position: "top-center" });
      }
    } catch (error) {
      console.error("❌ Remove wishlist error:", error);
      toast.error("Something went wrong", { position: "top-center" });
    }
    setProcessingIds((prev) => prev.filter((pid) => pid !== id));
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (!products || products.length === 0) {
    return (
      <h1 className="font-bold text-3xl text-center text-red-500 my-10">
        No Items In Wishlist
      </h1>
    );
  }

  return (
    <div className="w-4/5 mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300"
        >
          <Image
            src={product.imageCover}
            width={400}
            height={400}
            alt={product.title}
            className="w-full h-64 object-cover"
          />

          <span
            onClick={() => toggleWishlist(product.id)}
            className={`absolute top-2 right-2 cursor-pointer text-2xl transition-colors duration-300 ${
              processingIds.includes(product.id) ? "text-gray-400 animate-pulse" : "text-red-500"
            }`}
          >
            <i className="fas fa-heart"></i>
          </span>

          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-700 font-medium">${product.price}</p>
          </div>

          <button
            disabled={processingIds.includes(product.id)}
            onClick={() => toggleWishlist(product.id)}
            className="w-full bg-red-500 text-white py-2 hover:bg-red-600 transition-colors duration-300"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
