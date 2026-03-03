        "use client"

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
        import { useRouter, useSearchParams } from "next/navigation"
        import { Lock } from "lucide-react"
        import { resetPassword } from "@/api/resetPassword"
        import { resetPasswordSchema, ResetPasswordSchemaType } from "@/schema/resetPassword.schema"

        export default function ResetPasswordPage() {

        const router = useRouter()
        const searchParams = useSearchParams()

        const email = searchParams.get("email")

        const form = useForm<ResetPasswordSchemaType>({
            defaultValues: {
            password: "",
            rePassword: ""
            },
            resolver: zodResolver(resetPasswordSchema

            ),
            mode: "onTouched"
        })

        const [showPassword, setShowPassword] = useState(false)
        const [showConfirm, setShowConfirm] = useState(false)

        async function onSubmit(values: ResetPasswordSchemaType) {

            try {

            if (!email) {
                toast.error("Email not found", {
                duration:2000 ,
                position:"top-center"
            })
                router.replace("/login")
                return
            }

            await resetPassword({
                email,
                newPassword: values.password
            })

            toast.success("Password reset successfully" , {
                duration:2000 ,
                position:"top-center"
            })

            router.replace("/login")

            } catch (err) {

            const msg =
                err instanceof Error
                ? err.message
                : "Something went wrong"

            toast.error(msg, {
                duration:2000 ,
                position:"top-center"
            })
            }
        }

        return (
        <div className="min-h-screen w-full flex items-center justify-center
        bg-gray-100 dark:bg-[#020617]
        text-gray-800 dark:text-gray-200 p-4">

        <div className="w-full sm:w-[90%] md:w-[60%] lg:w-[40%]
        bg-white dark:bg-[#0f172a]
        border dark:border-gray-800
        p-6 sm:p-8 rounded-2xl shadow-xl">

            <div className="flex items-center gap-3 mb-8">
            <Lock size={24} className="text-emerald-600" />
            <h1 className="text-3xl font-bold text-emerald-600">
                Reset Password
            </h1>
            </div>

            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            >

            {/* Password */}
            <FieldGroup>
                <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field>

                    <FieldLabel>New Password</FieldLabel>

                    <div className="relative">
                        <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pr-12 bg-gray-50 dark:bg-[#020617]
                        border border-gray-200 dark:border-gray-700
                        focus:ring-2 focus:ring-emerald-500 transition"
                        />

                        {field.value && (
                        <button
                            type="button"
                            onClick={() =>
                            setShowPassword(!showPassword)
                            }
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
                )}
                />
            </FieldGroup>

            {/* Confirm */}
            <FieldGroup>
                <Controller
                name="rePassword"
                control={form.control}
                render={({ field, fieldState }) => (

                <Field>

                    <FieldLabel>Confirm Password</FieldLabel>

                    <div className="relative">

                    <Input
                        {...field}
                        type={showConfirm ? "text" : "password"}
                        className="bg-gray-50 dark:bg-[#020617]
                        border border-gray-200 dark:border-gray-700
                        focus:ring-2 focus:ring-emerald-500 transition pr-12"
                    />

                    {field.value && (
                        <button
                        type="button"
                        onClick={() =>
                            setShowConfirm(!showConfirm)
                        }
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
                className="w-full bg-emerald-700 hover:bg-emerald-800
                text-white p-3 rounded-lg font-semibold
                transition disabled:opacity-50"
            >
                {form.formState.isSubmitting
                ? "Processing..."
                : "Reset Password"}
            </button>

            </form>
        </div>
        </div>
        )
        }