import React,{ useState } from 'react'
import axios from 'axios'
import './ChatPage.css'
import ButtonImg from './sendbutton.png';
import IncomingMessage from '../../components/IncomingMessage/IncomingMessage';
import OutgoingMessage from '../../components/OutgoingMessage/OutgoingMessage';



function ChatPage() {
   const [currentMessage, setCurrentMessage] = useState("")

  async function sendMessage(){
  const response = await  axios.post('/send',{
      to: "919588603013",
      text: currentMessage
   })
   console.log(response.data)
    setCurrentMessage("")
   }

  return (
    <div>
      <div className='chatpage-container'>
        <IncomingMessage />
        <OutgoingMessage />
      </div>
      <div className='mesaage-input-box-container'>
        <input type="text" value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}} className='message-input-box' placeholder=' Type a  message' />
        <img src={ButtonImg} onClick={sendMessage} alt="" />

      </div>
    </div>
  )
}

export default ChatPage