'use server'
export default async function gertAPICategories(){
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
  
  const {data} = await response.json();
  if(!data) return null
  
  return data;
}