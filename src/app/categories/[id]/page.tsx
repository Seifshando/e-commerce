import gertSpecificCategories from '@/api/getSprcificCategory';
// import SingleCategory from '@/app/_components/SingleCategory/SingleCategory';
import SingleCategoryDetails from '@/app/_components/SingleCategoryGetails/SingleCategoryDetails';

import React from 'react';

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const { id } = await params;

  const {data} = await gertSpecificCategories(id);  
  console.log(data);
  
  if (!data) return <h1>No Product Here</h1>;


  return (
    <>
      <SingleCategoryDetails currentCategory={data}/>
    </>
  );
}
