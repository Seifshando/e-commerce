// context/WishlistContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import GetWishList from "@/api/getWishList.api";
import { WishlistProduct } from "@/types/wishList.type";

type WishlistContextType = {
products: WishlistProduct[];
count: number;
fetchWishlist: () => Promise<void>;
removeFromWishlist: (id: string) => void;
addToWishlist: (product: WishlistProduct) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(
undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
const [products, setProducts] = useState<WishlistProduct[]>([]);

async function fetchWishlist() {
try {
    const data = await GetWishList();
    setProducts(data);
} catch (error) {
    console.error("❌ Error fetching wishlist:", error);
}
}

function removeFromWishlist(id: string) {
setProducts((prev) => prev.filter((p) => p.id !== id));
}

function addToWishlist(product: WishlistProduct) {
setProducts((prev) => [...prev, product]);
}

useEffect(() => {
fetchWishlist();
}, []);

return (
<WishlistContext.Provider
    value={{
    products,
    count: products.length,
    fetchWishlist,
    removeFromWishlist,
    addToWishlist,
    }}
>
    {children}
</WishlistContext.Provider>
);
}

export function useWishlist() {
const context = useContext(WishlistContext);
if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
return context;
}
