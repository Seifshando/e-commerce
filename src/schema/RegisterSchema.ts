import * as z from 'zod';

export const registerSchema = z.object({
    name: z.string()
    .nonempty("this field can't be empty")
    .min(2, 'must be 2 characters at least')
    .max(10, 'max characters is 10 characters'),
    email: z.email()
    .nonempty("this field can't be empty"),
    password: z.string()
    .nonempty("this field can't be empty")
    .min(6, 'must be 6 characters at least')
    .max(10, 'max characters is 10 characters'),
    rePassword: z.string()
    .nonempty("this field can't be empty")
    .min(6, 'must be 6 characters at least')
    .max(10, 'max characters is 10 characters'),
    phone: z.string()
    .nonempty("this field can't be empty")
    .regex(/^01[1250][0-9]{8}$/),
})
.refine((object) => object.password === object.rePassword , {
    path: ['rePassword'],
    error: 'password & rePassword not match',
})


export type registerSchemaType = z.infer< typeof registerSchema>