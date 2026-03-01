import z from  "zod" ;

export const loginSchema = z.object({
      email: z.email("Invalid Email Address"),
      password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long"),

})


    export type loginSchemaType = z.infer <typeof loginSchema>