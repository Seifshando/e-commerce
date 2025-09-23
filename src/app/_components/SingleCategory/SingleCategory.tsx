"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  image: string;
}

type SingleCategoryProps = {
  currentCategory: Category;
};

export default function SingleCategory({ currentCategory }: SingleCategoryProps) {
  return (
    <div className="w-1/3" key={currentCategory._id}>
      <div className="p-4">
        <Card className="p-3">
          <Link href={`/categories/${currentCategory._id}`}>
            <CardHeader>
              <Image
                src={currentCategory.image}
                alt={`image for ${currentCategory.name}`}
                width={500}
                height={500}
              />
              <CardTitle className="text-green-600">{currentCategory.name}</CardTitle>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  );
}
