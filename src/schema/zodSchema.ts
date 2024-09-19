import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(3, { message: "Password should be at least 3 characters" })
        .max(20, { message: "Password should be at most 20 characters" }),

});

export const registerSchema = z.object({
    first_name: z
        .string()
        .min(2, { message: "Username should be at least 2 characters" }),

    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(3, { message: "Password should be at least 3 characters" })
        .max(20, { message: "Password should be at most 20 characters" }),
});

export type Loginschemtype = z.infer<typeof loginSchema>;
export type Registerschemtype = z.infer<typeof registerSchema>;