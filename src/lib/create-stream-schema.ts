import { z } from "zod";

export const recipientSchema = z.object({
  recipientAddress: z
    .string()
    .min(1, "Recipient address is required")
    .regex(/^SP[A-Z0-9]{38,40}$/, "Must be a valid Stacks address (SP...)"),
});

export const amountSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Enter a valid amount" })
    .positive("Amount must be greater than 0")
    .max(21000000, "Amount exceeds maximum"),
});

export const durationSchema = z.object({
  durationDays: z
    .number({ invalid_type_error: "Enter a valid duration" })
    .int("Duration must be a whole number")
    .min(1, "Minimum 1 day")
    .max(365, "Maximum 365 days"),
});

export const createStreamSchema = recipientSchema.merge(amountSchema).merge(durationSchema);

export type RecipientFormValues = z.infer<typeof recipientSchema>;
export type AmountFormValues = z.infer<typeof amountSchema>;
export type DurationFormValues = z.infer<typeof durationSchema>;
export type CreateStreamFormValues = z.infer<typeof createStreamSchema>;
