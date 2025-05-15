import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Allmessage from './pages/Allmessage';
import Submit from './pages/Submit';
import Home from './pages/Home';
import Message from './pages/Message';
const App = () => {
  return (
     <div>
      <Navbar/>
      
      
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/allmessage" element={<Allmessage/>} />
          <Route path="/submit" element={<Submit/>} />
          <Route path="/message/:id" element={<Message/>}/>
        </Routes>
        

     </div>
  )
}

export default App