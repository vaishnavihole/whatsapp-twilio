import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sid: String,
    to: String,
    from: String,
    status: String,
    text: String
},
{
    timestamps: true
}

)

const Message = mongoose.model('Message',messageSchema)
export default Message;
