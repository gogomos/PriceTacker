import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "./prisma"; // Adjust the path to your Prisma instance

export const MyAdapter = {
  ...PrismaAdapter(prisma),
  async getUserByAccount({ provider, providerAccountId }) {
    const account = await prisma.account.findFirst({
      where: {
        provider,
        providerAccountId,
      },
      include: {
        user: true,
      },
    });
    return account?.user ?? null;
  },
};
