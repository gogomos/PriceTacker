import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './lib/prisma';
import authConfig from './auth.config';
import { UserRole } from '@prisma/client';


export const { handlers:{GET, POST}, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session ({token , session}) {
      console.log({
        sessionToken:token,
      })
      if(token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt ({ token }) {
      if (!token.sub) return token;
      const id = token.sub;
      const existingUser = await prisma.user.findUnique({ where : {id}})
      if (!existingUser) return token;
      token.role = existingUser.role;
      // console.log({token})
      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
