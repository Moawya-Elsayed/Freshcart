    "use client"

import { useEffect, useState } from "react"
import { addAddress } from "@/AddressActions/addAddress.action"
import { getUserAddresses } from "@/AddressActions/getUserAddresses.action"
import { deleteAddress } from "@/AddressActions/deleteAddress.action"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { MdLocationOn, MdPhone, MdLocationCity, MdArrowBack } from "react-icons/md"
interface Address {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}
export default function Addresses() {
  
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
  
  async function fetchAddresses() {
    setIsLoading(true)
    const res = await getUserAddresses()
    

    if (res.status === "success") {
      setAddresses(res.data)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    function flag(){
      fetchAddresses()
    }
    flag()
  }, [])


  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  const form = e.currentTarget

  const formData = new FormData(form)
  form.reset()

  const body = {
    name: formData.get("name") as string,
    details: formData.get("details") as string,
    phone: formData.get("phone") as string,
    city: formData.get("city") as string,
  }

  const res = await addAddress(body)

  if (res.status === "success") {
    toast.success("Address added successfully", {
      duration: 2000,
      position: "top-center",
    })

    form.reset() 
    fetchAddresses()
  } else {
    toast.error("Failed to add address", {
      duration: 2000,
      position: "top-center",
    })
  }
}

  async function handleDelete(id: string) {
    const res = await deleteAddress(id)
    

    if (res.status === "success") {
      toast.success("Address removed successfully",{
        duration:2000 , 
        position: "top-center"
      })

      fetchAddresses()
    } else {
      toast.error("Failed to remove address",{
        duration:2000 , 
        position: "top-center"
      })

    }
  }

  if (isLoading) return         
                                <div className="min-h-[60vh] flex items-center justify-center">
                                    <div className="sk-chase scale-125">
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                    </div>
                                </div>
  return (
  <div className="w-[95%] md:w-[80%] lg:w-[60%] mx-auto py-14">

    {/* Header */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition font-semibold"
      >
        <MdArrowBack className="text-lg" />
        Go Back
      </button>

      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text 
      bg-gradient-to-r from-emerald-500 to-emerald-600">
        My Addresses
      </h2>
    </div>

    {/* Add Address Form */}
    <form
      onSubmit={handleAdd}
      className="bg-[#0f172a] border border-[#1e293b]
      p-8 rounded-3xl shadow-2xl space-y-5 mb-14
      backdrop-blur-sm"
    >
      <input
        name="name"
        placeholder="Address Name"
        className="w-full p-4 rounded-xl border border-[#1e293b]
        focus:ring-2 focus:ring-emerald-500 outline-none
        bg-[#020617] text-white placeholder-gray-500
        transition"
        required
      />

      <input
        name="details"
        placeholder="Details"
        className="w-full p-4 rounded-xl border border-[#1e293b]
        focus:ring-2 focus:ring-emerald-500 outline-none
        bg-[#020617] text-white placeholder-gray-500 transition"
        required
      />

      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="phone"
          placeholder="Phone"
          className="p-4 rounded-xl border border-[#1e293b]
          focus:ring-2 focus:ring-emerald-500 outline-none
          bg-[#020617] text-white placeholder-gray-500 transition"
          required
        />

        <input
          name="city"
          placeholder="City"
          className="p-4 rounded-xl border border-[#1e293b]
          focus:ring-2 focus:ring-emerald-500 outline-none
          bg-[#020617] text-white placeholder-gray-500 transition"
          required
        />
      </div>

      <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600
      hover:from-emerald-600 hover:to-emerald-700
      text-white py-4 rounded-xl font-semibold text-lg transition shadow-lg">
        Add Address
      </Button>
    </form>

    {/* Address List */}
    <div className="grid gap-6">
      {addresses.map((address) => (
        <div
          key={address._id}
          className="bg-[#0f172a] border border-[#1e293b]
          rounded-3xl shadow-lg p-6
          hover:shadow-2xl hover:-translate-y-1
          transition duration-300
          flex flex-col md:flex-row justify-between md:items-center gap-6"
        >
          <div className="space-y-3">
            <h3 className="font-bold text-xl text-emerald-500">
              {address.name}
            </h3>

            <p className="flex items-center gap-2 text-gray-400">
              <MdLocationOn className="text-emerald-500" />
              {address.details}
            </p>

            <p className="flex items-center gap-2 text-gray-400">
              <MdPhone className="text-emerald-500" />
              {address.phone}
            </p>

            <p className="flex items-center gap-2 text-gray-400">
              <MdLocationCity className="text-emerald-500" />
              {address.city}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleDelete(address._id)}
              className="bg-red-500 hover:bg-red-600 text-white
              rounded-xl py-3 px-6 font-medium transition shadow-md"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}