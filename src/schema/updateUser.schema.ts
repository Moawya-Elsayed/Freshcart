import z from "zod"

export const updateUserSchema = z.object({

  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(40, "Name must be less than 20 characters"),

  email: z.email("Invalid Email Address"),

  phone: z.string().regex(/^01[0125][0-9]{8}$/,"Enter valid Egyptian phone number")
})

export type UpdateUserSchemaType =
  z.infer<typeof updateUserSchema>