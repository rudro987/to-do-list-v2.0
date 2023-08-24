import mongoose from "mongoose";

async function connectDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Successfully connected to the database!")
 }

 export { connectDb };