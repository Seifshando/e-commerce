"use client";

import React, { useState, useContext } from "react";
import AddToCart from "@/cartActions/AddToCart.Action";
import { Button } from "@/components/ui/button";
import { CartContext, CartContextType } from "@/context/CartContext";
import { toast } from "sonner";

export default function AddBtn({ id }: { id: string }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const { numberOfCartItem, setnumberOfCartItem } = useContext<CartContextType>(CartContext);

  async function handleAddProduct(id: string) {
    setIsDisabled(true);

    try {
      const res = await AddToCart(id);

      if (res.status === "success") {
        toast.success(res.message || "Product added to cart!", {
          position: "top-center",
          duration: 2000,
        });
        setnumberOfCartItem(numberOfCartItem + 1);
      } else {
        toast.error(res.message || "Failed to add product", {
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", {
        position: "top-center",
        duration: 2000,
      });
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
