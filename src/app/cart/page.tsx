            "use client"

          import { useContext, useEffect, useState } from "react"
          import { getUserCart } from "@/CartActions/getUserCart.action"
          import { removeCartItem } from "@/CartActions/removeCartItem.action"
          import { updateCartItem } from "@/CartActions/updateCartItem.action"
          import { removeCart } from "@/CartActions/removeCart.action"
          import { toast } from "sonner"
          import { Button } from "@/components/ui/button"
          import { couponToCart } from "@/CartActions/couponToCart.action"
          import { FaTrashAlt } from "react-icons/fa"
          import { CartContext } from "@/context/CartContext"
          import { Cart , ProductCartType } from "@/types/cart.type"
          import { FaSpinner } from "react-icons/fa6";
          import Link from "next/link"  
          import { useRouter } from "next/navigation"
import Image from "next/image"


          export default function Carts() {
            const [isLoading, setIsLoading] = useState(true)
            const [products, setProducts] = useState<ProductCartType[]>([])
            const [actionId, setActionId] = useState<string | null>(null)
            const [actionType, setActionType] = useState<"update" | "remove" | null>(null)
            const [removingId, setRemovingId] = useState("")
            const [couponName, setCouponName] = useState("")
            const [totalPrice, setTotalPrice] = useState(0)
            const {numberOfItems, setNumberOfItems} = useContext(CartContext)!
            const [cartId, setCartId] = useState("");
            const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card")
            const router = useRouter()


            async function getUserCartProducts() {
              setIsLoading(true)
              const res: Cart = await getUserCart()
              setCartId(res.cartId)

              if (res.status === "success") {
                setProducts(res.data.products)
                setTotalPrice(res.data.totalCartPrice)
              }

              setIsLoading(false)
            }

            useEffect(() => {
              getUserCartProducts()
            }, [])

          async function removeProductFromCart(id: string) {
            setActionId(id)
            setActionType("remove")

            try {
              const res: Cart = await removeCartItem(id)

              if (res.status === "success") {

                toast.success("Product removed successfully", {
                  duration: 2000,
                  position: "top-center"
                })

                setRemovingId(id)

                setTimeout(() => {
                  setProducts(res.data.products)
                  setTotalPrice(res.data.totalCartPrice)
                  setNumberOfItems(res.numOfCartItems)
                  setRemovingId("")
                }, 300)

              } else {
                toast.error("Product can't be removed", {
                  duration: 2000,
                  position: "top-center"
                })
              }

            } finally {
              setActionId(null)
              setActionType(null)
            }
          }

            async function updateCartProduct( id: string , count: string) {

            setActionId(id)
            setActionType("update")

            try {
              const res = await updateCartItem(id, count)

              if (res.status === "success") {

                toast.success("Product quantity updated", {
                  duration: 2000,
                  position: "top-center"
                })

                setProducts(res.data.products)
                setTotalPrice(res.data.totalCartPrice)
                setNumberOfItems(res.numOfCartItems)

                let sum = 0
                res.data.products.forEach((product : ProductCartType) => {
                  sum += product.count
                })

                setNumberOfItems(sum)

              } else {
                toast.error("Product quantity can't be updated", {
                  duration: 2000,
                  position: "top-center"
                })
              }

            } finally {
              setActionId(null)
              setActionType(null)
            }
          }

            async function clearCart() {
            const res = await removeCart()

            if (res.status === "success") {

              toast.success("Cart cleared successfully", {
                duration: 2000,
                position: "top-center"
              })

              setProducts([])
              setNumberOfItems(0)

            } else {
              toast.error("Cart can't be cleared", {
                duration: 2000,
                position: "top-center"
              })
            }
          }

            async function applyCoupon(name: string) {
              const res = await couponToCart({ couponName: name })

              if (res.status === "success") {
                toast.success("Coupon applied successfully", {
                  duration: 2000,
                  position: "top-center"
                })

                setProducts(res.data.products)
                // setDiscountedTotal(res.data.totalPrice)
                setTotalPrice(res.data.totalPrice)

              } else {
                toast.error("Coupon can't be applied", {
                  duration: 2000,
                  position: "top-center"
                })
              }
            }


          return (
            <>
              {isLoading ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                  <div className="sk-chase scale-125">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                  </div>
                </div>
              ) : products.length > 0 ? (
                <div className="w-[95%] md:w-[90%] shadow-sm lg:w-[85%] xl:w-[75%] mx-auto py-8 bg-gray-100 dark:bg-[#020617]">

                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-emerald-600">
                      Your Shopping Cart
                    </h2>

                    <Button
                      onClick={clearCart}
                      className="cursor-pointer hover:underline bg-red-500 hover:bg-red-600 text-white"
                    >
                      <span className="flex items-center gap-1">
                        <FaTrashAlt /> Clear Cart
                      </span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-4">

                      {products.map((prod : ProductCartType) => (
                        <div
                          key={prod.product.id}

                          onTransitionEnd={() => {
                            if (removingId === prod.product.id) {
                              setProducts(prev =>
                                prev.filter(item =>
                                  item.product.id !== prod.product.id
                                )
                              )
                              setRemovingId("")
                            }
                          }}

                          className={`flex flex-col md:flex-row gap-4 bg-white dark:bg-[#0f172a] border dark:border-gray-800 rounded-xl shadow-md p-4 transition-all duration-300
                            ${removingId === prod.product.id
                              ? "opacity-0 translate-x-5 scale-95"
                              : "opacity-100 translate-x-0 scale-100"
                          }`}
                        >

                          <Image
                              src={prod.product.imageCover}
                              alt={prod.product.title}
                              width={112}
                              height={112}
                              className="w-28 h-28 object-cover rounded-md"
                            />

                          <div className="flex-1 flex flex-col justify-between">

                            <div>
                              <h3 className="font-semibold text-lg">
                                {prod.product.title}
                              </h3>

                              <p className="text-emerald-600 font-bold mt-2">
                                {prod.price * prod.count} EGP
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-4">

                              <div className="flex items-center gap-2">

                                <button
                                  disabled={
                                    actionId === prod.product.id &&
                                    actionType === "update"
                                  }

                                  onClick={() =>
                                    updateCartProduct(
                                      prod.product.id,
                                      `${prod.count - 1}`
                                    )
                                  }

                                  className="w-8 h-8 rounded-full 
                                  bg-gray-200 dark:bg-gray-700 
                                  hover:bg-gray-300 dark:hover:bg-gray-600 
                                  text-gray-800 dark:text-gray-200 
                                    transition disabled:opacity-50">
                                  -
                                </button>

                                {actionId === prod.product.id &&
                                actionType === "update" ? (
                                  
                                  <FaSpinner className="animate-spin text-emerald-500 dark:text-emerald-400"  />
                                ) : (
                                  <span className="font-medium">{prod.count}</span>
                                )}

                                <button
                                  disabled={
                                    actionId === prod.product.id &&
                                    actionType === "update"
                                  }

                                  onClick={() =>
                                    updateCartProduct(
                                      prod.product.id,
                                      `${prod.count + 1}`
                                    )
                                  }

                                  className="w-8 h-8 rounded-full 
                                  bg-gray-200 dark:bg-gray-700 
                                  hover:bg-gray-300 dark:hover:bg-gray-600 
                                  text-gray-800 dark:text-gray-200 
                                    transition disabled:opacity-50">
                                  +
                                </button>

                              </div>

                              <button
                                disabled={
                                  actionId === prod.product.id &&
                                  actionType === "remove"
                                }

                                onClick={() =>
                                  removeProductFromCart(prod.product.id)
                                }

                                className="cursor-pointer hover:underline flex items-center gap-1 text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                              >
                                <FaTrashAlt />

                                {actionId === prod.product.id && actionType === "remove"
                                  ? "Remove..."
                                  : "Remove"}
                              </button>

                            </div>  
                          </div>
                        </div>
                      ))} 

                    </div>

                    
                    {/* Summary */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-6 h-fit text-gray-800 dark:text-gray-200">

              <h3 className="text-xl font-bold mb-4">
                Order Summary
              </h3>

              <input
                type="text"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-[#020617] 
                rounded-lg px-3 py-2 text-sm mb-4 
                text-gray-800 dark:text-gray-200
                placeholder-gray-400 dark:placeholder-gray-500"
              />

              <div className="flex justify-between mb-3">
                <span>Total Items</span>
                <span>{numberOfItems ?? 0}</span>
              </div>

              <div className="flex justify-between mb-5 font-bold text-lg text-emerald-600 dark:text-emerald-400">
                <span>Total Price</span>
                <span>{totalPrice} EGP</span>
              </div>

              <Button
                disabled={!couponName.trim()}
                onClick={() => applyCoupon(couponName)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 
                dark:bg-yellow-500 dark:hover:bg-yellow-600 
                text-black dark:text-black
                py-3 text-lg font-semibold rounded-lg transition"
              >
                Apply Coupon
              </Button>

              <div className="mb-5 space-y-3">

                <h4 className="font-semibold">Payment Method</h4>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Visa / Card Payment</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <span>Cash On Delivery</span>
                </label>

              </div>
              <Button
                onClick={() => {
                  if (!cartId) {
                    toast.error("Cart not found")
                    return
                  }

                  if (paymentMethod === "card") {
                    router.push(`/checkout/${cartId}`)
                  } else {
                    router.push(`/checkout/${cartId}?method=cash`)
                  }
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-lg font-semibold rounded-lg mt-2 transition">
                Complete Order
              </Button>

              <div className="mt-4">
                
              <div className="mt-4">
                <Link href="/allorders">
                  <Button
                    className="
                      w-full
                      bg-transparent
                      border border-emerald-500
                      text-emerald-600
                      dark:text-emerald-400
                      hover:bg-emerald-50
                      dark:hover:bg-emerald-950
                      py-3 text-lg font-semibold
                      rounded-xl transition
                    "
                  >
                    View My Orders
                  </Button>
                </Link>
              </div>
        </div>

            </div>  

                  </div>
                </div>
              ) : (

                  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center 
                    bg-gray-100 dark:bg-[#020617] 
                    text-gray-800 dark:text-gray-200">

                      <h2 className="text-2xl font-bold text-emerald-500 dark:text-emerald-400 mb-2">
                        Your Cart is Empty
                      </h2>

                      <p className="text-gray-500 dark:text-gray-400">
                        Looks like you haven’t added anything yet.
                      </p>

                    </div>  
              )}


            </>
          )
          }
