
"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { updateProfileAction } from "@/actions/updateProfile.action"
import { UpdateProfilePayload } from "@/types/Profile.types"

export default function ProfilePage(){

  const { data: session , update } = useSession()

  const [name , setName] = useState(session?.user?.name || "")
  const [email , setEmail] = useState(session?.user?.email || "")
  const [phone , setPhone] = useState("")

  const [loading , setLoading] = useState(false)

  const phoneRegex = /^01[0125][0-9]{8}$/

  if(phone && !phoneRegex.test(phone)){
  toast.error("Invalid phone number", {
    duration:2000 ,
    position:"top-center"
  })
  return
  }

  if(name.length < 3){
  toast.error("Name must be at least 3 characters", {
    duration:2000 ,
    position:"top-center"
  })
  return
  }
  async function handleSubmit(e:React.FormEvent){
    e.preventDefault()

    try{

      setLoading(true)
       const payload: UpdateProfilePayload = {
      name,
      email,
      phone
    } 

    await updateProfileAction(payload) ; 

      toast.success("Profile updated" , {
        duration:2000 , 
        position:"top-center"
      })  

      await update()

    }catch(err){
    const message =
      err instanceof Error ? err.message : "Something went wrong"

    toast.error(message,{
      duration:2000,
      position:"top-center"
    })
  }

    setLoading(false)
  }

  return(
    <div className="min-h-screen bg-gray-100 dark:bg-[#020617] p-10">

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white dark:bg-[#0f172a] p-8 rounded-2xl shadow-xl space-y-4"
      >

        <h1 className="text-2xl font-bold mb-6">
          Update Profile
        </h1>

        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Name"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Phone"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-emerald-600 text-white p-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

      </form>

    </div>
  )
}