export async function getAllReviews() {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch reviews")
  }

  return res.json()
}