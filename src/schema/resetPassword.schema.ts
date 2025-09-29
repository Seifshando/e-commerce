import { z } from "zod";

export const resetPasswordSchema = z.object({
email: z.string().min(6, "Reset code is required"),
newPassword: z.string().min(6, "Reset code is required"),
});

export type resetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
