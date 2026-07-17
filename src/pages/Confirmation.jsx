import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { useSessionStore } from '../hooks/useSessionStore'

function Confirmation() {
  const navigate = useNavigate()
  const { session } = useSessionStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
          <div className="space-y-3">
            {Object.entries(session).map(([key, value]) => (
              <div key={key} className="flex justify-between text-gray-700">
                <span className="font-semibold capitalize">{key}:</span>
                <span>{JSON.stringify(value)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/ticket')} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">View Ticket</button>
          <button onClick={() => navigate('/')} className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">Book Again</button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation