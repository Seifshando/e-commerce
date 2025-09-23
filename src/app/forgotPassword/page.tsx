"use client";

import ForgotPass from "@/api/forgotPass.api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotSchema, forgotSchemaType } from "@/schema/forgot.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // ✅

export default function ForgotPassword() {
const router = useRouter(); // ✅
const form = useForm<forgotSchemaType>({
resolver: zodResolver(forgotSchema),
defaultValues: {
    email: "",
},
});

async function onSubmit(values: forgotSchemaType) {
try {
    const res = await ForgotPass(values.email); // ✅ مرر string بس
    toast.success(res.message || "Check your email for reset code!", {
    position: "top-center",
    duration: 2000,
    });
    form.reset();

    // ✅ بعد النجاح روح على صفحة resetPassword
    router.push("/resetPassword");
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
    <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>

    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />

        <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600"
        >
        Reset Password
        </button>
    </form>
    </Form>
</div>
);
}
