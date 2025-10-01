export type OrderProduct = {
_id: string
title: string
imageCover: string
ratingsAverage: number
category: {
name: string
}
}

export type CartItem = {
_id: string
product: OrderProduct
price: number
count: number
}

export type Order = {
_id: string
id: number
user: string
isDelivered: boolean
isPaid: boolean
paymentMethodType: string
shippingPrice: number
taxPrice: number
totalOrderPrice: number
createdAt: string
updatedAt: string
__v: number
cartItems: CartItem[]
}
