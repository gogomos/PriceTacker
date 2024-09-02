// import mongoose from 'mongoose';

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   // id: { 
//   //   type: String, 
//   //   default: () => new mongoose.Types.ObjectId().toString(), 
//   //   unique: true 
//   // },
//   name: { 
//     type: String, 
//     required: false 
//   },
//   email: { 
//     type: String, 
//     unique: true, 
//     required: false 
//   },
//   emailVerified: { 
//     type: Date, 
//     required: false 
//   },
//   image: { 
//     type: String, 
//     required: false 
//   },
//   accounts: [{ 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Account' 
//   }],
//   password: { 
//     type: String, 
//     required: false 
//   }
// }, {
//   collection: 'users', // Define the collection name in MongoDB
//   timestamps: true // Automatically adds createdAt and updatedAt fields
// });
// // console.log('Mongoose Models:', mongoose.models);
// // console.log('User Schema:', userSchema);

// // Ensure the model is only created once
// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;
