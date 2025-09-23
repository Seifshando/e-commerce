"use server"

import getMyToken from "@/app/getMyToken/getMyToken";


export default async function AddAddress(){

    const token = await getMyToken();
    if(!token) throw new Error("Please, LogIn First.");

const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
    method: "POST",
    headers: {
        token: String(token),
        "Content-Type" : "application/json",
    },
});

const {data} = await response.json();

return data;
}