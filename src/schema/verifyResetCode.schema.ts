import { z } from "zod";

export const resetSchema = z.object({
resetCode: z.string().min(6, "Reset code is required"),
});

export type resetSchemaType = z.infer<typeof resetSchema>;
