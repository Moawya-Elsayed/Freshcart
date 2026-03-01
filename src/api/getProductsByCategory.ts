export async function getProductsByCategory(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}` ,
    { cache: "no-store" }
  )

  if (!res.ok) {
    console.log(await res.text()) 
    // throw new Error("Failed to fetch products")
    return [];
  }

  const { data } = await res.json()
  return data
}