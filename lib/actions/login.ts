// "use client"
// import { PrismaClient } from "@prisma/client";
// import { revalidatePath } from "next/cache";
// import { scrapeAmazonProduct } from "../scraper";
// import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
// import { UserE } from "@/types";
// import { generateEmailBody, sendEmail } from "../nodemailer";
// import * as z from "zod";
// import { LoginSchema } from '@/lib/models/schema';
// import { RegisterSchema } from '@/lib/models/schema';
// import bcrypt from 'bcryptjs';
// // import { signIn } from "@/auth";
// import { signIn } from 'next-auth/react';
// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { prisma } from "../prisma";

// export const login = async (values: z.infer<typeof LoginSchema>) => {
//   const validatedFields = LoginSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields" };
//   }

//   const { email, password } = validatedFields.data;

//   try {
//     // Check if the code is running on the client side
//     if (typeof window !== "undefined") {
//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false, // Handle the response manually
//       });

//       if (result?.error) {
//         // Handle specific error messages
//         if (result.error.includes("CredentialsSignin")) {
//           return { error: "Invalid credentials" };
//         }
//         return { error: "An error occurred during login: " + result.error };
//       }

//       // If no errors and result.status is 'success'
//       return { success: "Login successful" };
//     } else {
//       // Handle the case where the function is accidentally called server-side
//       return { error: "This function should only be called in a browser context." };
//     }

//   } catch (error) {
//     console.error("Login error:", error); // Log the error for debugging
//     return { error: "An unexpected error occurred" };
//   }
// };