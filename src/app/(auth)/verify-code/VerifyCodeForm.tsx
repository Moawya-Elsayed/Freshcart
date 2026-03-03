"use client"

import { useState, useRef, FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { verifyResetCode } from "@/api/verifyCode"

export default function VerifyCodePage(){

 const router = useRouter()
 const searchParams = useSearchParams()

 const email = searchParams.get("email")

 const [code,setCode] = useState(["","","","","",""])
 const [loading,setLoading] = useState(false)

 const inputsRef = useRef<(HTMLInputElement | null)[]>([])

 function handleChange(value:string,index:number){

  if(!/^[0-9]*$/.test(value)) return

  const newCode = [...code]

  if(value){
    newCode[index] = value.slice(-1)

    if(index < 5){
      inputsRef.current[index+1]?.focus()
    }

  }else{
    newCode[index] = ""

    if(index > 0){
      inputsRef.current[index-1]?.focus()
    }
  }

  setCode(newCode)
 }

 function handleKeyDown(
  e:React.KeyboardEvent<HTMLInputElement>,
  index:number
 ){
  if(e.key === "Backspace"){
    if(!code[index] && index > 0){
      inputsRef.current[index-1]?.focus()
    }
  }
 }

 async function handleVerify(e?:FormEvent){

  e?.preventDefault()

  try{

    if(!email){
      toast.error("Email not found" , {
        duration:2000 ,
        position:"top-center"
      })

      router.replace("/login")
      return
    }

    const resetCode = code.join("")

    setLoading(true)

    await verifyResetCode({
      resetCode
    })

    toast.success("Code verified", {
      duration:2000 ,
      position:"top-center"
    })

    router.push(`/reset-password?email=${email}`)

  }catch(err){

    toast.error(err instanceof Error? err.message: "Something went wrong",{
        duration:2000 ,
        position:"top-center"
      }
    )

  }

  setLoading(false)
 }

 return (
 <div className="min-h-screen w-full flex items-center justify-center
 bg-gray-100 dark:bg-[#020617]
 text-gray-800 dark:text-gray-200 p-4">

  <form
    onSubmit={handleVerify}
    className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%]
    bg-white dark:bg-[#0f172a]
    border dark:border-gray-800
    p-6 sm:p-8 rounded-2xl shadow-xl"
  >

    <h2 className="text-2xl font-bold text-center mb-6">
      Enter Verification Code
    </h2>

    <div className="flex justify-center gap-3 mb-6">

      {code.map((c,i)=>(
        <input
          key={i}

          ref={(el)=>{
            inputsRef.current[i] = el
          }}

          value={c}

          maxLength={1}

          onChange={e=>handleChange(e.target.value,i)}

          onKeyDown={e=>handleKeyDown(e,i)}

          onPaste={e=>{
            const paste =
              e.clipboardData.getData("text")

            if(paste.length === 6){
              setCode(paste.split(""))
            }
          }}

          className="w-14 h-14 text-center text-xl
          border rounded-lg
          bg-gray-50 dark:bg-[#020617]
          border-gray-200 dark:border-gray-700
          focus:ring-2 focus:ring-emerald-500"
        />
      ))}

    </div>

    <button
      type="submit"
      disabled={
        loading ||
        code.some(c=>!c)
      }
      className="w-full bg-emerald-600 hover:bg-emerald-800
      text-white p-3 rounded-lg font-semibold
      transition "
    >
      {loading ? "Verifying..." : "Verify Code"}
    </button>

  </form>

 </div>
 )
}