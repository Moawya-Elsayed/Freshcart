"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { addToWishlist } from "@/WishlistActions/addProductWishlist.action";
import { getWishlist } from "@/WishlistActions/getWishlist.action";
import { removeFromWishlist } from "@/WishlistActions/removeProductWishlist.action";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface WishlistBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  children?: ReactNode;
}

export default function WishlistBtn({id}: WishlistBtnProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);


  useEffect(() => {
    async function checkWishlist() {
      try {
        const wishlist = await getWishlist();

        const items = wishlist?.data || []

        const exists = items.some((item: { _id: string }) => item._id === id)
        setAdded(exists);
      } catch (err) {
        console.log(err);
      }
    }
    checkWishlist();
  }, [id]);

  async function handleToggle() {
    setLoading(true);
    try {
      if (!added) {
        const res = await addToWishlist(id);
        if (res.status === "success") {
          setAdded(true);
          toast.success(res.message, { duration: 2000, position: "top-center" });
        } else {
          toast.error("Can't add to wishlist now", { duration: 2000, position: "top-center" });
        }
      } else {
        const res = await removeFromWishlist(id);
        if (res.status === "success") {
          setAdded(false);
          toast.success(res.message, { duration: 2000, position: "top-center" });
        } else {
          toast.error("Can't remove from wishlist now", { duration: 2000, position: "top-center" });
        }
      }
    } catch {
      toast.error("You must login first", { duration: 2000, position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={loading}
      variant="outline"

      className="flex items-center gap-2 transition-all duration-300 hover:scale-105"

    >
      
      <Heart size={18} className={added ? "text-red-500" : "text-gray-500"} />
      {loading ? "Processing..." : added ? "In Wishlist" : "Add to Wishlist"}
    </Button>
  );
}