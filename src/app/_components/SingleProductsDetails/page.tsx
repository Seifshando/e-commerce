import React from "react";
import Image from "next/image";
import AddBtn from "../AddBtn/AddBtn";
import { SingleProductDetailsProps } from "@/types/Product";
import AllProducts from "../AllProducts/AllProducts";

export default function SingleProductDetails({ myData }: SingleProductDetailsProps) {
  return (
    <>
      <div className="container w-[90%] lg:w-[80%] mx-auto flex flex-col lg:flex-row gap-8 my-10">
        {/* الصورة */}
        <div className="w-full md:w-2/5 lg:w-1/4">
          <Image
            src={myData.imageCover}
            className="w-full rounded-lg shadow"
            alt={myData.title}
            width={500}
            height={500}
          />
        </div>

        {/* التفاصيل */}
        <div className="w-full md:w-3/5 lg:w-3/4">
          <h1 className="text-2xl font-bold mb-3">{myData.title}</h1>
          <p className="text-gray-600 leading-relaxed">{myData.description}</p>

          <div className="flex flex-col sm:flex-row justify-between my-4 items-start sm:items-center gap-3">
            <span className="font-semibold text-emerald-600">{myData.category.name}</span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-star text-[#FFD43B]"></i>
              {myData.ratingsAverage}
            </span>
          </div>

          <AddBtn id={myData.id} />
        </div>
      </div>

      {/* منتجات تانية */}
      <AllProducts />
    </>
  );
}
