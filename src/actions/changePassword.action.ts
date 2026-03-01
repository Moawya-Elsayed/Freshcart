"use server"

import { cookies } from "next/headers"

type ChangePasswordPayload = {
 currentPassword: string;
 password: string;
 rePassword: string;
};

export async function changePasswordAction(data:ChangePasswordPayload){

  const token = (await cookies()).get("next-auth.session-token")?.value

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/changeMyPassword`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization: token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify(data)
    }
  )

  const result = await res.json()

  if(!res.ok){
    throw new Error(result.message || "Change password failed")
  }

  return result
}