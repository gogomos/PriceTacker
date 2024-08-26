import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { connectToDB } from './lib/mongoose'; // Import your Mongoose connection

const initializeAuth = async () => {
  await connectToDB(); // Ensure the DB connection before using models

  return NextAuth({
    session: { strategy: "jwt" },
    ...authConfig,
  });
};

// Create a function to handle the asynchronous initialization
const setupAuth = async () => {
  const { handlers: { GET, POST }, auth, signIn, signOut } = await initializeAuth();

  return { GET, POST, auth, signIn, signOut };
};

// Export the handlers after setup
export const { GET, POST, auth, signIn, signOut } = await setupAuth();
