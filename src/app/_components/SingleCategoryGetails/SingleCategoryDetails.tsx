import React from 'react'
import { Card, CardHeader} from "@/components/ui/card";
import Link from "next/link";
import  Image  from 'next/image';
import gertAPISubCategories from '@/api/getSubCategory.api';

export default async function SingleCategoryDetails({currentCategory}) {

  const data = await gertAPISubCategories(currentCategory._id)
  console.log(data);
  console.log(data);
  



  return <>
    {/* <div className=''> */}
        <div className="w-1/3" key={currentCategory._id}>
            <div className='p-4'>              
            <Card className='p-3'>
            <Link href={`/categories/${currentCategory._id}`}> 
            <CardHeader>
            <Image src={currentCategory.image} alt="image for current product" width={500} height={500}/>
            {/* <CardTitle className='text-green-600'>{currentCategory.name}</CardTitle> */}
            </CardHeader>
            </Link>
            {/* <AddBtn id={currentCategory._id}/> */}
            </Card>
        </div>

    </div>
        <span className='text-emerald-300 text-3xl text- font-bold absolute bottom-[50%] left-[50%]'>{currentCategory?.name}</span>
        <span className='text-emerald-700 text-3xl text- absolute bottom-[40%] left-[50%]'>{data?.name}</span>
        
    {/* </div> */}
  </>
}
