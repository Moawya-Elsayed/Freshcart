"use server"

import { getMyToken } from "@/utilities/getMyToken"

export type ChangePasswordPayload = {
  currentPassword: string
  password: string
  rePassword: string
}

export async function changePasswordAction(
  data: ChangePasswordPayload
) {

  const token = await getMyToken()

  if (!token) {
    throw new Error("You are not authenticated")
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/changeMyPassword`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || "Change password failed")
  }

  return result
}