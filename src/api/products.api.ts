"use server"
// api/products.api.ts (server-side only)
export default async function getProducts() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    cache: "no-store",
    // لو محتاج token:
    // headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    throw new Error(`Failed with status ${res.status}`);
  }

  return res.json();
}
