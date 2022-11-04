import React from 'react'
import './ChatPage.css'
import ButtonImg from './sendbutton.png';
import IncomingMessage from '../../components/IncomingMessage/IncomingMessage';
import OutgoingMessage from '../../components/OutgoingMessage/OutgoingMessage';



function ChatPage() {
  return (
    <div>
      <div className='chatpage-container'>
        <IncomingMessage />
        <OutgoingMessage />
      </div>
      <div className='mesaage-input-box-container'>
        <input type="text" className='message-input-box' placeholder=' Type a  message' />
        <img src={ButtonImg} alt="" />

      </div>
    </div>
  )
}

export default ChatPage