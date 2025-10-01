"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { checkOutSchema, checkOutSchemaType } from "@/schema/checkOutSchema";
import { CashOrederApi } from "@/api/cashOreder.api";
import { toast } from "sonner";

export default function CashOrder() {
const { id } = useParams() as { id: string };

const form = useForm({
defaultValues: { details: "", phone: "", city: "" },
resolver: zodResolver(checkOutSchema),
});

async function handleCheckOut(values: checkOutSchemaType) {
const response = await CashOrederApi(id, values);

console.log(response);
if (response.status === "success") {
toast.success("Cashed Your Order Successfuly", {
position: "top-center",
duration: 2000,
});

// reset للـ values بدل التعديل على response
form.reset({
details: "",
phone: "",
city: "",
});

window.location.href = "/allorders";
}
else {
toast.error(response.message || "Cash Order failed, please try again.");
}




}

return (
<div className="w-1/2 mx-auto my-12">
<Form {...form}>
<h1 className="text-center font-bold my-5 text-3xl">Cash Order here</h1>
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
    Cash Order
    </button>
</form>
</Form>
</div>
);
}
