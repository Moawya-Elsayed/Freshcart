"use client";

import { useState, useEffect } from "react";
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
export default function WishlistPage() {

  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [disableFlag, setDisableFlag] = useState(false);
  const [removingId, setRemovingId] = useState("");

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

      setWishlist(prev => prev.filter(p => p._id !== id));
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
    <div className="container mx-auto py-14 px-4 min-h-screen 
    bg-gray-100 dark:bg-[#020617] 
    text-gray-800 dark:text-gray-200 transition-all duration-300">

      <h1 className="text-4xl md:text-5xl font-bold mb-14 text-center 
      text-gray-800 dark:text-white 
      border-b-2 border-emerald-500 pb-4 w-fit mx-auto">
        My Wishlist 
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {wishlist.map(product => (
          <div
            key={product._id}
            className="group relative overflow-hidden 
            bg-white/80 dark:bg-[#0f172a]/80 
            backdrop-blur-xl 
            rounded-2xl shadow-lg 
            hover:-translate-y-2 
            transition-all duration-300 
            border border-gray-200 dark:border-gray-800"
          >

            {/* Image */}
            <div className="relative overflow-hidden">
            
              <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-60 object-contain 
                  transition-transform duration-500 
                  group-hover:scale-110"
                />

              <div className="absolute bottom-0 left-0 w-full 
              bg-black/40 text-white font-bold py-2 text-center">
                {product.price} EGP
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4">

              <h2 className="text-lg font-semibold 
              line-clamp-2 
              hover:text-emerald-600 transition-colors">
                {product.title}
              </h2>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-auto">

                <Link
                  href={`/products/${product._id}`}
                  className="text-center w-full 
                  bg-blue-500 hover:bg-blue-600 
                  text-white font-semibold py-3 rounded-xl 
                  shadow-md transition-all duration-300"
                >
                  View Details
                </Link>

                <AddBtn
                  id={product._id}
                  className="w-full 
                  bg-emerald-600 hover:bg-emerald-700 
                  text-white font-semibold py-3 rounded-xl 
                  transition-all duration-300 
                  hover:scale-[1.03]"
                />

                <button
                  disabled={removingId === product._id || disableFlag}
                  onClick={() => removeProductWishlist(product._id)}
                  className="w-[70%] mx-auto flex items-center justify-center gap-2 
                  text-red-500 border border-red-200 
                  hover:bg-red-50 dark:hover:bg-red-950 
                  hover:border-red-500 
                  font-semibold py-2 rounded-xl 
                  transition-all duration-300 
                  disabled:opacity-50"
                >
                  <FaTrashAlt />
                  {removingId === product._id ? "Removing..." : "Remove"}
                </button>

              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}