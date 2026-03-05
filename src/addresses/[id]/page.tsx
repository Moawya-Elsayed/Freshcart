"use client"

import { useEffect, useState, use } from "react"
import { getSpecificAddress } from "@/AddressActions/getSpecificAddress.action"
import { useRouter } from "next/navigation"
import { MdLocationOn, MdPhone, MdLocationCity } from "react-icons/md"

interface Address {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}
export default function AddressDetails({ params }: { params: Promise<{ id: string }> }) {

  const router = useRouter()

  const { id } = use(params)

  const [address, setAddress] = useState<Address | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function fetchData() {

      const res = await getSpecificAddress(id)
      console.log(res);
      

      if (res.status === "success") {
        setAddress(res.data)
      }

      setLoading(false)
    }

    fetchData()

  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="sk-chase scale-125">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </div>
    )
  }

  if (!address) return null

  return (


    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] py-14">

  <div className="w-[95%] md:w-[65%] mx-auto">

    <button
      onClick={() => router.back()}
      className="mb-8 text-emerald-500 hover:underline font-medium"
    >
      ← Back
    </button>

    {/* Header Section */}
    <div className="bg-linear-to-r from-emerald-500 to-emerald-600
    text-white p-8 rounded-2xl shadow-xl mb-8">

      <h1 className="text-3xl font-bold mb-2">
        {address.name}
      </h1>

      <p className="opacity-90">
        Address Details Overview
      </p>

    </div>

    {/* Details Cards Grid */}
    <div className="grid md:grid-cols-2 gap-6">

      <div className="
      bg-white dark:bg-[#0f172a]
      rounded-2xl p-6 shadow-lg
      border dark:border-gray-800
      hover:shadow-xl transition
      ">
            <div className="flex items-center gap-3 mb-3 text-emerald-600 font-semibold">
              <MdLocationOn size={22}/>
              <h3>Location</h3>
            </div>
            
        <p>{address.details}</p>
      </div>

      <div className="
      bg-white dark:bg-[#0f172a]
      rounded-2xl p-6 shadow-lg
      border dark:border-gray-800
      hover:shadow-xl transition
      ">
            <div className="flex items-center gap-3 mb-3 text-emerald-600 font-semibold">
              <MdPhone size={22}/>
              <h3>Contact</h3>
            </div>

        <p>{address.phone}</p>
      </div>

      <div className="
      md:col-span-2
      bg-white dark:bg-[#0f172a]
      rounded-2xl p-6 shadow-lg
      border dark:border-gray-800
      hover:shadow-xl transition
      ">
            <div className="flex items-center gap-3 mb-3 text-emerald-600 font-semibold">
              <MdLocationCity size={22}/>
              <h3>City</h3>
            </div>

        <p>{address.city}</p>
      </div>

    </div>

  </div>
</div>
  )
}