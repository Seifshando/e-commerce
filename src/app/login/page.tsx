"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
email: z.string().email("Invalid email"),
password: z.string().min(6, "Password must be at least 6 characters"),
});
type loginSchemaType = z.infer<typeof loginSchema>;

export default function LoginPage() {
const router = useRouter();
const [errorMsg, setErrorMsg] = useState("");

const form = useForm<loginSchemaType>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

async function onSubmit(values: loginSchemaType) {
try {
  setErrorMsg("");

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values), // هنا email و password
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  router.push("/"); // تحويل للصفحة الرئيسية بعد النجاح
} catch (error: unknown) {
  if(error instanceof Error){
    console.error("❌ Login error:", error);
    setErrorMsg(error.message);
  }
}
}


return (
  <div className="w-[400px] mx-auto my-10">
    <h1 className="text-2xl font-bold mb-6">Login</h1>

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>

        <div className="text-center mt-4">
          <Link href="/forgotPassword" className="text-blue-500 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </form>
    </Form>
  </div>
);
}
