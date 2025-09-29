"use client";

import Link from "next/link";
import React, { useContext,useState } from "react";
import { CartContext, CartContextType } from "@/context/CartContext";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { numberOfCartItem } = useContext<CartContextType>(CartContext);
  const {data: session, status} = useSession()
  // console.log(session);
  // console.log(status);


  function logOut(){
    signOut({callbackUrl : "/login"})
  }


  return (
    <nav className="bg-emerald-500 mb-12 text-white">
      <div className="container w-full lg:w-[80%] mx-auto p-3 flex flex-col gap-4 lg:flex-row justify-between items-center">
        <div className="left">
          <ul className="flex gap-2 lg:gap-8 items-center">
            <li className="text-black text-xl">
              <Link className="flex" href="/">
                <i className="fa-solid fa-cart-shopping"></i> FreshCart
              </Link>
            </li>
            <li><Link href="/">Home</Link></li>
            {session && <li><Link href="/wishList">WishList</Link></li>}
            {session && (
              <li className="relative">
                <Link href="/cart">
                  Cart{" "}
                  {numberOfCartItem > 0 && (
                    <span className="size-6 absolute top-[-13px] end-[-14px] bg-black text-white text-sm rounded-full flex justify-center items-center">
                      {numberOfCartItem}
                    </span>
                  )}
                </Link>


                
              </li>
            )}
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/categories">Categories</Link></li>
            <li><Link href="/subCategory">SubCategories</Link></li>
            <li><Link href="/brands">Brands</Link></li>
          </ul>
        </div>

        <div className="right">
          <ul className="flex gap-3 items-center">
          {session ? (
            <>
              <li>
                <span onClick={logOut} className="cursor-pointer">
                  Signout
                </span>
              </li>
              <span className="text-blue-300">Welcome, {session?.user?.name}</span>
            </>
          ) : (
            <>
              <li><Link href="/register">Register</Link></li>
              <li><Link href="/login">Login</Link></li>
            </>
          )}


          </ul>
        </div>
      </div>
    </nav>
  );
}
