"use server"
import { getMyToken } from '@/utilities/getMyToken'

export async function addToWishlist(id: string) {
  const token = await getMyToken()

  if (!token) throw new Error("you are not authenticated")

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productId: id
    })
  })

  const payload = await res.json()
  return payload
}