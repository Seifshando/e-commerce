"use client";

import React, { useState, useContext } from "react";
import AddToCart from "@/cartActions/AddToCart.Action";
import { Button } from "@/components/ui/button";
import { CartContext, CartContextType } from "@/context/CartContext";
import { toast } from "sonner";
import getLoggedUserCart from "@/app/_components/GetLoggedUser/GetLoggedUser";

export interface CartProduct {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  count: number; // عدد القطع من المنتج
}


export default function AddBtn({ id }: { id: string }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { setnumberOfCartItem } = useContext<CartContextType>(CartContext);

  async function handleAddProduct(id: string) {
    setIsDisabled(true);

    try {
      const res = await AddToCart(id);

      if (res.status === "success") {
        // ✅ رجع العدد من السيرفر مباشرة
        const cartRes = await getLoggedUserCart();
        if (cartRes?.status === "success") {
          const totalCount = cartRes.data.products.reduce(
            (acc: number, p: CartProduct) => acc + p.count,
            0
          );
          setnumberOfCartItem(totalCount);
        }

        toast.success(res.message || "Product added to cart!", {
          position: "top-center",
          duration: 2000,
        });
      } else {
        toast.error(res.message || "Failed to add product", {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "top-center",
          duration: 2000,
        });
      }
    } finally {
      setIsDisabled(false);
    }
  }

  return (
    <Button
      disabled={isDisabled}
      onClick={() => handleAddProduct(id)}
      className="w-full cursor-pointer disabled:cursor-not-allowed"
    >
      Add to cart
    </Button>
  );
}
