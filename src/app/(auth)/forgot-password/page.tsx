"use client"

import { useState ,  type FormEvent } from "react"
import { apiRequest } from "@/lib/api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [loading , setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    setLoading(true)

    try {
      await apiRequest(
        "/auth/forgotPasswords",
        "POST",
        { email }
      )

      toast.success("Reset code sent to email")

      router.push(`/verify-code?email=${email}`)


    }catch(err){
    const message =
      err instanceof Error ? err.message : "Something went wrong"

    toast.error(message, {
      duration:2000,
      position:"top-center"
    })
  }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#020617]">

      <form onSubmit={handleSubmit}
        className="bg-white dark:bg-[#0f172a] p-8 rounded-2xl shadow-xl w-[90%] md:w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 rounded-xl border mb-4"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-emerald-600 text-white p-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Code"}
        </button>

      </form>

    </div>
  )
}