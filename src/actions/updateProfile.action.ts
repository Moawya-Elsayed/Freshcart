"use server"

import { UpdateProfilePayload } from "@/types/Profile.types";
import { cookies } from "next/headers"

export async function updateProfileAction(data:UpdateProfilePayload){

  const token = (await cookies()).get("next-auth.session-token")?.value

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/updateMe/`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        token: token || ""
      },
      body: JSON.stringify(data)
    }
  )

  const result = await res.json()

  if(!res.ok){
    throw new Error(result.message || "Update failed")
  }

  return result
}