// models/Account.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

const AccountSchema: Schema = new Schema({
  id: { type: String, default: () => new mongoose.Types.ObjectId().toString(), unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: { type: String, required: false },
  access_token: { type: String, required: false },
  expires_at: { type: Number, required: false },
  token_type: { type: String, required: false },
  scope: { type: String, required: false },
  id_token: { type: String, required: false },
  session_state: { type: String, required: false }
}, {
  collection: 'accounts' // Collection name in MongoDB
});

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true }); // Unique index

export const Account = mongoose.model<IAccount>('Account', AccountSchema);
