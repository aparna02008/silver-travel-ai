import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Clock, Plane, Home } from 'lucide-react'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Confirmation from './pages/Confirmation'
import Ticket from './pages/Ticket'
import BookingHistory from './pages/BookingHistory'
import ClockPage from './pages/ClockPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700">
              <Plane className="w-8 h-8" />
              Silver Travel AI
            </Link>
            <div className="flex gap-6 items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                <Home className="w-5 h-5 inline mr-1" />
                Home
              </Link>
              <Link to="/clock" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                <Clock className="w-5 h-5 inline mr-1" />
                World Clock
              </Link>
              <Link to="/history" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                History
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/clock" element={<ClockPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App