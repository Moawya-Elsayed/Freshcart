
"use server"

import { cookies } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_API

type ApiResponse = {
 status: string;
 message: string;
};

export async function changePasswordAction(data:ApiResponse){

  const token = (await cookies()).get("next-auth.session-token")?.value

  const res = await fetch(`${BASE_URL}/users/changeMyPassword`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json",
      token: token || ""
    },
    body: JSON.stringify(data)
  })

  const result = await res.json()

  if(!res.ok){
    throw new Error(result.message || "Error changing password")
  }

  return result
}