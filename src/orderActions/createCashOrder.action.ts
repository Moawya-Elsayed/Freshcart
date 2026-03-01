"use server"

import { getMyToken } from "@/utilities/getMyToken"

export async function createCashOrder(cartId: string, values: unknown) {
  
  const token = await getMyToken()

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token :  token ?? "" ,    
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shippingAddress: values
      })
    }
  )

  return await res.json()
}