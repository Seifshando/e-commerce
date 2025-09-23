"use client"
import AddAddress from '@/api/addAddress.api'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { addAddress, addAddressType } from '@/schema/AddAddress.schema';
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function MyAddress() {
    const router = useRouter();

    
    // const [response, setresponse] = useState(0);
    
    const form = useForm<addAddressType>({
        defaultValues: {
            name : "",
            details : "",
            phone : "",
            city : "",
        },
        
        resolver: zodResolver(addAddress)
    });
    
    
async function handleMyAddress(values : addAddressType){
console.log(values);

const response = await AddAddress();
// setresponse(newResponse)
console.log(response);
toast.success("Your Address Added Successfuly✅", {position: "top-center", duration: 2000});
// if(response.length > ){
// } else{toast.error("Can't Add Your Address❌", {position: "top-center", duration: 2000});}
router.push("/");
}



return <>
<div className='w-1/2 mx-auto my-12'>

<Form {...form}>
<h1 className='text-center font-bold my-5 text-3xl'>Add Your Address Here</h1>
<form onSubmit={form.handleSubmit(handleMyAddress)}>

<FormField
control={form.control}
name="name"
render={({field}) => (
    <FormItem>
    <FormLabel>Name:</FormLabel>
    <FormControl>
        <Input type='text' {...field}/>
    </FormControl>
    <FormMessage />
    </FormItem>
)}
/>
<FormField
control={form.control}
name="details"
render={({field}) => (
    <FormItem>
    <FormLabel>details:</FormLabel>
    <FormControl>
        <Input type='text' {...field}/>
    </FormControl>
    <FormMessage />
    </FormItem>
)}
/>
<FormField
control={form.control}
name="phone"
render={({field}) => (
    <FormItem>
    <FormLabel>phone:</FormLabel>
    <FormControl>
        <Input type='tel' {...field}/>
    </FormControl>
    <FormMessage />
    </FormItem>
)}
/>
<FormField
control={form.control}
name="city"
render={({field}) => (
    <FormItem>
    <FormLabel>city:</FormLabel>
    <FormControl>
        <Input type='text' {...field}/>
    </FormControl>
    <FormMessage />
    </FormItem>
)}
/>
<button className='bg-emerald-400 p-2 rounded-lg my-3 text-white hover:bg-black hover:text-emerald-400 transition-all w-full'>Add Address</button>
</form>
</Form>
</div> 
</>
}
