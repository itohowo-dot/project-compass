import { z } from "zod";

export const recipientSchema = z.object({
  recipientAddress: z
    .string()
    .min(1, "Recipient address is required")
    .regex(/^SP[A-Z0-9]{38,40}$/, "Enter a valid Stacks address starting with SP, or use a .btc name"),
});

export const amountSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Enter an amount between 0 and 21,000,000 sBTC")
    .max(21000000, "Enter an amount between 0 and 21,000,000 sBTC"),
});

export const durationSchema = z.object({
  durationDays: z
    .number({ invalid_type_error: "Enter a valid duration" })
    .int("Duration must be a whole number")
    .min(1, "Choose a duration between 1 and 365 days")
    .max(365, "Choose a duration between 1 and 365 days"),
});

export const createStreamSchema = recipientSchema.merge(amountSchema).merge(durationSchema);

export type RecipientFormValues = z.infer<typeof recipientSchema>;
export type AmountFormValues = z.infer<typeof amountSchema>;
export type DurationFormValues = z.infer<typeof durationSchema>;
export type CreateStreamFormValues = z.infer<typeof createStreamSchema>;
