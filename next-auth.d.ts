import NextAuth ,{type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: "NORMAL" | "PREIMIEM"
};

declare module "@auth/core" {
    interface Session {
        user: ExtendedUser;
    } 
}