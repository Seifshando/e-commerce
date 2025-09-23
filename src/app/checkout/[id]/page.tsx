"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { checkOutSchema, checkOutSchemaType } from "@/schema/checkOutSchema";
import { onlinePayment } from "../../checkOutActions/checkOut.action";

export default function OnlineCheckout() {
  const { id } = useParams() as { id: string };

  const form = useForm<checkOutSchemaType>({
    defaultValues: { details: "", phone: "", city: "" },
    resolver: zodResolver(checkOutSchema),
  });

  async function handleCheckOut(values: checkOutSchemaType) {
      const response = await onlinePayment(id, "", values);

      if (response.status === "success" && response.session?.url) {
        window.location.href = response.session.url;
      } else {
        alert(response.message ?? "Checkout failed, please try again.");
      }
    
  }

  return (
    <div className="w-1/2 mx-auto my-12">
      <Form {...form}>
        <h1 className="text-center font-bold my-5 text-3xl">Checkout here</h1>
        <form onSubmit={form.handleSubmit(handleCheckOut)} className="space-y-4">
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="bg-emerald-400 p-2 rounded-lg my-3 text-white hover:bg-black hover:text-emerald-400 transition-all w-full"
          >
            Checkout
          </button>
        </form>
      </Form>
    </div>
  );
}
