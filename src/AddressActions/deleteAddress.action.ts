"use server"

import { getMyToken } from "@/utilities/getMyToken"

export async function deleteAddress(id: string) {
  try {
    const token = await getMyToken()
    if (!token) throw new Error("you are not authenticated")

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
      {
        method: "DELETE",
        headers: { token },
      }
    )

    const payload = await res.json()
    return payload
  } catch (error) {
    return error
  }
}