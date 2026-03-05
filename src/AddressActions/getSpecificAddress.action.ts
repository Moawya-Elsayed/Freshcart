"use server"

import { getMyToken } from "@/utilities/getMyToken"

export async function getSpecificAddress(id: string | undefined) {
  try {
    const token = await getMyToken()

    if (!token) throw new Error("you are not authenticated")

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
      
      {
        method: "GET",
        headers: { token },
      } 
    )
    if (!id) throw new Error("Address id is required")

    const payload = await res.json()
    return payload

  } catch (error) {
    return error
  }
}   