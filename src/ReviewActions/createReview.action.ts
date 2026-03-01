
"use server"

import { getMyToken } from "@/utilities/getMyToken"

export async function createReview(
  productId: string,
  body: { review: string; rating: number }
) {
  const token = await getMyToken()

  if (!token) throw new Error("Not authenticated")

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)  
    }
  )

  const payload = await res.json()

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to create review")
  }

  return payload
}