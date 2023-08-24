import express from "express";
import bodyParser from "body-parser";
import { connectDb } from "./src/db/config.js";
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

app.listen(PORT, (req,res) => {
    console.log(`Server running on port ${PORT}.`);
});
