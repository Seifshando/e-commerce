"use client";

import React, { useContext, useEffect, useState } from "react";
import getLoggedUserCart from "../_components/GetLoggedUser/GetLoggedUser";
import removeItemAction from "@/cartActions/removeItem.action";
import updateCartQuantity from "@/cartActions/UpdateCartQuantity.Action";
import clearCartItem from "@/cartActions/clearCartItem.Action";
import { Button } from "@/components/ui/button";
import { cartProduct } from "@/types/cart.typey";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export default function Cart() {
const { setnumberOfCartItem } = useContext(CartContext);

const [products, setProducts] = useState<cartProduct[]>([]);
const [loading, setLoading] = useState(true);
const [processingIds, setProcessingIds] = useState<string[]>([]);
const [total, setTotal] = useState(0);
const [cartId, setCartId] = useState("");

// جلب الكارت من السيرفر
async function fetchCart() {
setLoading(true);
try {
    const response = await getLoggedUserCart();
    if (response?.status === "success") {
    setCartId(response.cartId);
    setProducts(response.data.products);
    setTotal(response.data.totalCartPrice);
    setnumberOfCartItem(
        response.data.products.reduce(
        (acc: number, p: cartProduct) => acc + p.count,
        0
        )
    );
    }
} catch (error: unknown) {
    console.error("❌ Fetch Cart Error:", error);
    toast.error("Failed to load cart", { position: "top-center" });
} finally {
    setLoading(false);
}
}

useEffect(() => {
fetchCart();
}, []);

// إزالة عنصر
async function removeItem(id: string) {
setProcessingIds((prev) => [...prev, id]);
try {
    const response = await removeItemAction(id);
    if (response?.status === "success") {
    await fetchCart(); // ✅ إعادة تحميل من السيرفر
    toast.success("Product removed successfully", {
        position: "top-center",
        duration: 2000,
    });
    } else {
    toast.error(response?.message || "Can't remove this product", {
        position: "top-center",
        duration: 2000,
    });
    }
} catch (error: unknown) {
    console.error("❌ Remove Item Error:", error);
    toast.error("Something went wrong removing product", {
    position: "top-center",
    });
} finally {
    setProcessingIds((prev) => prev.filter((pid) => pid !== id));
}
}

// تحديث الكمية
async function updateQuantity(id: string, newCount: number) {
setProcessingIds((prev) => [...prev, id]);

try {
    if (newCount < 1) {
    await removeItem(id);
    return;
    }

    const response = await updateCartQuantity(id, String(newCount));
    if (response?.status === "success") {
    await fetchCart(); // ✅ إعادة تحميل
    toast.success("Quantity updated successfully", {
        position: "top-center",
    });
    } else {
    toast.error(response?.message || "Can't update quantity", {
        position: "top-center",
    });
    }
} catch (error: unknown) {
    console.error("❌ Update Quantity Error:", error);
    toast.error("Something went wrong updating quantity", {
    position: "top-center",
    });
} finally {
    setProcessingIds((prev) => prev.filter((pid) => pid !== id));
}
}

// تفريغ الكارت
async function clearCart() {
try {
    const response = await clearCartItem();
    if (response?.message === "success") {
    await fetchCart(); // ✅ إعادة تحميل
    toast.success("Cart cleared successfully", {
        position: "top-center",
    });
    } else {
    toast.error("Can't clear cart", { position: "top-center" });
    }
} catch (error: unknown) {
    console.error("❌ Clear Cart Error:", error);
    toast.error("Something went wrong clearing cart", {
    position: "top-center",
    });
}
}

if (loading) {
return (
    <h1 className="font-bold text-3xl text-center text-emerald-500 my-10">
    Loading... <i className="fas fa-spinner fa-spin"></i>
    </h1>
);
}

return (
<>
    {products.length > 0 && (
    <div className="flex justify-end me-56">
        <Button className="cursor-pointer" onClick={clearCart}>
        Clear Cart
        </Button>
    </div>
    )}

    {products.length > 0 && (
    <div className="flex justify-center me-60 my-2">
        <div>Total: {total} EGP</div>
    </div>
    )}

    {products?.length > 0 ? (
    <div className="w-2/3 mx-auto my-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th className="px-16 py-3">Image</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Action</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => (
                <tr
                key={product.product.id}
                className="bg-white border-b hover:bg-gray-50"
                >
                <td className="p-4">
                    <Image
                    src={product.product.imageCover}
                    width={500}
                    height={500}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                    />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.product.title}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                    <button
                        disabled={processingIds.includes(product.product.id)}
                        onClick={() =>
                        updateQuantity(product.product.id, product.count - 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 border rounded-full"
                    >
                        -
                    </button>

                    <span className="mx-2">{product.count}</span>
                    <button
                        disabled={processingIds.includes(product.product.id)}
                        onClick={() =>
                        updateQuantity(product.product.id, product.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 border rounded-full"
                    >
                        +
                    </button>
                    </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                    {product.price}
                </td>
                <td className="px-6 py-4">
                    <button
                    disabled={processingIds.includes(product.product.id)}
                    onClick={() => removeItem(product.product.id)}
                    className="text-red-600 font-medium cursor-pointer"
                    >
                    Remove
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

        <Link href={`/checkout/${cartId}`}>
        <Button className="bg-emerald-500 hover:bg-emerald-700 p-5 mt-8 w-full text-lg">
            Checkout Now
        </Button>
        </Link>
        <Link href={`/cashOrder/${cartId}`}>
        <Button className="bg-emerald-500 hover:bg-emerald-700 p-5 my-4 w-full text-lg">
            Cash Order
        </Button>
        </Link>
    </div>
    ) : (
    <h1 className="font-bold text-3xl text-center text-red-500 my-10">
        No Items In Cart
    </h1>
    )}
</>
);
}
