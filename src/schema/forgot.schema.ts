import * as z from 'zod';

export const forgotSchema = z.object({

    email: z.string()
    .nonempty("this field can't be empty"),
})


export type forgotSchemaType = z.infer< typeof forgotSchema>