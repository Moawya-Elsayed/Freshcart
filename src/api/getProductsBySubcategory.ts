import { Product } from "@/types/product.type"

export async function getProductsBySubcategory(subcategoryId: string): Promise<Product[]> {

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  )

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const json = await res.json()

  const products: Product[] = json.data

  const filtered = products.filter((product) =>
    product.subcategory.some(
      (sub) => sub._id === subcategoryId
    )
  )

  return filtered
}