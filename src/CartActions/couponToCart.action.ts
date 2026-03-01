"use server"
import { getMyToken } from "@/utilities/getMyToken"

export async function couponToCart(data: { couponName: string }) {
  const token = await getMyToken()
  if (!token) throw new Error("you are not authenticated")

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart/applyCoupon", {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ couponName: data.couponName }),
  })

  const payload = await res.json()
  return payload
}