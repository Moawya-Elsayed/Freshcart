export async function getSpecificSubcategory(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`
  )

  if (!res.ok) {
    throw new Error("Failed to fetch subcategory")
  }

  const { data } = await res.json()
  return data
}