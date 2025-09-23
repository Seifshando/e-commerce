"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

interface SubCategoryType {
_id: string
name: string
slug: string
category: string
createdAt: string
updatedAt: string
}

export default function SubCategoryDetails() {
const { id } = useParams()
const router = useRouter()
const [subCategory, setSubCategory] = useState<SubCategoryType | null>(null)

useEffect(() => {
async function fetchSubCategory() {
    try {
    const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`
    )
    const data = await res.json()
    setSubCategory(data.data)
    } catch (err) {
    console.error("Error fetching subcategory", err)
    }
}
if (id) fetchSubCategory()
}, [id])

if (!subCategory) {
return <p className="text-center mt-10">Loading...</p>
}

return (
<motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl"
>
    <h2 className="text-2xl font-bold text-green-600 mb-4">
    {subCategory.name}
    </h2>
    <p className="text-gray-500 mb-2">
    <span className="font-semibold">Slug:</span> {subCategory.slug}
    </p>
    <p className="text-gray-500 mb-2">
    <span className="font-semibold">Category ID:</span>{" "}
    {subCategory.category}
    </p>
    <p className="text-sm text-gray-400">
    Created: {new Date(subCategory.createdAt).toLocaleDateString()}
    </p>
    <p className="text-sm text-gray-400 mb-6">
    Updated: {new Date(subCategory.updatedAt).toLocaleDateString()}
    </p>

    <button
    onClick={() => router.push("/subCategory")}
    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    >
    ← Back to SubCategories
    </button>
</motion.div>
)
}
