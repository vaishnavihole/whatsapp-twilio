import  express  from "express";
import dotenv from  "dotenv";
dotenv.config()
import mongoose from "mongoose";
import axios from "axios";

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL, ()=>{
    console.log("connected to mongodb...📦");
})

const PORT = process.env.PORT||5000;

const TWILIO_SEND = `https://api.twilio.com/2010-04-01/Accounts/${process.env.ACCOUNT_SID}/Messages.json`

app.post("/send" ,async(req, res)=>{
    const {to, text} = req.body
    
    const response = await axios.post(TWILIO_SEND,
        new URLSearchParams({
            From: "whatsapp:+14155238886",
            To: `whatsapp:${to}`,
            Body: text
        }),
        {
            auth: {
                username: process.env.ACCOUNT_SID,
                password: process.env.AUTH_TOKEN
            }
        })

        res.json({
            success: true,
            message:"data send successfully!"
            
        })

})

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
})
