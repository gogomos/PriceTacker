// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import UserModel from './lib/models/User.model'; // Ensure UserModel is correctly imported
import { LoginSchema } from './lib/models/schema';
import bcrypt from 'bcryptjs';

// Define the Credentials provider configuration
const credentialsProvider = Credentials({
  name: 'Credentials',
  credentials: {
    email: { label: 'Email', type: 'text' },
    password: { label: 'Password', type: 'password' }
  },
  async authorize(credentials) {
    // Validate the provided credentials against your schema
    const validatedFields = LoginSchema.safeParse(credentials);
    if (validatedFields.success) {
      const { email, password } = validatedFields.data;
      // Find the user by email
      const user = await UserModel.findOne({ email }).exec();
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
  }
});

const authConfig: NextAuthConfig = {
  providers: [credentialsProvider],
  session: { strategy: 'jwt' },
};

export default authConfig;
