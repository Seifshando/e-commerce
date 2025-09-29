// import * as z from "zod"


// export const registraionSchema = z.object(
// {   name: z.string().nonempty(),
//     email: z.email(),
//     password: z.string().nonempty(),
//     rePassword: z.string().nonempty(),
// }
// ).refine((object) => object.password === object.rePassword, {
// path: ["rePassword"],
// error: "password And rePassword not match. !"
// })

// export type registraionSchemaType = z.infer<typeof registraionSchema>
