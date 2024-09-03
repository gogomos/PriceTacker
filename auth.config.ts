import type { NextAuthConfig } from 'next-auth'; // Correct type import
// import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './lib/prisma'; // Import your Prisma client setup
import { LoginSchema } from './lib/models/schema';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google"

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
          
                    // Find the user by email using Prisma
                    const user = await prisma.user.findUnique({
                      where: { email },
                    });
          
                    if (!user || !user.password) {
                      return null;
                    }
          
                    // Compare the provided password with the hashed password
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                      return user; // Return the user object on successful authentication
                    }
                  }
                  return null;
                }
    })
  ],
}  satisfies NextAuthConfig