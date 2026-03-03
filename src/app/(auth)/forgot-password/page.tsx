"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
  import { forgotPassword } from "../../../api/forgotPassword"


export default function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) 
  async function handleSubmit(e:FormEvent<HTMLFormElement>){

    e.preventDefault()

    if(!isValidEmail){
      toast.error("Please enter valid email" , {
        duration: 2000 ,
        position: "top-center"
      })
      return
    }

    setLoading(true)

    try{

      await forgotPassword({ email } )

      toast.success("Reset code sent to email" , {
        duration:2000 ,
        position:"top-center"
      })

      router.push(`/verify-code?email=${email}`)

    }catch(err){

      const msg =
        err instanceof Error
        ? err.message
        : "Something went wrong"

      toast.error(msg , {
        duration:2000 ,
        position:"top-center"
      })

    }

    setLoading(false)
  }

return (
<div className="min-h-screen w-full flex items-center justify-center
bg-gray-100 dark:bg-[#020617]
text-gray-800 dark:text-gray-200
p-4 transition-colors duration-300">

  <form
    onSubmit={handleSubmit}
    className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%]
    bg-white dark:bg-[#0f172a]
    border dark:border-gray-800
    p-6 sm:p-8 rounded-2xl shadow-2xl
    transition-all duration-300"
  >

    <h2 className="text-3xl font-bold text-center">
      Forgot Password
    </h2>

    <input
      type="email"
      placeholder="Enter your email"
      className="w-full p-3 rounded-lg border mt-6
      bg-gray-50 dark:bg-[#020617]
      border-gray-200 dark:border-gray-700
      focus:ring-2 focus:ring-emerald-500 transition"
      value={email}
      onChange={e=>setEmail(e.target.value)}
      required
    />

    <button
      disabled={loading}
      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700
      text-white p-3 rounded-lg font-semibold
      transition disabled:opacity-50"
    >
      {loading ? "Sending..." : "Send Code"}
    </button>

  </form>

</div>
)
}