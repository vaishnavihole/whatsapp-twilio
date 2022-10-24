import  express  from "express";
import dotenv from  "dotenv";
dotenv.config()
import mongoose from "mongoose";
import axios from "axios";
import Message from "./models/Message.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

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

        
        const messageObj = new Message({
            sid: response.data.sid,
            to: response.data.to,
            from: response.data.from,
            text: text,
            status: response.data.status,
            direction: 'outgoing'
        })
            
        const savedMessage = await messageObj.save()
    
        res.json({
            success: true,
            data: savedMessage
        })
})

app.post('/receive', async (req, res) => {
    const messageObj = new Message({
        sid: req.body.SmsMessageSid,
        to: req.body.To,
        from: req.body.From,
        text: req.body.Body,
        status: req.body.SmsStatus,
        direction: 'incoming'
    })
    await messageObj.save()

    res.json({
        status: true,
        message: "message recived successfully"
    });

})

app.post('/status_update', async (req, res)=>{
    console.log(req.body)
    const STATUS_MAP = {
        "queued": 0,
        "sent": 1,
        "delivered": 2,
        "read": 3,
        "failed": 4,
        "undeliverd":5
    }
    const dbMessage = await Message.findOne({
        sid: req.body.SmsSid
    })
    if(STATUS_MAP[dbMessage.status] > STATUS_MAP[req.body.SmsStatus]){

        return res.json({
            status: true,
            message: "no need to update startus"
        })
    }
    
   const updatedMessage = await Message.updateOne({sid: req.body.SmsSid}, {
        $set: {
            status: req.body.SmsStatus
        }
    })

    res.json({
        status:true,
        message:'status updated successfully'
    })
})

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
})



