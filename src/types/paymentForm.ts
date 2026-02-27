import { z } from "zod";

export const paymentFormSchema = z.object({
    cardHolderName: z.string().min(1, "Name on card is required"),
    cardNumber: z.string()
        .min(16, "Card number must be 16 digits")
        .max(19, "Card number is too long")
        .regex(/^\d+$/, "Must be numbers only"),
    expiryDate: z.string()
        .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Use MM/YY format"),
    cvv: z.string()
        .min(3, "CVV must be 3 digits")
        .max(4, "CVV is too long")
        .regex(/^\d+$/, "Must be numbers"),
});

export type PaymentFormType = z.infer<typeof paymentFormSchema>;