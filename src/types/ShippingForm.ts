import {z} from "zod";

export const shippingFormSchema = z.object({
    name:z.string().min(1,"Name is Required"),
    email:z.email().min(1,"Email is Required"),
    phone: z.string()
        .min(10, "Phone must be at least 10 digits")
        .regex(/^\d+$/, "Phone should only contain numbers"),
    address:z.string().min(1,"Address is Required!"),
    pincode: z.string().min(6, 'pin must be 6 numbers').regex(/^\d+$/, "pin should only contain numbers"),
    city: z.string().min(1, "City is Required!"),
})


export type  ShippingFormInputs = z.infer<typeof shippingFormSchema>;
