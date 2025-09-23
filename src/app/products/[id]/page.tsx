import getProductsDetails from '@/api/productDetails.api';
// import SingleProduct from '@/app/_components/SingleProduct/page';
import SingleProductDetails from '@/app/_components/SingleProductsDetails/page';
// import getRelatedProducts from '@/productCategoryActions/relatedProducts.action';
// import { productType } from '@/types/Product.type';
import React from 'react';

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const data = await getProductsDetails(id);  
  if (!data) return <h1>No Product Here</h1>;

//   const relatedData = await getRelatedProducts(data.category._id || "");

  return (
    <>
      <SingleProductDetails myData={data}/>

      {/* <div className="container w-[80%] mx-auto">
        <div className='flex flex-wrap'>
          {(relatedData?.data || []).map((product: productType) => (
            <SingleProduct currentProduct={product} key={product._id}/>
          ))}      
        </div>
      </div> */}
    </>
  );
}
