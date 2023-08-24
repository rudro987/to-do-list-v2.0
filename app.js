import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from './src/routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

connectDb().catch(err => console.log(err));
async function connectDb() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to the database!")
   }

app.listen(PORT, (req,res) => {
    console.log(`Server running on port ${PORT}.`);
});
