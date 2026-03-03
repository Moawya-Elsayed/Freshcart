import z from "zod"

const passwordRegex =
/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),

  password: z.string().regex(
    passwordRegex,
    "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long"
  ),

  rePassword: z.string()
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"]
})
.refine((data) => data.password !== data.currentPassword, {
  message: "New password must be different from current password",
  path: ["password"]
})

export type ChangePasswordSchemaType =
  z.infer<typeof changePasswordSchema>