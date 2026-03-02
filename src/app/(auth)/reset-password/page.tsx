"use client"

import { useState , type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Suspense } from "react"

function ResetPasswordContent(){

  const router = useRouter()
  const params = useSearchParams()

  const email = params.get("email")

  const [password,setPassword] = useState("")
  const [rePassword,setRePassword] = useState("")
  const [show,setShow] = useState(false)
  const passwordRegex =
/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/

  async function handleSubmit(e:FormEvent<HTMLFormElement>){

    e.preventDefault()

    if(!passwordRegex.test(password)){
      toast.error("Password must be strong" ,{
        duration:2000 ,
        position:"top-center"
      })
      return
      }

      if(password !== rePassword){
      toast.error("Passwords not match",{
        duration:2000 ,
        position:"top-center"
      })
      return
      }   

    try{

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,
            newPassword:password
          })
        }
      )

      const data = await res.json()

      if(!res.ok){
        throw new Error(data.message)
      }

      toast.success("Password reset successfully", {
        duration:2000,
        position:"top-center"
      })

      router.push("/login")

    }catch(err){
      const message =
        err instanceof Error ? err.message : "Something went wrong"

      toast.error(message, {
        duration:2000,
        position:"top-center"
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#020617]">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#0f172a] p-8 rounded-2xl shadow-xl w-96 space-y-4"
      >

        <h2 className="text-xl font-bold text-center">
          Reset Password
        </h2>
    
        <input
          type={show ? "text":"password"}
          placeholder="New Password"
          className="w-full border p-3 rounded-lg"
          onChange={e=>setPassword(e.target.value)}
        />

        <input
          type={show ? "text":"password"}
          placeholder="Confirm Password"
          className="w-full border p-3 rounded-lg"
          onChange={e=>setRePassword(e.target.value)}
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" onChange={()=>setShow(!show)} />
          Show Password
        </label>

        <button className="w-full bg-emerald-600 text-white p-3 rounded-xl">
          Reset Password
        </button>

      </form>

    </div>
  )
}

export default function ResetPasswordPage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}     