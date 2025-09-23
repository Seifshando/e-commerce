import { z } from "zod";

export const resetSchema = z.object({
resetCode: z.string().min(6, "Reset code is required"),
newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export type resetSchemaType = z.infer<typeof resetSchema>;
