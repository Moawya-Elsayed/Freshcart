import z from "zod"

const passwordRegex =
/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const passwordFieldsSchema = z.object({
  password: z.string().regex(
    passwordRegex,
    "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long"
  ),

  rePassword: z.string()
})
.refine(data => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"]
})

export type PasswordFieldsSchemaType =
  z.infer<typeof passwordFieldsSchema>