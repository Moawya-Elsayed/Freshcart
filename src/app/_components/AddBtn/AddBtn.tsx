    "use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/CartActions/addToCart.action";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";
import { useContext, useState } from "react";
import { ButtonHTMLAttributes } from "react";

interface AddBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
}

export default function AddBtn({ id, ...props }: AddBtnProps) {
  const { setNumberOfItems } = useContext(CartContext)!;
  const [loading, setLoading] = useState(false);

  async function addProductToCart(id: string) {
    setLoading(true);

    try {
      const res = await addToCart(id);
      console.log(res);

      if (res.status === "success") {
        toast.success(res.message, {
          duration: 2000,
          position: "top-center",
        });

        setNumberOfItems(res.numOfCartItems);
      } else {
        toast.error(res.message, {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch {
      toast.error("Something went wrong", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center">
      <Button
        onClick={() => addProductToCart(id)}
        disabled={loading}
        {...props}
        className="w-[85%] sm:w-[80%] bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 text-base md:text-lg font-semibold rounded-lg"
      >
        {loading ? "Adding..." : "Add To Cart"}
      </Button>
    </div>
  );
}   