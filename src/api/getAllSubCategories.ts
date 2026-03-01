export async function getAllSubcategories() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/subcategories"
  )

  if (!res.ok) {
    throw new Error("Failed to fetch subcategories")
  }

  const { data } = await res.json()
  return data
}