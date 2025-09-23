import * as z from 'zod';

export const addAddress = z.object({

    name: z.string()
    .nonempty("this field can't be empty")
    .min(2, 'must be 2 characters at least')
    .max(20, 'max characters is 20 characters'),
    details: z.string()
    .nonempty("this field can't be empty"),
    phone: z.string()
    .nonempty("this field can't be empty").regex(/^01[0125][0-9]{8}$/),
    city: z.string()
    .nonempty("this field can't be empty")
    .min(2, 'must be 2 characters at least')
    .max(20, 'max characters is 20 characters'),
})


export type addAddressType = z.infer< typeof addAddress>