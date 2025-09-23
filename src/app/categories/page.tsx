"use server"
import React from "react"
import gertAPICategories from "@/api/getCategories.api"
import SingleCategory from "../_components/SingleCategory/SingleCategory"
import { CategoryType } from "@/types/category.type"

export default async function Categories() {
  const data: CategoryType[] = await gertAPICategories()
  console.log(data)

  return (
    <div className="container w-[80%] mx-auto">
      <div className="flex flex-wrap">
        {data?.map((category) => (
          <SingleCategory currentCategory={category} key={category._id} />
        ))}
      </div>
    </div>
  )
}
