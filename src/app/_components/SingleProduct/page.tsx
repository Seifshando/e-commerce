"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { productType } from "@/types/Product.type"
import AddBtn from "../AddBtn/AddBtn"
import AddWishList from "@/api/AddwishList.api"
import { toast } from "sonner"
import { useState } from "react"
import { motion } from "framer-motion"

export default function SingleProduct({
  currentProduct,
}: {
  currentProduct: productType
}) {
  const [isblack, setisblack] = useState(false)

  async function wishList() {
    const response = await AddWishList(currentProduct.id)
    if (response) {
      if (!isblack) {
        setisblack(true)
        toast.success("Product Added To WishList Successfully", {
          position: "top-center",
          duration: 2000,
        })
      } else {
        setisblack(false)
        toast.success("Product Removed From WishList Successfully", {
          position: "top-center",
          duration: 2000,
        })
      }
    }
  }

  return (
    <motion.div
      key={currentProduct.id}
      className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5" 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="p-3">
        <Card className="p-3 group/parent shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
          <Link href={`/products/${currentProduct.id}`}>
            <CardHeader>
              <Image
                src={currentProduct.imageCover}
                alt={currentProduct.title}
                width={500}
                height={500}
                className="rounded-xl w-full h-auto object-cover"
              />
              <CardTitle className="text-green-600 mt-2">
                {currentProduct.category.name}
              </CardTitle>
              <CardDescription className="font-bold text-black line-clamp-1">
                {currentProduct.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{currentProduct.price} EGP</span>
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-[#FFD43B]"></i>
                  {currentProduct.ratingsAverage}
                </span>
              </div>
            </CardContent>
          </Link>

          {/* WishList Icon */}
          <span className="mt-3">
            <i
              onClick={() => wishList()}
              className={`fa-solid fa-heart text-xl cursor-pointer transition-colors ${
                isblack ? "text-red-600" : "text-gray-400 hover:text-red-500"
              }`}
            ></i>
          </span>

          {/* Add to Cart */}
          <AddBtn id={currentProduct.id} />
        </Card>
      </div>
    </motion.div>
  )
}
