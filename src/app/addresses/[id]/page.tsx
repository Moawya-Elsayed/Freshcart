"use client"

import { use, useEffect, useState } from "react"
import { getSpecificAddress } from "@/AddressActions/getSpecificAddress.action"
import { useRouter } from "next/navigation"
import { MdLocationOn, MdPhone, MdLocationCity } from "react-icons/md"
import { deleteAddress } from "@/AddressActions/deleteAddress.action"
import { toast } from "sonner"

interface Address {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}

export default function AddressDetails({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const router = useRouter()

  const [address, setAddress] = useState<Address | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const { id } = use(params) 
  useEffect(() => {

    async function fetchData() {
      const res = await getSpecificAddress(id)

      console.log(res)

      if (res.status === "success") {
        setAddress(res.data)
      }

      setLoading(false)
    }

    fetchData()

  }, [id])

  async function handleConfirmDelete() {
    const res = await deleteAddress(id)

    if (res.status === "success") {
      toast.success("Deleted successfully" , {
        duration:2000 , 
        position: "top-center"
      })
      router.push("/addresses")
    }
  }

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

      <div className="w-full max-w-3xl mx-auto px-4">

        {/* Header Section */}
        <div className="bg-linear-to-r from-emerald-500 to-emerald-600
        text-white p-8 rounded-2xl shadow-xl mb-8">

          <h1 className="text-3xl font-bold mb-2">
            {address.name}
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="
            bg-red-500 hover:bg-red-600
            text-white px-5 py-2 rounded-xl
            transition
            "
          >
            Delete Address
          </button>

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

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-xl w-[90%] max-w-sm text-center">

            <h2 className="text-xl font-bold mb-4">
              Delete this address?
            </h2>

            <p className="mb-6 text-gray-500">
              Are you sure you want to delete this address?
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowModal(false)
                  handleConfirmDelete()
                }}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}