"use server"
import { getMyToken } from "@/utilities/getMyToken";

export async function removeFromWishlist(id: string) {

    const token = await getMyToken(); 

    if (!token) throw new Error("you are not authenticated");

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        method: "DELETE",
        headers: {
            token,
            "Content-Type": "application/json"
        }
    });

    const payload = await res.json();
    return payload;
}
