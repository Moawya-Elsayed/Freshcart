"use server"
import { getMyToken } from "@/utilities/getMyToken"

export async function getWishlist() {
  const token = await getMyToken()

  if (!token) return null

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
       method : "GET" ,
        headers: {
            token ,
            "Content-Type": "application/json"
        }
      
    }
  )

  const data = await res.json()
  return data
}