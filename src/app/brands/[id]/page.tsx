"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BrandType } from "@/types/brand.type"
import { productType } from "@/types/Product.type"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function BrandDetails() {
  const { id } = useParams()
  const [brand, setBrand] = useState<BrandType | null>(null)
  const [products, setProducts] = useState<productType[]>([])

  useEffect(() => {
    if (!id) return

    // جلب تفاصيل البراند
    fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => res.json())
      .then((json) => setBrand(json.data))
      .catch((err) => console.error("Failed to fetch brand details:", err))

    // جلب المنتجات الخاصة بالبراند
    fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
      .then((res) => res.json())
      .then((json) => setProducts(json.data))
      .catch((err) => console.error("Failed to fetch products:", err))
  }, [id])

  if (!brand) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-600">{brand.name}</h1>
        <Link
          href="/brands"
          className="flex items-center text-gray-600 hover:text-green-600"
        >
          <ArrowLeft className="mr-2" /> Back
        </Link>
      </div>

      {/* Brand Image + Desc */}
      <div className="flex flex-col items-center gap-6 mb-10">
        <Image
          src={brand.image}
          alt={brand.name}
          width={400}
          height={400}
          className="rounded-xl shadow-md"
        />
        <p className="text-gray-700 text-lg text-center">
          Welcome to <span className="font-semibold">{brand.name}</span> brand
          page! Explore the latest products from this brand below.
        </p>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {brand.name} Products
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products available for this brand.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product._id}
                className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="rounded-lg mb-3"
                />
                <h3 className="font-semibold text-lg text-gray-800">
                  {product.title}
                </h3>
                <p className="text-green-600 font-bold">{product.price} EGP</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
