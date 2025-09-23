import React from 'react'
// import async from './../../products/[id]/page';
import getProducts from '@/api/products.api';
import SingleProduct from '../SingleProduct/page';
import { productType } from '@/types/Product.type';

export default async function AllProducts() {

const data = await getProducts();

// console.log(data);


return <>
        <div className="container w-[80%] mx-auto">
        <div className='flex flex-wrap'>
        {data?.data?.map((product : productType) => (
                <SingleProduct  currentProduct={product} key={product._id}/>
        ))}      
        </div>
        </div>
</>
}
