import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Train, Bus, Film, History } from 'lucide-react'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-3">Silver Travel AI</h1>
        <p className="text-xl text-blue-100">Your Personal AI Travel Assistant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
        <button onClick={() => navigate('/chat/train')} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <Train className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Train Tickets</h2>
          <p className="text-gray-600">Book train tickets easily</p>
        </button>
        <button onClick={() => navigate('/chat/bus')} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <Bus className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bus Tickets</h2>
          <p className="text-gray-600">Find and book bus tickets</p>
        </button>
        <button onClick={() => navigate('/chat/movie')} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <Film className="w-16 h-16 mx-auto mb-4 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Movie Tickets</h2>
          <p className="text-gray-600">Book movie tickets online</p>
        </button>
      </div>

      <button onClick={() => navigate('/history')} className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
        <History className="w-5 h-5" /> View Booking History
      </button>
    </div>
  )
}

export default Home