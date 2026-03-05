        "use client"

        import { updateUserAction } from "@/actions/updateUser.action"
        import {
          updateUserSchema,
          UpdateUserSchemaType
        } from "@/schema/updateUser.schema"

        import { zodResolver } from "@hookform/resolvers/zod"
        import { Controller, useForm } from "react-hook-form"
        import { useSession } from "next-auth/react"
        import { toast } from "sonner"
        import { useEffect } from "react"

        import {
          Field,
          FieldError,
          FieldGroup,
          FieldLabel
        } from "@/components/ui/field"
        import { Input } from "@/components/ui/input"
        import { User } from "lucide-react"

        export default function ProfilePage() {

        const { data: session, update } = useSession()

          const form = useForm<UpdateUserSchemaType>({
            resolver: zodResolver(updateUserSchema),
            mode: "onTouched",
            defaultValues: {
              name: "",
              email: "",
              phone: ""
            }
          })

          useEffect(() => {
            if (session?.user) {
              form.reset({
                name: session.user.name ?? "",
                email: session.user.email ?? "",
                phone: session.user?.phone ?? ""
              })
            }
          }, [session, form])

          async function handleUpdate(
            values: UpdateUserSchemaType
          ) {
            try {

              await updateUserAction(values)
              
              await update({
                user: {
                  ...session?.user,
                  ...values
                }
              })
              
              form.reset(values)

              toast.success("Profile updated successfully", {
                duration: 3000,
                position: "top-center"
              })
              
              
            } catch (err) {
              
              const message =
                err instanceof Error ? err.message : "Something went wrong"

              toast.error(message, {
                duration: 3000,
                position: "top-center"
              })
            }
          }

          return (
            <div className="container mx-auto max-w-3xl p-6">

              <div className="flex items-center gap-3 mb-8">
                <User className="text-emerald-600" size={32} />
                <h1 className="text-3xl font-bold text-emerald-600">
                  Edit Profile
                </h1>
              </div>

              <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl shadow-lg border dark:border-gray-800">

                <form
                  onSubmit={form.handleSubmit(handleUpdate)}
                  className="space-y-6"
                >

                  <FieldGroup>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Name</FieldLabel>
                          <Input {...field} />
                          {fieldState.invalid &&
                            <FieldError errors={[fieldState.error]} />
                          }
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Email</FieldLabel>
                          <Input {...field} type="email" />
                          {fieldState.invalid &&
                            <FieldError errors={[fieldState.error]} />
                          }
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <FieldGroup>
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Phone</FieldLabel>
                          <Input {...field} type="tel" />
                          {fieldState.invalid &&
                            <FieldError errors={[fieldState.error]} />
                          }
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* <button
                    type="submit"
                    disabled={!form.formState.isDirty || form.formState.isSubmitting}
                    className="w-full bg-emerald-600 text-white p-3 rounded-lg
                    hover:bg-emerald-700 transition disabled:opacity-50 font-semibold"
                  >
                    {form.formState.isSubmitting
                      ? "Updating..."
                      : "Update Profile"}
                  </button> */}

                  <button
                      type="submit"
                      disabled={!form.formState.isDirty || form.formState.isSubmitting}
                      className="
                        w-full p-3 rounded-lg font-semibold transition
                        bg-emerald-600 text-white
                        hover:bg-emerald-700
                        disabled:bg-gray-400
                        disabled:hover:bg-gray-400
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                      "
                    >
                      {form.formState.isSubmitting
                        ? "Updating..."
                        : "Update Profile"}
                    </button>

                    {form.formState.submitCount > 0 && !form.formState.isDirty && (
                        <p className="text-sm text-gray-500 text-center">
                          No changes detected
                        </p>
                      )}

                </form>
              </div>
            </div>
          )
        }