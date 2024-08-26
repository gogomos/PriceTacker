import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the structure of a User document
export interface IUser extends Document {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  accounts?: mongoose.Types.ObjectId[]; // Stores Account IDs
  password?: string;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  id: { 
    type: String, 
    default: () => new mongoose.Types.ObjectId().toString(), 
    unique: true 
  },
  name: { 
    type: String, 
    required: false 
  },
  email: { 
    type: String, 
    unique: true, 
    required: false 
  },
  emailVerified: { 
    type: Date, 
    required: false 
  },
  image: { 
    type: String, 
    required: false 
  },
  accounts: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Account' 
  }],
  password: { 
    type: String, 
    required: false 
  }
}, {
  collection: 'users', // Define the collection name in MongoDB
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Ensure the model is only created once
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
