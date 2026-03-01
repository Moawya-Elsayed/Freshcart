"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaUser, FaLock, FaShieldAlt } from "react-icons/fa"

export default function ProfileLayout({
  children
}:{
  children:React.ReactNode
}){

  const pathname = usePathname()

  const links = [
    { name:"Profile", href:"/profile", icon:FaUser },
    { name:"Security", href:"/profile/security", icon:FaShieldAlt },
    { name:"Password", href:"/profile/security/change-password", icon:FaLock }
  ]

  return(
    <div className="min-h-screen bg-gray-100 dark:bg-[#020617] pt-24">

      <div className="w-[95%] mx-auto max-w-6xl grid md:grid-cols-[250px_1fr] gap-6">

        {/* Sidebar */}
        <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-lg h-fit">

          <h2 className="font-bold text-xl mb-6">
            Dashboard
          </h2>

          <div className="space-y-2">

            {links.map((link,i)=>{

              const Icon = link.icon
              const active = pathname === link.href

              return(
                <Link
                  key={i}
                  href={link.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition
                  ${active
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-emerald-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon/>
                  {link.name}
                </Link>
              )
            })}

          </div>

        </div>

        {/* Content */}
        <div>
          {children}
        </div>

      </div>
    </div>
  )
}