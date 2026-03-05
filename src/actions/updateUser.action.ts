  "use server"
  import { getMyToken } from "@/utilities/getMyToken"

  export type UpdateUserPayload = {
    name: string
    email: string
    phone: string
  }

  export async function updateUserAction(data: UpdateUserPayload) {

    const token = await getMyToken()

    if (!token) {
      throw new Error("You are not authenticated")
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/users/updateMe`,
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
        throw new Error(
          result?.errors?.[0]?.msg ||
          result?.message ||
          "Failed to update profile"
        )
      }
      console.log(result)

    return result
  }




