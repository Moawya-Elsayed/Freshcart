          "use client"
          import { Button } from "@/components/ui/button"
          import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
          import { Input } from "@/components/ui/input"
          import { zodResolver } from "@hookform/resolvers/zod"
          import { Controller, useForm } from "react-hook-form"
          import { toast } from "sonner"
          import { checkoutSchema, checkoutSchemaType } from "@/schema/checkout.schema"
          import { useParams, useSearchParams , useRouter } from "next/navigation"
          import { checkPayment } from "@/orderActions/checkout.actions"
          import { createCashOrder } from "@/orderActions/createCashOrder.action"
          import { getUserAddresses } from "@/AddressActions/getUserAddresses.action"
          import { useEffect, useState } from "react"

          type AddressType = {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}
          export default function Checkout() {
            const router = useRouter()
            const searchParams = useSearchParams()
            const [addresses, setAddresses] = useState<AddressType[]>([])
              
            const paymentMethod = searchParams.get("method")

            const params = useParams()
            const id = params?.id as string
            console.log(id);
            
              const form = useForm<   checkoutSchemaType  >({
              defaultValues: { details: '', phone: '' , city: '' },
              resolver: zodResolver( checkoutSchema ),
              mode: 'onTouched'
            })

            const { handleSubmit } = form

            async function handleCheckout(values: checkoutSchemaType) {

              if (paymentMethod === "cash") {

                const res = await createCashOrder(id, values)

                if (res.status === "success") {
                  router.refresh()
                  toast.success("Order created successfully" ,{
                    duration:2000 , 
                    position:"top-center"
                  })
                  router.push("/allorders")
                }

              } else {

                const res = await checkPayment(id, values)

                if (res.status === "success") {
                  router.push(res.session.url)
                } else {
                  toast.error("Payment failed", {
                    duration: 2000,
                    position: "top-center"
                  })
                }
              }
            }
            useEffect(() => {
              async function fetchAddresses() {
                const res = await getUserAddresses()
                if (res.status === "success") {
                  setAddresses(res.data)
                }
              }

              fetchAddresses()
            }, [])

            return (
            <div className="min-h-screen w-full flex items-center justify-center 
            bg-gray-100 dark:bg-[#020617] 
            text-gray-800 dark:text-gray-200 p-4">

              <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]
              p-6 sm:p-8 rounded-2xl shadow-2xl
              bg-white dark:bg-[#0f172a]
              border dark:border-gray-800
              transition-all duration-300">

                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  Welcome 
                </h2>

                <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
                  Checkout Now
                </p>

                <div className="mb-6 space-y-3">
                  <h3 className="font-semibold text-lg">Select Address</h3>

                  {addresses.map((address) => (
                    <label
                      key={address._id}
                      className="flex items-start gap-2 border p-3 rounded-lg cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="address"
                        onChange={() => {
                          // setSelectedAddress(address)
                          form.setValue("details", address.details)
                          form.setValue("phone", address.phone)
                          form.setValue("city", address.city)
                        }}
                      />

                      <div>
                        <p className="font-semibold">{address.name}</p>
                        <p>{address.details}</p>
                        <p>{address.phone}</p>
                        <p>{address.city}</p>
                      </div>
                    </label>
                  ))}

                  {addresses.length === 0 && (
                    <p className="text-red-500">
                      You don&apos;t have any saved addresses..
                    </p>
                  )}
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit(handleCheckout)} >

                  {/* detils */}
                  <FieldGroup>
                    <Controller
                      name="details"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Details :</FieldLabel>

                          <Input
                            {...field}
                            type="text"
                            autoComplete="on"
                            className="bg-gray-50 dark:bg-[#020617] 
                            border border-gray-200 dark:border-gray-700
                            focus:ring-2 focus:ring-emerald-500 transition"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* phone */}
                  <FieldGroup>
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Phone : </FieldLabel>

                          <Input
                            {...field}
                            type="tel"
                            autoComplete="on"
                            className="bg-gray-50 dark:bg-[#020617] 
                            border border-gray-200 dark:border-gray-700
                            focus:ring-2 focus:ring-emerald-500 transition"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* city */}
                  <FieldGroup>
                    <Controller
                      name="city"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>City</FieldLabel>

                          <Input
                            {...field}
                            type="text"
                            autoComplete="on"
                            className="bg-gray-50 dark:bg-[#020617] 
                            border border-gray-200 dark:border-gray-700
                            focus:ring-2 focus:ring-emerald-500 transition"
                          />

                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>




                    {/* Button  */}
                    <Button
                      type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full py-3 text-lg font-semibold
                    bg-emerald-600 hover:bg-emerald-700
                    transition-all duration-300"
                  >
                    {form.formState.isSubmitting ? "Pay Now..." : "Pay Now !"}
                  </Button>

                </form>

              </div>
            </div>
          )
            }
          

