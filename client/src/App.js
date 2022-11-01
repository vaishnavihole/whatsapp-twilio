import React from 'react'
import { BrowserRouter,Routes, Route,  } from 'react-router-dom';
import Home from './views/Home/Home';
import ChatPage from './views/ChatPage/ChatPage';
import About from './views/About/About';




function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatpage" element={<ChatPage/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
