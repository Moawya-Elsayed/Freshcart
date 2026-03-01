export async function getSubcategoriesInCategory(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch subcategories in category")
  }

  const { data } = await res.json()
  return data
}