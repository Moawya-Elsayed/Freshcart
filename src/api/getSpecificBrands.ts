export async function getSpecificBrand(id: string) {

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch brand")
  }

  const response = await res.json()

  return response.data
}