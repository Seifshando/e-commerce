import React from "react";
import Image from "next/image";
import AddBtn from "../AddBtn/AddBtn";
import { SingleProductDetailsProps } from "@/types/Product";

export default function SingleProductDetails({ myData }: SingleProductDetailsProps) {
  return (
    <div className="container w-[80%] mx-auto flex">
      <div className="w-1/4 me-12">
        <Image
          src={myData.imageCover}
          className="w-full"
          alt={myData.title}
          width={500}
          height={500}
        />
      </div>
      <div className="w-3/4 mt-15">
        <h1>{myData.title}</h1>
        <p>{myData.description}</p>
        <div className="flex justify-between my-4 items-center">
          <span className="font-bold">{myData.category.name}</span>
          <span>
            <i className="fa-solid fa-star text-[#FFD43B]"></i> {myData.ratingsAverage}
          </span>
        </div>
        <AddBtn id={myData.id} />
      </div>
    </div>
  );
}
