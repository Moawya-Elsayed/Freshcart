
"use server"

import { getMyToken } from "@/utilities/getMyToken"

export async function updateReview(
  reviewId: string,
  body: { review: string; rating: number }
) {
  const token = await getMyToken()

  if (!token) throw new Error("Not authenticated")

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  )

  const payload = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to update review")
  }

  return payload
}