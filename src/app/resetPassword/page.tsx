"use client";

import ResetPass from "@/api/resetPassword.api";
import { resetSchema, resetSchemaType } from "@/schema/verifyResetCode.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";

export default function ResetPassword() {
const form = useForm<resetSchemaType>({
resolver: zodResolver(resetSchema),
defaultValues: {
    resetCode: "",
    newPassword: "",
},
});

async function onSubmit(values: resetSchemaType) {
try {
    const res = await ResetPass(values.resetCode, values.newPassword);
    toast.success(res.message || "Password reset successfully!", {
    position: "top-center",
    duration: 2000,
    });
    form.reset();
} catch (error: any) {
    toast.error(error.message, {
    position: "top-center",
    duration: 2000,
    });
}
}

return (
<div className="w-[400px] mx-auto my-10">
    <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
        control={form.control}
        name="resetCode"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Reset Code</FormLabel>
            <FormControl>
                <Input placeholder="Enter the code you received" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />

        <FormField
        control={form.control}
        name="newPassword"
        render={({ field }) => (
            <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
                <Input
                type="password"
                placeholder="Enter new password"
                {...field}
                />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />

        <Button type="submit" className="w-full">
        Reset Password
        </Button>
    </form>
    </Form>
</div>
);
}
