  "use client"
  import { Button } from "@/components/ui/button"
  import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { Controller, useForm } from "react-hook-form"
  import { useState } from "react"
  import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
  import Link from "next/link"
  import { toast } from "sonner"
  import { loginSchema, loginSchemaType } from "@/schema/login.shcema"
  import { signIn } from "next-auth/react"

  export default function Login() {
      const form = useForm<  loginSchemaType   >({
      defaultValues: { email: '', password: '' },
      resolver: zodResolver( loginSchema  ),
      mode: 'onTouched'
    })
    const { handleSubmit } = form

    const [showPassword, setShowPassword] = useState(false)

    async function handleLogin(values : loginSchemaType ) {

      const res = await signIn( "credentials" , {
        email : values.email , 
        password : values.password ,
        redirect : false ,
        callbackUrl : "/"
      })


      if (res?.ok){
        toast.success("you logged successfully " , {
          duration : 3000 , 
          position : "top-center"
        })
        // window.location.href = "/"
        window.location.replace("/")
        
      } else {
        toast.error(res?.error , {
          duration : 3000 , 
          position : "top-center"
        })
      } 
    }

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
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
          Sign in to continue
        </p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit(handleLogin)} >

          {/* Email */}
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

          {/* Password */}
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

                        className="pr-12 bg-gray-50 dark:bg-[#020617]
                        border border-gray-200 dark:border-gray-700
                        focus:ring-2 focus:ring-emerald-500 transition"
                      />

                      {hasValue && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 
                          text-gray-400 hover:text-emerald-600 transition"
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      )}
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>

          <div className="text-right mt-2">
            <a
              href="/forgot-password"
              className="text-sm text-emerald-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full py-3 text-lg font-semibold
            bg-emerald-600 hover:bg-emerald-700
            transition-all duration-300"
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>

        </form>

        <div className="text-center mt-6 text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="text-emerald-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </div>

      </div>
    </div>
  )
  }


