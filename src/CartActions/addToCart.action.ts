    "use server"
    import { getMyToken } from '@/utilities/getMyToken'

    export async function addToCart(id : string){
    

        try {
                const token =  await getMyToken()


        if(!token) throw new Error ("you are not authenticated")

            const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart" , {
                method : "POST" , 
                headers : { 
                    token , 
                    "content-Type" : "application/json"
                } , 
                body : JSON.stringify({
                    productId : id 
                })
            })



            const payload = await res.json()

            return payload
        } catch (error) {
            return error
        }
    }