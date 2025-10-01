"use server"


export default async function AllordersApi(){

const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`);

const payload = await response.json();

return payload;
}