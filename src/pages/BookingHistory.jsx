import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'

function BookingHistory() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    setBookings(savedBookings)
  }, [])

  const handleDelete = (id) => {
    const updated = bookings.filter(b => b.id !== id)
    setBookings(updated)
    localStorage.setItem('bookings', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white mb-6 hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Booking History</h1>
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 capitalize">{booking.type} Ticket</h3>
                      <p className="text-gray-600 text-sm">ID: {booking.id}</p>
                    </div>
                    <button onClick={() => handleDelete(booking.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingHistory