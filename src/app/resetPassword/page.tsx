"use client";

import ResetPass from "@/api/resetPassword.api";
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
import { resetPasswordSchema, resetPasswordSchemaType } from "@/schema/resetPassword.schema";

export default function ResetPassword() {
const form = useForm<resetPasswordSchemaType>({
resolver: zodResolver(resetPasswordSchema),
defaultValues: {
    email: "",
    newPassword: "",
},
});

async function onSubmit(values: resetPasswordSchemaType) {
try {
    const res = await ResetPass(values.email, values.newPassword);
    toast.success(res.message || "Password reset successfully!", {
    position: "top-center",
    duration: 2000,
    });
    form.reset();
    window.location.href = "/login"
} catch (error: unknown) {
    if(error instanceof Error){
        toast.error(error.message, {
            position: "top-center",
            duration: 2000,
        });
    }
}
}

return (
<div className="w-[400px] mx-auto my-10">
    <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Your Email:</FormLabel>
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

        <Button type="submit" className="w-full bg-blue-600">
        Reset Password
        </Button>
    </form>
    </Form>
</div>
);
}
