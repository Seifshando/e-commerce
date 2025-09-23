import getMyToken from "@/app/getMyToken/getMyToken";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';

async function CartProtect(){
    const session = await getServerSession(authOptions);

  const token = await getMyToken()

  console.log(token);
  

  if(!session){
    redirect("/login")
}
}