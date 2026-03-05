"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export default function ProfilePage() {

  const { data: session } = useSession()

  if (!session?.user) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] pt-24">

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="bg-white dark:bg-[#0f172a] 
        rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border dark:border-gray-800">

          {/* Header */}

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-3xl rounded-full 
            bg-emerald-600 flex items-center 
            justify-center text-white font-bold">

              {session.user.name?.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold break-words">
                {session.user.name}
              </h1>
              <p className="text-gray-500">
                {session.user.role}
              </p>
            </div>

          </div>

          {/* Info */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2  gap-6">

            <div 
            className="
              flex items-center gap-3 sm:gap-4
              p-3 sm:p-4
              bg-gray-50 dark:bg-gray-800
              rounded-xl
              text-sm sm:text-base
              break-all
              " > 
              <Mail />
              {session.user.email}
            </div>

            <div className="flex items-center gap-4 p-4 
            bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Phone />
              {session.user.phone || "No phone added"}
            </div>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            {/* Primary Button */}
            <Link
              href="/profile/edit"
              className="
                w-full text-center
                bg-emerald-600 text-white
                px-6 py-3 sm:py-4 rounded-xl
                font-semibold text-base sm:text-lg
                shadow-md
                hover:bg-emerald-700
                hover:scale-[1.02]
                transition-all duration-300   
                              " 
            >
              Edit Profile
            </Link>


                  {/* Secondary Button */}
              <Link
                href="/changePassword"
                className="
                  w-full text-center
                  border border-emerald-600
                  text-emerald-600
                  dark:border-emerald-400
                  dark:text-emerald-400
                  px-6 py-3 sm:py-4
                  rounded-xl
                  font-medium
                  hover:bg-emerald-50
                  dark:hover:bg-emerald-950
                  hover:scale-[1.01]
                  transition-all duration-300
                  flex items-center justify-center
                "
              >
                Change Password
              </Link>

          </div>

        </div>

      </div>
    </div>
  )
}

