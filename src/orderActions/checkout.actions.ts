        "use server"

        "use server"
        import { checkoutSchemaType } from "@/schema/checkout.schema";
        import { getMyToken } from "@/utilities/getMyToken";

        export async function checkPayment(cartId: string , formValues : checkoutSchemaType) {

            const token = await getMyToken(); 
            const url = process.env.NEXT_URL

            if (!token) throw new Error("you should logged in first to complete payment");

            const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url} `, {
                method: "POST",
                headers: {  
                    token,
                    "Content-Type": "application/json"
                } , 
                body : JSON.stringify({
                    shippingAddress : formValues,   
                })
                
            });

            const payload = await res.json();
            return payload;
        }
