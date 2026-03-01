import { z } from "zod"

export const checkoutSchema = z.object({
  details: z.string().min(10, "Address must be at least 10 characters"),
 phone: z.string().regex(/^01[0125][0-9]{8}$/,"Enter valid Egyptian phone number") , 
  city: z.string().min(2, "City is required"),
})

export type checkoutSchemaType = z.infer<typeof checkoutSchema>