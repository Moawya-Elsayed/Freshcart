"use server"
import { getMyToken } from "@/utilities/getMyToken";

export async function removeCartItem(id: string) {

    const token = await getMyToken(); 

    if (!token) throw new Error("you are not authenticated");

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}`, {
        method: "DELETE",
        headers: {
            token,
            "Content-Type": "application/json"
        }
    });

    const payload = await res.json();
    return payload;
}
