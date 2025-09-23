"use client"
import React, { useEffect, useState } from "react"
import CategorySwiper from "../CategorySwiper/CategorySwiper"

export default function CategorySlider() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => res.json())
      .then((res) => setData(res.data))
  }, [])

  return <CategorySwiper data={data} />
}
