"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field" 
import { Input } from "@/components/ui/input"
import { registerSchema, registerSchemaType } from "@/schema/register.shcema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Register() {

  const router = useRouter()

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    resolver: zodResolver(registerSchema),
    mode: 'onTouched'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  async function handleRegister(values: registerSchemaType) {

    try {

      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      )

      if (res.data.message === "success") {

        toast.success("Account created successfully", {
          duration: 3000,
          position: "top-center"
        })

        form.reset()
        router.push("/login")

      } else {
        toast.error(res.data.message || "Something went wrong")
      }


    } catch (err: unknown) {

  if (axios.isAxiosError(err)) {
    toast.error(
      err.response?.data?.message || "Something went wrong",
      { duration: 3000, position: "top-center" }
    )
  } else {
    toast.error(
      "Something went wrong",
      { duration: 3000, position: "top-center" }
    )
  }

}
  }

  return (


    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-[#020617] text-gray-800 dark:text-gray-200 p-4">
  
    <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] 
    p-6 sm:p-8 rounded-xl shadow-2xl 
    bg-white dark:bg-[#0f172a] 
    border dark:border-gray-800">

      <h2 className="text-3xl md:text-4xl font-bold text-center 
      text-gray-800 dark:text-white">
        Create Account
      </h2>

      <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
        Sign up to get started
      </p>

      <form
        className="mt-8 space-y-6"
        onSubmit={form.handleSubmit(handleRegister)}  
      >

        {/** Name */}
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...field}
                  className="dark:bg-[#020617] dark:text-white
                  focus:ring-2 focus:ring-emerald-500
                  transition-all duration-300"
                />
                {fieldState.invalid &&
                  <FieldError errors={[fieldState.error]} />
                }
              </Field>
            )}
          />
        </FieldGroup>

        {/** Email */}
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  className="dark:bg-[#020617] dark:text-white
                  focus:ring-2 focus:ring-emerald-500"
                />
                {fieldState.invalid &&
                  <FieldError errors={[fieldState.error]} />
                }
              </Field>
            )}
          />
        </FieldGroup>

        {/** Password */}
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => {

              const hasValue = field.value.length > 0

              return (
                <Field className="relative">

                  <FieldLabel>Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="pr-12 dark:bg-[#020617] dark:text-white
                      focus:ring-2 focus:ring-emerald-500"
                    />

                    {hasValue && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-400 hover:text-emerald-600 transition"
                      >
                        {showPassword
                          ? <EyeSlashIcon className="w-5 h-5" />
                          : <EyeIcon className="w-5 h-5" />
                        }
                      </button>
                    )}
                  </div>

                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />
                  }

                </Field>
              )
            }}
          />
        </FieldGroup>

        {/** Re Password */}
        <FieldGroup>
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => {

              const hasValue = field.value.length > 0

              return (
                <Field className="relative">

                  <FieldLabel>Confirm Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type={showRePassword ? "text" : "password"}
                      className="pr-12 dark:bg-[#020617] dark:text-white
                      focus:ring-2 focus:ring-emerald-500"
                    />

                    {hasValue && (
                      <button
                        type="button"
                        onClick={() => setShowRePassword(!showRePassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-400 hover:text-emerald-600 transition"
                      >
                        {showRePassword
                          ? <EyeSlashIcon className="w-5 h-5" />
                          : <EyeIcon className="w-5 h-5" />
                        }
                      </button>
                    )}
                  </div>

                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />
                  }

                </Field>
              )
            }}
          />
        </FieldGroup>

        {/** Phone */}
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Phone</FieldLabel>
                <Input
                  {...field}
                  type="tel"
                  className="dark:bg-[#020617] dark:text-white
                  focus:ring-2 focus:ring-emerald-500"
                />
                {fieldState.invalid &&
                  <FieldError errors={[fieldState.error]} />
                }
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full py-3 text-lg font-semibold
          bg-emerald-600 hover:bg-emerald-700
          transition-all duration-300
          rounded-xl shadow-lg"
        >
          {form.formState.isSubmitting ? "Registering..." : "Register"}
        </Button>

      </form>

      <div className="text-center mt-6 text-gray-500 dark:text-gray-400">
        Already have account?
        <Link
          href="/login"
          className="ml-2 text-emerald-500 hover:underline"
        >
          Login
        </Link>
      </div>
      </div>

    </div>
  )
}       
