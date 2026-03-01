"use client" ; 
import { Button } from "@/components/ui/button";
import { addToCart } from "@/CartActions/addToCart.action";
import { toast } from 'sonner';
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { ButtonHTMLAttributes } from "react";

interface AddBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
}
export default function AddBtn({ id, ...props }: AddBtnProps){
    const {numberOfItems, setNumberOfItems} = useContext(CartContext)!
    async function addProductToCart(id : string){
        const res = await addToCart(id)
        console.log(res)

        if(res.status == "success"){
        toast.success(res.message , {
            duration : 2000,
                position : "top-center"
        })
            setNumberOfItems(numberOfItems + 1)
        } else{
            toast.error(res.message  , {
                duration : 2000 , 
                position : "top-center"
            })
        }
}

    return (
        <div className="w-full flex justify-center">
            <Button
                onClick={() => addProductToCart(id)}
                {...props}
                className="w-[85%] sm:w-[80%] bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 text-base md:text-lg font-semibold rounded-lg"
                > Add To Card</Button>
        </div>

    )
}