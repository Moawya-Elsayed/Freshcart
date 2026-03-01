
export async function getReviewById(reviewId: string) {

  if (!reviewId || reviewId === "undefined") {
    return { data: null }
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    { cache: "no-store" }
  )

  const data = await res.json().catch(() => null)

  if (!res.ok) return { data: null }

  return data
}