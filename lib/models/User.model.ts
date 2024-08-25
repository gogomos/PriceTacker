// models/User.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  accounts?: string[]; // Stores Account IDs
  password?: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  name: { type: String, required: false },
  email: { type: String, unique: true, required: false },
  emailVerified: { type: Date, required: false },
  image: { type: String, required: false },
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  password: { type: String, required: false }
}, {
  collection: 'users' // Collection name in MongoDB
});

// Ensure the model is only created once
const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
