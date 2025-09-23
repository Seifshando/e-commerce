"use server"
export default async function gertSpecificCategories(id: string){
try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    });

    if (!res) return null;

    const apiData = await res.json();

    return apiData
} catch (error) {
    console.error("Error fetching category details:", error);
    return null;
}
}
