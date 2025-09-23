"use server"
export default async function gertAPISubCategories(id : string){
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`);
  
  const {data} = await response.json();
  if(!data) return null
  
  return data;
}