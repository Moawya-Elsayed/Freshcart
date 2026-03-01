"use server"
import { getMyToken } from "@/utilities/getMyToken"



export async function updateCartItem(id:string , count: string ){
    const token = await getMyToken()

    if(!token) throw new Error("you are not authenticated")

        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}` , {
            method : "PUT" , 
            headers : {
                token , 
                "Content-Type" : "application/json"
            } , 
            body : JSON.stringify({
                count , 
            })

        })
        const payload   = await res.json()

        return payload

}