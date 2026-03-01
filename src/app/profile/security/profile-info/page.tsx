"use client"

import { useSession } from "next-auth/react"

export default function ProfileInfo(){

  const { data: session } = useSession()

  if(!session) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#020617]">

      <div className="bg-white dark:bg-[#0f172a]
      p-8 rounded-2xl shadow-xl w-[90%] md:w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Profile Info
        </h2>

        <div className="space-y-4">

          <p>Name : {session.user?.name}</p>
          <p>Email : {session.user?.email}</p>

        </div>

      </div>

    </div>
  )
}