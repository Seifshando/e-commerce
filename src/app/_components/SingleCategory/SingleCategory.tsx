"use client"
import React from 'react'
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import  Image  from 'next/image';
import { Button } from '@/components/ui/button';
import gertAPISubCategories from '@/api/getSubCategory.api';

export default function SingleCategory({currentCategory}) {

  // async function SubCategory(){
  //   const response = await gertAPISubCategories(currentCategory._id);
  //   console.log(response?._id);
  // }


  return <>
    <div className="w-1/3" key={currentCategory._id}>
            <div className='p-4'>              
            <Card className='p-3'>
        <Link href={`/categories/${currentCategory._id}`}> 
            <CardHeader>
            <Image src={currentCategory.image} alt="image for current product" width={500} height={500}/>
            <CardTitle className='text-green-600'>{currentCategory.name}</CardTitle>
            </CardHeader>
        </Link>
            {/* <Button onClick={() => SubCategory()}>SubCategory</Button> */}
            </Card>
          </div>
    </div>
  </>
}
