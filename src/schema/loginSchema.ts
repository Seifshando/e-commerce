import * as z from 'zod';

export const loginSchema = z.object({

    email: z.email()
    .nonempty("this field can't be empty"),
    password: z.string()
    .nonempty("this field can't be empty")
    .min(6, 'must be 6 characters at least')
    .max(10, 'max characters is 10 characters'),
})


export type loginSchemaType = z.infer< typeof loginSchema>