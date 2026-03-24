"use server" ; 
import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"

export async function getMyToken() {
    const decodetoken = (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("__Secure-next-auth.session-token")?.value

    if(!decodetoken){
        return null 
    }

    const token = await decode({ token: decodetoken , secret : process.env.NEXTAUTH_SECRET! })

    

    return token ? token.token : null 
}