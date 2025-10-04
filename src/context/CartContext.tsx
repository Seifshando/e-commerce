"use client";

import React, { createContext, useEffect, useState } from "react";
import getLoggedUserCart from "@/app/_components/GetLoggedUser/GetLoggedUser";

// 🛒 نوع المنتج في الكارت
type CartProduct = {
id: string;
title: string;
count: number;
price: number;
imageCover: string;
};

// 🛒 نوع الاستجابة من الـ API
type CartResponse = {
status: "success" | "fail";
data: {
products: CartProduct[];
};
};

export type CartContextType = {
numberOfCartItem: number;
setnumberOfCartItem: (count: number) => void;
reloadCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextType>({
numberOfCartItem: 0,
setnumberOfCartItem: () => {},
reloadCart: async () => {},
});

export default function CartProvider({ children }: { children: React.ReactNode }) {
const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0);

// ⬇️ دالة عامة تجيب الكارت وتحدث العدد
async function reloadCart(): Promise<void> {
try {
    const res: CartResponse | null = await getLoggedUserCart();
    if (res?.status === "success") {
    const totalCount = res.data.products.reduce(
        (acc: number, p: CartProduct) => acc + p.count,
        0
    );
    setnumberOfCartItem(totalCount);
    } else {
    setnumberOfCartItem(0);
    }
} catch (err) {
    setnumberOfCartItem(0);
}
}

// ⬇️ أول ما الـ context يتعمل له mount
useEffect(() => {
reloadCart();
}, []);

return (
<CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem, reloadCart }}>
    {children}
</CartContext.Provider>
);
}
