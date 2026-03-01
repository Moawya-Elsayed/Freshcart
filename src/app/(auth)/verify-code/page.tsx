"use client"

import { useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Suspense } from "react"


function VerifyCodeContent(){

  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get("email")

  const [code,setCode] = useState(["","","","","",""])
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [loading,setLoading] = useState(false)

  function handleChange(value:string,index:number){

    if(!/^[0-9]*$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value.slice(-1)

    setCode(newCode)

    if(value && index < 5){
      inputsRef.current[index+1]?.focus()
    }
  }

  async function handleVerify(){

    try{

      setLoading(true)

      const resetCode = code.join("")

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/auth/verifyResetCode`,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({ resetCode })
        }
      )

      const data = await res.json()

      if(!res.ok){
        throw new Error(data.message)
      }

      toast.success("Code verified", {
        duration:2000,
        position:"top-center"
      })

      router.push(`/reset-password?email=${email}`)

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

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#020617]">

      <div className="bg-white dark:bg-[#0f172a] p-8 rounded-2xl shadow-xl w-[95%] md:w-96">

        <h2 className="text-xl font-bold text-center mb-6">
          Enter Verification Code
        </h2>

        <div className="flex justify-center gap-2 mb-6">

          {code.map((c,i)=>(
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              value={c}
              maxLength={1}
              onChange={e=>handleChange(e.target.value,i)}
              onPaste={e=>{
                const paste = e.clipboardData.getData("text")
                if(paste.length===6){
                  setCode(paste.split(""))
                }
              }}
              className="w-12 h-12 text-center text-xl border rounded-lg"
            />
          ))}

        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-emerald-600 text-white p-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>

      </div>

    </div>
  )
}


export default function VerifyCodePage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyCodeContent />
    </Suspense>
  )
}