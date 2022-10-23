import  express  from "express";
import dotenv from  "dotenv";
dotenv.config()
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL, ()=>{
    console.log("connected to mongodb...📦");
})

const PORT = process.env.PORT||5000;

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
})
