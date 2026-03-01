"use client"

import { getUserCart } from "@/CartActions/getUserCart.action"
import { useEffect, useState, ReactNode, createContext } from "react"

// 1️⃣ context  type
export type CartContextType = {
  numberOfItems: number ;
  setNumberOfItems: React.Dispatch<React.SetStateAction<number>>
}

// 2️⃣ Create context with default value
export const CartContext = createContext<CartContextType | null>(null)

// 3️⃣ Provider props type
type CartContextProviderProps = {
  children: ReactNode ;
}


// 4️⃣ Provider component

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfItems, setNumberOfItems] = useState<number>(0)

  async function getLoggeduserCart() {
      const res = await getUserCart()

      if (res.status === "success") {
        let sum = 0
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count
        })

        setNumberOfItems(sum)
      } else { 
        console.log(res);
        
       }

  }

  useEffect(() => {
    function flag(){
      getLoggeduserCart()
    }
    flag()
  }, [])

  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems }}>
      {children}
    </CartContext.Provider>
  )
} 