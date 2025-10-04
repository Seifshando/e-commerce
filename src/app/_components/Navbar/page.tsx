"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { CartContext, CartContextType } from "@/context/CartContext";
import { signOut, useSession } from "next-auth/react";
import { useWishlist } from "@/context/WishlistContext";


export default function Navbar() {
  const { numberOfCartItem } = useContext<CartContextType>(CartContext);
  const { data: session } = useSession();
  const { count } = useWishlist();


  const [menuOpen, setMenuOpen] = useState(false);

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-emerald-500 mb-12 text-white">
      <div className="container w-full lg:w-[80%] mx-auto p-3 flex justify-between items-center">
        {/* Left side: Logo + Links */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="text-black text-xl">
            <Link className="flex items-center gap-2" href="/">
              <i className="fa-solid fa-cart-shopping"></i> FreshCart
            </Link>
          </div>

          {/* زرار الهامبرجر في الموبايل */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl focus:outline-none"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* الروابط */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } lg:flex flex-col lg:flex-row gap-4 lg:gap-6 items-center absolute lg:static top-[60px] left-0 w-full lg:w-auto bg-emerald-500 lg:bg-transparent p-4 lg:p-0 z-50`}
          >
            <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center">
              <li><Link href="/">Home</Link></li>
              {session && <li><Link href="/wishList" className="relative">
              WishList
              {count > 0 && (
                <span className="size-6 absolute top-[-14px] end-[-14px] bg-red-500 text-white text-sm rounded-full flex justify-center items-center">
                  {count}
                </span>
              )}
            </Link> </li>}
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
        </div>

        {/* Right side: SignIn / SignOut */}
        <div>
          <ul className="flex gap-3 items-center">
            {session ? (
              <>
                <li>
                  <span onClick={logOut} className="cursor-pointer">
                    Signout
                  </span>
                </li>
                <span className="text-blue-300">
                  Welcome, {session?.user?.name}
                </span>
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
