
"use server"

import { getMyToken } from "@/utilities/getMyToken"
import { revalidatePath } from "next/cache"

export async function deleteReview(reviewId: string) {
  const token = await getMyToken()

  if (!token) throw new Error("Not authenticated")

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
    {
      method: "DELETE",
      headers: {
        token
      }
    }
  )

  let payload = null

try {
  payload = await res.json()
} catch {}

  if (!res.ok) {
    throw new Error(payload?.message || "Delete failed")
  }

  return payload    
}

export async function deleteReviewAction(formData: FormData) {
  const reviewId = formData.get("reviewId") as string
  const productId = formData.get("productId") as string

  await deleteReview(reviewId)

  revalidatePath(`/products/${productId}`)
}