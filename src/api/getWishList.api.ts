"use server"

import getMyToken from "@/app/getMyToken/getMyToken";

export default async function GetWishList(){
    const token = await getMyToken();
    if(!token) throw new Error("Please, Login First.")

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    method: "GET",
    headers: {
        token: String(token),
        "Content-Type" : "application/json",
    },
  }
  );
  
  const {data} = await response.json();
  
  return data;
}