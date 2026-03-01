
  export async function getProductReviews(productId: string) {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      {
        cache: "no-store"
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch product reviews")
    }

    return res.json()
  }