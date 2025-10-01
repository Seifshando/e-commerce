"use client";
import AllordersApi from "@/api/allorders.api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Order } from "@/types/order.type";  // ✅ استدعاء الـ types

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]); // ✅ استبدل any

  async function allorders() {
    try {
      const response = await AllordersApi();
      console.log(response);
      setOrders(response.data as Order[]); // ✅ نوع مصرح
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    allorders();
  }, []);

  return (
    <div className="w-[80%] mx-auto my-10">
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {orders.flatMap((order) =>
            order.cartItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 border rounded-xl shadow-lg bg-white"
              >
                <h3 className="font-bold text-lg mb-2">
                  {item.product.category.name}
                </h3>
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-2 text-yellow-600">
                  ⭐ {item.product.ratingsAverage}
                </p>
                <p className="text-gray-600">{item.product.title}</p>
                <p className="text-emerald-600 font-semibold mt-2">
                  Price: {item.price} EGP
                </p>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <h1 className="font-bold text-3xl text-center text-emerald-500 my-10">
          Loading... <i className="fas fa-spinner fa-spin"></i>
        </h1>
      )}
    </div>
  );
}
