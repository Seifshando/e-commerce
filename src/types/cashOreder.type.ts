// بيانات الفورم بتاع الكاش
export type CashOrderFormValues = {
details: string;
phone: string;
city: string;
};

// المنتج اللي جوا الكارت
export interface Product {
_id: string;
title: string;
imageCover: string;
ratingsAverage: number;
category: {
_id: string;
name: string;
};
}

// عنصر داخل cartItems
export interface CartItem {
_id: string;
product: Product;
count: number;
price: number;
}

// بيانات الأوردر الواحد
export interface CashOrderData {
_id: string;
id: number;
cartItems: CartItem[];
createdAt: string;
updatedAt: string;
isDelivered: boolean;
isPaid: boolean;
paymentMethodType: "cash" | "card";
shippingPrice: number;
taxPrice: number;
totalOrderPrice: number;
user: string;
__v: number;
}

// الـ Response من الـ API
export interface CashOrderResponse {
status: "success" | "error";
message: string;
data: CashOrderData[];
}
