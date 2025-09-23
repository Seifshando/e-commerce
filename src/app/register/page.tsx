"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema, registerSchemaType } from "@/schema/RegisterSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function Register() {
  const router = useRouter()

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  })

  async function handleRegister(values: registerSchemaType) {
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)

      if (res.data.message === "success") {
        toast.success("Sign up successfully ✅", { position: "top-center", duration: 3000 })
        router.push("/login")
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Something went wrong ❌", {
          position: "top-center",
          duration: 3000,
        })
      }
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto my-12">
      <Form {...form}>
        <h1 className="text-center font-bold my-5 text-3xl">Register To Join Our Community</h1>
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Your Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input type="email" {...field} placeholder="example@mail.com" />
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
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="••••••••" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password:</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="Repeat password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone:</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} placeholder="0123456789" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="bg-emerald-500 p-2 rounded-lg my-3 text-white hover:bg-black hover:text-emerald-400 transition-all w-full"
          >
            Register Now
          </button>
        </form>
      </Form>
    </div>
  )
}
