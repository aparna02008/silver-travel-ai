import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Confirmation from './pages/Confirmation'
import Ticket from './pages/Ticket'
import BookingHistory from './pages/BookingHistory'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:type" element={<Chat />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/history" element={<BookingHistory />} />
      </Routes>
    </Router>
  )
}

export default App