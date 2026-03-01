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
   

    <div className="w-[95%] md:w-[80%] lg:w-[60%] mx-auto py-12">

        <div className="flex items-center justify-between mb-10">
            <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-emerald-500 hover:text-emerald-600 transition font-medium"
            >
              <MdArrowBack />
              Go Back
            </button>

            <h2 className="text-3xl font-bold text-emerald-600">
            My Addresses
            </h2>
        </div>

        {/* Add Form */}
        <form
            onSubmit={handleAdd}
            className="bg-white dark:bg-[#0f172a]
            p-6 rounded-2xl shadow-lg border dark:border-gray-800
            space-y-4 mb-10"
        >
            <input
            name="name"
            placeholder="Address Name"
            className="w-full p-3 rounded-xl border dark:border-gray-700
            focus:ring-2 focus:ring-emerald-500 outline-none
            dark:bg-[#020617]"
            required
            />

            <input
            name="details"
            placeholder="Details"
            className="w-full p-3 rounded-xl border dark:border-gray-700
            focus:ring-2 focus:ring-emerald-500 outline-none
            dark:bg-[#020617]"
            required
            />

            <div className="grid md:grid-cols-2 gap-4">
            <input
                name="phone"
                placeholder="Phone"
                className="p-3 rounded-xl border dark:border-gray-700
                focus:ring-2 focus:ring-emerald-500 outline-none
                dark:bg-[#020617]"
                required
            />

            <input
                name="city"
                placeholder="City"
                className="p-3 rounded-xl border dark:border-gray-700
                focus:ring-2 focus:ring-emerald-500 outline-none
                dark:bg-[#020617]"
                required
            />
            </div>

            <Button className="w-full bg-emerald-500 hover:bg-emerald-600
            text-white py-6 rounded-xl transition">
            Add Address
            </Button>
        </form>

        {/* Address List */}
        <div className="grid gap-6">
            {addresses.map((address) => (
            <div  
                key={address._id}
                className="bg-white dark:bg-[#0f172a]
                border dark:border-gray-800
                rounded-2xl shadow-lg
                p-6
                hover:shadow-2xl hover:-translate-y-1
                transition duration-300
                flex flex-col md:flex-row
                justify-between md:items-center gap-6"
            >
                <div className="space-y-2">
                <h3 className="font-bold text-lg text-emerald-600">
                    {address.name}
                </h3>

              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MdLocationOn className="text-emerald-500" />
                {address.details}
              </p>


              <p className="flex items-center gap-2">
                <MdPhone className="text-emerald-500" />
                {address.phone}
              </p>

              <p className="flex items-center gap-2">
                <MdLocationCity className="text-emerald-500" />
                {address.city}
              </p>

                </div>

                <div className="flex gap-3">
                {/* <Link href={`/profile/addresses/${address._id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                    View Details
                    </Button>
                </Link> */}

                <Button
                    onClick={() => handleDelete(address._id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                    Delete
                </Button>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}