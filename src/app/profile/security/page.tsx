"use client"

import { changePasswordAction } from "@/actions/changePassword.action"
import {
  changePasswordSchema,
  ChangePasswordSchemaType
} from "@/schema/changePassword.schema"

import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Shield, Lock, User } from "lucide-react"
import { signOut } from "next-auth/react" 

export default function SecurityPage() {

  const { data: session } = useSession()

  const form = useForm<ChangePasswordSchemaType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: ""
    },
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched"
  })

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  async function handleChangePassword(
    values: ChangePasswordSchemaType
  ) {
    try {

      await changePasswordAction(values)

      toast.success("Password changed successfully. Please login again.", {
        duration: 2000,
        position: "top-center"
      })

      setTimeout(() => {
        signOut({ callbackUrl: "/login" })
      }, 2000)

    } catch (err: unknown) {

      if (err instanceof Error) {

              if (err.message.toLowerCase().includes("incorrect")) {

          form.setError("currentPassword", {
            message: "Current password is incorrect"
          })

          toast.error("Your current password is incorrect", {
            duration: 3000,
            position: "top-center"
          })

        } else {
          toast.error(err.message, {
            duration: 3000,
            position: "top-center"
          })
        }

      } else {
        toast.error("Something went wrong", {
          duration: 3000,
          position: "top-center"
        })
      }
    }
  }

  return (
    <div className="container mx-auto max-w-3xl mt-24 p-6">

      {/* ===== Title ===== */}
      <div className="flex items-center gap-3 mb-8">
        <Shield className="text-emerald-600" size={32} />
        <h1 className="text-3xl font-bold text-emerald-600">
          Security Settings
        </h1>
      </div>

      {/* ===== Account Info ===== */}
      <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-lg mb-8 border dark:border-gray-800">
        <div className="flex items-center gap-2 mb-3">
          <User size={20} className="text-emerald-600" />
          <h2 className="text-xl font-semibold">
            Account Info
          </h2>
        </div>

        <p className="text-gray-500">
          {session?.user?.email}
        </p>
      </div>

      {/* ===== Change Password ===== */}
      <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-lg border dark:border-gray-800">

        <div className="flex items-center gap-2 mb-6">
          <Lock size={20} className="text-emerald-600" />
          <h2 className="text-xl font-semibold">
            Change Password
          </h2>
        </div>

        <form
          onSubmit={form.handleSubmit(handleChangePassword)}
          className="space-y-6"
        >

          {/* Current Password */}
          <FieldGroup>
            <Controller
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="relative">
                  <FieldLabel>Current Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type={showCurrent ? "text" : "password"}
                      className="pr-12 dark:bg-[#020617]"
                    />

                    {field.value && (
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-400 hover:text-emerald-600 transition"
                      >
                        {showCurrent
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
              )}
            />
          </FieldGroup>

          {/* New Password */}
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="relative">
                  <FieldLabel>New Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type={showNew ? "text" : "password"}
                      className="pr-12 dark:bg-[#020617]"
                    />

                    {field.value && (
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-400 hover:text-emerald-600 transition"
                      >
                        {showNew
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
              )}
            />
          </FieldGroup>

          {/* Confirm Password */}
          <FieldGroup>
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="relative">
                  <FieldLabel>Confirm Password</FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirm ? "text" : "password"}
                      className="pr-12 dark:bg-[#020617]"
                    />

                    {field.value && (
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2
                        text-gray-400 hover:text-emerald-600 transition"
                      >
                        {showConfirm
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
              )}
            />
          </FieldGroup>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-emerald-600 text-white p-3 rounded-lg
            hover:bg-emerald-700 transition disabled:opacity-50 font-semibold"
          >
            {form.formState.isSubmitting
              ? "Processing..."
              : "Change Password"}
          </button>

        </form>
      </div>
    </div>
  )
}