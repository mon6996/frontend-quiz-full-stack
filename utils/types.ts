import * as z from "zod";

const donationSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, { message: "Missing firstname" }),
  lastName: z.string().min(1, { message: "Missing lastname" }),
  email: z.string().email({ message: "Invalid email" }),
  amount: z
    .number()
    .refine((s) => z.coerce.number().safeParse(s).success, {
      message: "Invalid amount",
    })
    .refine((e) => e > 1000, {
      message: "amount must more than 1000",
    }),
  time: z.string(),
});

// Array of donation
export const donationsSchema = z.array(donationSchema);

// Type
export type Donation = z.infer<typeof donationSchema>;

// Form validation
export const formSchema = donationSchema
  .omit({ id: true, time: true })
  .extend({
    amount: z.string().refine((e) => parseInt(e) > 1000, {
      message: "amount must more than 1000",
    }),
  });

export type Form = z.infer<typeof formSchema>;
