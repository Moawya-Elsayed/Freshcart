"use client"

import { createContext, useEffect, useState, ReactNode } from "react"
import { getWishlist } from "@/WishlistActions/getWishlist.action"

export type WishlistContextType = {
  wishlistCount: number
  setWishlistCount: React.Dispatch<React.SetStateAction<number>>
}

export const WishlistContext = createContext<WishlistContextType | null>(null)

type WishlistProviderProps = {
  children: ReactNode
}

export function WishlistContextProvider({ children }: WishlistProviderProps) {
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    async function fetchWishlist() {
      const res = await getWishlist()

      if (res?.data) {
        setWishlistCount(res.data.length)
      }
    }

    fetchWishlist()
  }, [])

  return (
    <WishlistContext.Provider value={{ wishlistCount, setWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  )
}