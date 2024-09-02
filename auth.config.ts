import type { NextAuthOptions } from 'next-auth'; // Correct type import
// import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './lib/prisma'; // Import your Prisma client setup
import { LoginSchema } from './lib/models/schema';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';

// export default {
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);
//         if (validatedFields.success) {
//                     const { email, password } = validatedFields.data;
          
//                     // Find the user by email using Prisma
//                     const user = await prisma.user.findUnique({
//                       where: { email },
//                     });
          
//                     if (!user || !user.password) {
//                       return null;
//                     }
          
//                     // Compare the provided password with the hashed password
//                     const passwordsMatch = await bcrypt.compare(password, user.password);
//                     if (passwordsMatch) {
//                       return user; // Return the user object on successful authentication
//                     }
//                   }
//                   return null;
//                 }
//     })
//   ],
// }  satisfies NextAuthOptions




















const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        // Validate the provided credentials against your schema
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
        return null; // Return null if authentication fails
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Using JWT session strategy
  },
};

export default authConfig;