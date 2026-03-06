"use server"
import { getMyToken } from "@/utilities/getMyToken" ; 



export async function getUserCart(){

try{
        const token = await getMyToken()

    if(!token) return null 

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart" ,{
        method : "GET" ,
        headers: {
            token ,
            "Content-Type": "application/json"

        }
    })

    const payload = await res.json() 
    return payload
} 

catch (error) {
  console.error("Cart Error:", error)
  throw error
}       
    
}