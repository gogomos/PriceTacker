import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message:"Email is requierd"
    }),
    password: z.string().min(1, {
        message: "Password is requierd"
    }),
});


export const RegisterSchema = z.object({
    email: z.string().email({
        message:"Email is requierd"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters require"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
});
