  "use client"

import { getUserCart } from "@/CartActions/getUserCart.action"
import { useEffect, useState, ReactNode, createContext } from "react"

export type CartContextType = {
  numberOfItems: number
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>
}

export const CartContext = createContext<CartContextType | null>(null)

type CartContextProviderProps = {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(0)

  useEffect(() => {
    async function getLoggeduserCart() {
      const res = await getUserCart()

      if (res?.status === "success") {
        setNumberOfItems(res.numOfCartItems) // 👈 اهم تعديل
      }
    }

    getLoggeduserCart()
  }, [])

  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems }}>
      {children}
    </CartContext.Provider>
  )
}