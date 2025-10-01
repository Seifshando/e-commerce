import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request : NextRequest){

const token = await getToken({req: request})

if(token){
    if(request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register" || request.nextUrl.pathname === "/addAddress"){
        return NextResponse.redirect(new URL("/", request.url))
    }
    else{return NextResponse.next();}
<<<<<<< HEAD
=======


>>>>>>> 1ebd942839c65b9a61f81945d250d9b92a7372ff
    
}




}
export const config = {
matcher : ["/login", "/register", "/addAddress"]
}

