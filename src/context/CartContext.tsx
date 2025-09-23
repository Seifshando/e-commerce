'use client';

import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// 1. Define the shape of the context
export interface CartContextType {
    numberOfCartItem: number;
    setnumberOfCartItem: Dispatch<SetStateAction<number>>;
}

// 2. Create context with default values
export const CartContext = createContext<CartContextType>({
    numberOfCartItem: 0,
    setnumberOfCartItem: () => {},
});

// 3. Define props for provider
interface CartProviderProps {
    children: ReactNode;
}

export default function CartContextProvider({ children }: CartProviderProps) {
    const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0);

    return (
        <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
            {children}
        </CartContext.Provider>
    );
}
