"use client";

import { useState, useEffect , useContext  } from "react";
import { getWishlist } from "@/WishlistActions/getWishlist.action";
import Link from "next/link";
import AddBtn from "../_components/AddBtn/AddBtn";
import { removeFromWishlist } from "@/WishlistActions/removeProductWishlist.action";
import { toast } from "sonner";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
type WishlistProduct = {
  _id: string
  title: string
  price: number
  imageCover: string
}
import { WishlistContext } from "@/context/WishlistContext"
export default function WishlistPage() {

  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [disableFlag, setDisableFlag] = useState(false);
  const [removingId, setRemovingId] = useState("");
  const wishlistContext = useContext(WishlistContext)
  const setWishlistCount = wishlistContext?.setWishlistCount

  useEffect(() => {
    async function fetchWishlist() {
      const res = await getWishlist();
      if (res?.data) setWishlist(res.data);
      setLoading(false);
    }
    fetchWishlist();
  }, []);

  async function removeProductWishlist(id: string) {
    setDisableFlag(true);
    setRemovingId(id);

    const res = await removeFromWishlist(id);

    if (res.status === "success") {
      toast.success("Product removed successfully", {
        duration: 2000,
        position: "top-center"
      });

      setWishlist(prev => prev.filter(p => p._id !== id))
      setWishlistCount?.((prev) => prev - 1)
    } else {
      toast.error("Product can't be removed", {
        duration: 2000,
        position: "top-center"
      });
    }

    setDisableFlag(false);
    setRemovingId("");
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="sk-chase scale-125">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="sk-chase-dot" />
          ))}
        </div>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl 
      bg-gray-100 dark:bg-[#020617] text-gray-800 dark:text-gray-200">
        Your wishlist is empty 
      </div>
    );
  }

  return (
    <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto py-14 min-h-screen 
    bg-gray-100 dark:bg-[#020617] text-gray-800 dark:text-gray-200 transition-all duration-300">

      <h1 className="text-4xl md:text-5xl font-bold mb-14 text-center 
      text-gray-800 dark:text-white 
      border-b-2 border-emerald-500 pb-4 w-fit mx-auto">
        My Wishlist 
      </h1>

      
      <div className="flex flex-wrap -mx-3 justify-between">
        {wishlist.map(product => (
          <div
  key={product._id}
  className="w-full sm:w-[48%] md:w-[32%] lg:w-[23%] px-3 mb-6 group relative overflow-hidden 
          bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl 
            rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 
            transition-all duration-300 border border-gray-200 dark:border-gray-800"
>
            <div className="relative overflow-hidden">
              <Image
                src={product.imageCover}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-48 md:h-60 object-contain transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white font-bold py-2 text-center">
                {product.price} EGP
              </div>
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <h2 className="text-base md:text-lg font-semibold line-clamp-2 hover:text-emerald-600 transition-colors">
                  {product.title}
                </h2>

                <div className="flex flex-col gap-3 mt-auto">
                  <Link
                    href={`/products/${product._id}`}
                    className="text-center w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg shadow-sm transition-all duration-300"
                  >
                    View Details
                  </Link>

                  <div className="flex gap-2">
                    <AddBtn
                      id={product._id}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                    />

                    <button
                      disabled={removingId === product._id || disableFlag}
                      onClick={() => removeProductWishlist(product._id)}
                      className="w-11 flex items-center justify-center text-red-500 border border-red-200 hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-500 rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              </div>


          </div>
        ))}
      </div>


      
    </div>
  );
}