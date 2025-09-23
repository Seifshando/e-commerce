"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface SubCategoryType {
_id: string
name: string
slug: string
}

export default function SubCategoryList() {
const [subCategories, setSubCategories] = useState<SubCategoryType[]>([])

useEffect(() => {
async function fetchSubCategories() {
    try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/subcategories")
    const data = await res.json()
    setSubCategories(data.data)
    } catch (err) {
    console.error("Error fetching subcategories", err)
    }
}
fetchSubCategories()
}, [])

return (
<div className="container mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
    SubCategories
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {subCategories.map((sub, index) => (
        <motion.div
        key={sub._id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-6 bg-white shadow-lg rounded-xl text-center"
        >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {sub.name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">{sub.slug}</p>
        <Link
            href={`/subCategory/${sub._id}`}
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
            View Details
        </Link>
        </motion.div>
    ))}
    </div>
</div>
)
}
