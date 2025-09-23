"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ForgotPass from "@/api/forgotPass.api"
import VerifyResetCode from "@/api/verifyResetCode.api"
import ResetPassword from "@/api/resetPassword.api"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'   // ✅ import once

// Schemas
const emailSchema = z.object({
email: z.string().email("Enter a valid email"),
})
const codeSchema = z.object({
resetCode: z.string().min(4, "Enter the 4-digit code"),
})
const resetSchema = z.object({
newPassword: z.string().min(6, "Password must be at least 6 characters"),
})

export default function ForgotPasswordFlow() {
const router = useRouter()   
const [step, setStep] = useState(1)
const [email, setEmail] = useState("")

// Forms
const emailForm = useForm({
resolver: zodResolver(emailSchema),
defaultValues: { email: "" },
})
const codeForm = useForm({
resolver: zodResolver(codeSchema),
defaultValues: { resetCode: "" },
})
const resetForm = useForm({
resolver: zodResolver(resetSchema),
defaultValues: { newPassword: "" },
})

// Handlers
async function handleEmail(values: z.infer<typeof emailSchema>) {
try {
await ForgotPass(values.email)
setEmail(values.email)
toast.success("Reset code sent to your email", { position: "top-center", duration: 2000 })
setStep(2)
} catch (error: any) {
toast.error(error.message || "Error sending reset email", { position: "top-center", duration: 2000 })
}
}

async function handleCode(values: z.infer<typeof codeSchema>) {
try {
const response = await VerifyResetCode(values.resetCode)
console.log(response)
toast.success("Code verified successfully", { position: "top-center", duration: 2000 })
setStep(3)
} catch (error: any) {
toast.error(error.message || "Invalid reset code", { position: "top-center", duration: 2000 })
}
}

async function handleReset(values: z.infer<typeof resetSchema>) {
try {
    await ResetPassword(email, values.newPassword)
    // if (response.status === "success") {
    toast.success("Password reset successfully 🎉", { position: "top-center", duration: 2000 })

    //  التنقل من غير reload
    setTimeout(() => {
        router.push("/login")
    }, 1500)

    // reset forms
    // setStep(1)
    emailForm.reset()
    codeForm.reset()
    resetForm.reset()
    // }
} catch (error: any) {
    toast.error(error.message || "Error resetting password", { position: "top-center", duration: 2000 })
}
}


return (
<div className="w-[400px] mx-auto mt-10 p-6 border rounded-2xl shadow-lg">
<h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>

{step === 1 && (
<Form {...emailForm}>
<form onSubmit={emailForm.handleSubmit(handleEmail)}>
<FormField
    control={emailForm.control}
    name="email"
    render={({ field }) => (
    <FormItem>
        <FormLabel>Email:</FormLabel>
        <FormControl>
        <Input type="email" placeholder="Enter your email" {...field} />
        </FormControl>
        <FormMessage />
    </FormItem>
    )}
/>
<Button type="submit" className="w-full mt-4">Send Code</Button>
</form>
</Form>
)}

{step === 2 && (
<Form {...codeForm}>
<form onSubmit={codeForm.handleSubmit(handleCode)}>
<FormField
    control={codeForm.control}
    name="resetCode"
    render={({ field }) => (
    <FormItem>
        <FormLabel>Reset Code:</FormLabel>
        <FormControl>
        <Input type="text" placeholder="Enter reset code" {...field} />
        </FormControl>
        <FormMessage />
    </FormItem>
    )}
/>
<Button type="submit" className="w-full mt-4">Verify Code</Button>
</form>
</Form>
)}

{step === 3 && (
<Form {...resetForm}>
<form onSubmit={resetForm.handleSubmit(handleReset)}>
<FormField
    control={resetForm.control}
    name="newPassword"
    render={({ field }) => (
    <FormItem>
        <FormLabel>New Password:</FormLabel>
        <FormControl>
        <Input type="password" placeholder="Enter new password" {...field} />
        </FormControl>
        <FormMessage />
    </FormItem>
    )}
/>
<Button type="submit" className="w-full mt-4">Reset Password</Button>
</form>
</Form>
)}
</div>
)
}
