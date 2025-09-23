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
      if (isblack === false) {
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
      className="w-1/5"
      key={currentProduct.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="p-4">
        <Card className="p-3 group/parent shadow-md hover:shadow-lg transition-all duration-300">
          <Link href={`/products/${currentProduct.id}`}>
            <CardHeader>
              <Image
                src={currentProduct.imageCover}
                alt="image for current product"
                width={500}
                height={500}
                className="rounded-xl"
              />
              <CardTitle className="text-green-600">
                {currentProduct.category.name}
              </CardTitle>
              <CardDescription className="font-bold text-black">
                {currentProduct.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span>{currentProduct.price} EGP</span>
                <span>
                  <i className="fa-solid fa-star text-[#FFD43B]"></i>
                  {currentProduct.ratingsAverage}
                </span>
              </div>
            </CardContent>
          </Link>

          {isblack ? (
            <span>
              <i
                onClick={() => wishList()}
                className="fa-solid fa-heart text-red-600 text-xl mt-4 cursor-pointer"
              ></i>
            </span>
          ) : (
            <span>
              <i
                onClick={() => wishList()}
                className="fa-solid fa-heart text-xl mt-4 cursor-pointer"
              ></i>
            </span>
          )}

          <AddBtn id={currentProduct.id} />
        </Card>
      </div>
    </motion.div>
  )
}
