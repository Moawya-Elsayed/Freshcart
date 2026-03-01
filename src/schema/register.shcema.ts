import z from  "zod" ;

export const registerSchema = z.object({
      name: z.string().min(3 , "Name must be at least 3 characters").max(20 , "Name must be less than 20 characters"),
      email: z.email("Invalid Email Address"),
      password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long"),
      rePassword: z.string(),
      phone: z.string().regex(/^01[0125][0-9]{8}$/,"Enter valid Egyptian phone number")

}).refine( (object)=> {
      return object.password === object.rePassword
    }   , {
      error: "Passwords do not match" ,
      path: ["rePassword"]
    } );


    export type registerSchemaType = z.infer <typeof registerSchema>