"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { UserE } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";
import * as z from "zod";
import { LoginSchema } from '@/lib/models/schema';
import { RegisterSchema } from '@/lib/models/schema';
import bcrypt from 'bcryptjs';
// import { signIn } from "@/auth";
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { prisma } from "../prisma";
// const prisma = new PrismaClient();

// import { AuthError }  from "next-auth";
export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    const existingProduct = await prisma.product.findUnique({
      where: { url: scrapedProduct.url },
      include: { priceHistory: true },
    });

    const currentDate = new Date(); // Generate the current date

    if (existingProduct) {
      // Update existing product with new prices and history
      const updatedProduct = await prisma.product.update({
        where: { url: scrapedProduct.url },
        data: {
          currentPrice: scrapedProduct.currentPrice,
          lowestPrice: getLowestPrice([
            ...existingProduct.priceHistory,
            { price: scrapedProduct.currentPrice },
          ]),
          highestPrice: getHighestPrice([
            ...existingProduct.priceHistory,
            { price: scrapedProduct.currentPrice },
          ]),
          averagePrice: getAveragePrice([
            ...existingProduct.priceHistory,
            { price: scrapedProduct.currentPrice },
          ]),
          priceHistory: {
            create: {
              price: scrapedProduct.currentPrice,
              date: currentDate, // Provide the date here
            },
          },
          updatedAt: currentDate, // Update the updatedAt field as well
        },
      });

      revalidatePath(`/products/${updatedProduct.id}`);
    } else {
      // Create a new product with the scraped data
      const newProduct = await prisma.product.create({
        data: {
          ...scrapedProduct,
          date: currentDate, // Provide the date field for the Product model
          priceHistory: {
            create: {
              price: scrapedProduct.currentPrice,
              date: currentDate, // Provide the date here
            },
          },
          lowestPrice: scrapedProduct.currentPrice,
          highestPrice: scrapedProduct.currentPrice,
          averagePrice: scrapedProduct.currentPrice,
          createdAt: currentDate, // Set the creation date
          updatedAt: currentDate, // Set the updatedAt field
        },
      });

      revalidatePath(`/products/${newProduct.id}`);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}


export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.log(error);
  }
}


export async function getSimilarProducts(productId: string) {
  try {
    const currentProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!currentProduct) return null;

    const similarProducts = await prisma.product.findMany({
      where: { id: { not: productId } },
      take: 3,
    });

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}


export async function addUserEmailToProduct(productId: string, userEmail: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { users: true },
    });

    if (!product) return;

    const userExists = product.users.some((user: UserE) => user.email === userEmail);

    if (!userExists) {
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          users: {
            create: { email: userEmail },
          },
        },
      });

      const emailContent = await generateEmailBody(updatedProduct, "WELCOME");
      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}


export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    // Check if the code is running on the client side
    if (typeof window !== "undefined") {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Handle the response manually
      });

      if (result?.error) {
        // Handle specific error messages
        if (result.error.includes("CredentialsSignin")) {
          return { error: "Invalid credentials" };
        }
        return { error: "An error occurred during login: " + result.error };
      }

      // If no errors and result.status is 'success'
      return { success: "Login successful" };
    } else {
      // Handle the case where the function is accidentally called server-side
      return { error: "This function should only be called in a browser context." };
    }

  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    return { error: "An unexpected error occurred" };
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(process.env.MONGODB_URI)
  console.log("Received values:", values);
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("Invalid fields:", validatedFields.error);
    return { error: "Invalid fields" };
  }

  const { email, password, name } = values;

  try {
    console.log("Checking for existing user...");
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return { error: "User already exists" };
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log("Creating new user...");
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("User created:", newUser);
    return { success: "Registration successful" };

  } catch (error) {
    console.error("Error during registration:", error);
    return { error: "An error occurred during registration" };
  }
};

