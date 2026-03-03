import { z } from "zod"
import { passwordFieldsSchema } from "./passwordFields.schema"

export const resetPasswordSchema = passwordFieldsSchema

export type ResetPasswordSchemaType =
 z.infer<typeof resetPasswordSchema>