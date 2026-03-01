// "use client"

// import { useState , type FormEvent } from "react"
// import { apiRequest } from "@/lib/api"
// import { toast } from "sonner"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"

// export default function ChangePassword() {

//   const { data: session } = useSession()
//   const router = useRouter()

//   const [currentPassword,setCurrentPassword] = useState("")
//   const [password,setPassword] = useState("")
//   const [rePassword,setRePassword] = useState("")

//   const passwordRegex =
//   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/

//   if(!passwordRegex.test(password)){
//   toast.error("Password must be strong" , {
//     duration:2000,
//     position:"top-center"
//   })
//   return
//   }

//   if(password !== rePassword){
//   toast.error("Passwords not match", {
//     duration:2000,
//     position:"top-center"
//   })
//   return
//   }

//   async function handleSubmit(e:FormEvent<HTMLFormElement>){
//     e.preventDefault()

//     try { 

//       await apiRequest(
//         "/users/changeMyPassword",
//         "PUT",
//         {
//           currentPassword,
//           password,
//           rePassword
//         },
//         // session?.user?.token
//         session?.token
//       )     

//       toast.success("Password changed successfully")

//       router.push("/")

//     } catch(err) {
//         const message =
//           err instanceof Error ? err.message : "Something went wrong"

//         toast.error(message)
//       }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#020617]">

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white dark:bg-[#0f172a]
//         p-8 rounded-2xl shadow-xl w-[90%] md:w-96"
//       >

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Change Password
//         </h2>

//         <input
//           placeholder="Current Password"
//           type="password"
//           className="w-full p-3 border rounded-xl mb-4"
//           value={currentPassword}
//           onChange={e=>setCurrentPassword(e.target.value)}
//         />

//         <input
//           placeholder="New Password"
//           type="password"
//           className="w-full p-3 border rounded-xl mb-4"
//           value={password}
//           onChange={e=>setPassword(e.target.value)}
//         />

//         <input
//           placeholder="Confirm Password"
//           type="password"
//           className="w-full p-3 border rounded-xl mb-4"
//           value={rePassword}
//           onChange={e=>setRePassword(e.target.value)}
//         />

//         <button className="w-full bg-emerald-600 text-white p-3 rounded-xl">
//           Update Password
//         </button>

//       </form>

//     </div>
//   )
// }

"use client"

import { useState , type FormEvent } from "react"
import { apiRequest } from "@/lib/api"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function ChangePassword() {

  const { data: session } = useSession()
  const router = useRouter()

  const [currentPassword,setCurrentPassword] = useState("")
  const [password,setPassword] = useState("")
  const [rePassword,setRePassword] = useState("")

  const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    try {

      if(!passwordRegex.test(password)){
        toast.error("Password must be strong")
        return
      }

      if(password !== rePassword){
        toast.error("Passwords not match")
        return
      }

      if(!currentPassword){
        toast.error("Enter current password")
        return
      }

      await apiRequest(
        "/users/changeMyPassword",
        "PUT",
        {
          currentPassword,
          password,
          rePassword
        },
        session?.token
      )

      toast.success("Password changed successfully")

      router.push("/")

    } catch(err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong"

      toast.error(message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#020617]">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#0f172a]
        p-8 rounded-2xl shadow-xl w-[90%] md:w-96"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Change Password
        </h2>

        <input
          placeholder="Current Password"
          type="password"
          className="w-full p-3 border rounded-xl mb-4"
          value={currentPassword}
          onChange={e=>setCurrentPassword(e.target.value)}
        />

        <input
          placeholder="New Password"
          type="password"
          className="w-full p-3 border rounded-xl mb-4"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          className="w-full p-3 border rounded-xl mb-4"
          value={rePassword}
          onChange={e=>setRePassword(e.target.value)}
        />

        <button className="w-full bg-emerald-600 text-white p-3 rounded-xl">
          Update Password
        </button>

      </form>

    </div>
  )
}