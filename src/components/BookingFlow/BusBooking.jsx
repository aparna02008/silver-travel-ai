import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../../hooks/useSessionStore'
import busService from '../../services/busService'

function BusBooking() {
  const navigate = useNavigate()
  const { session, updateSession } = useSessionStore()
  const [step, setStep] = useState(0)
  const [buses, setBuses] = useState([])
  const [selectedBus, setSelectedBus] = useState(null)
  const [seatType, setSeatType] = useState('')

  const seatTypes = ['Window', 'Aisle', 'Middle']

  const steps = [
    { title: 'From City', key: 'from' },
    { title: 'To City', key: 'to' },
    { title: 'Travel Date', key: 'date' },
    { title: 'Passengers', key: 'passengers' },
    { title: 'Select Bus', key: 'bus' },
    { title: 'Select Seat Type', key: 'seatType' }
  ]

  const handleNext = async () => {
    if (step === 3) {
      const busesList = await busService.searchBuses(
        session.from, session.to, session.date, session.passengers
      )
      setBuses(busesList)
    }
    setStep(step + 1)
  }

  const handleSelectBus = (bus) => {
    setSelectedBus(bus)
    updateSession({ selectedBus: bus })
  }

  const handleComplete = async () => {
    if (seatType) {
      updateSession({ seatType })
      const booking = await busService.bookBus(
        selectedBus.id, session.passengers, seatType
      )
      updateSession({ booking })
      navigate('/confirmation')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {step < 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">{steps[step].title}</h2>
          <input
            type={step === 2 ? 'date' : 'text'}
            placeholder={steps[step].title}
            onChange={(e) => updateSession({ [steps[step].key]: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg mb-4"
          />
          <button
            onClick={handleNext}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select a Bus</h2>
          <div className="space-y-3 mb-4">
            {buses.map((bus) => (
              <button
                key={bus.id}
                onClick={() => handleSelectBus(bus)}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedBus?.id === bus.id
                    ? 'border-green-600 bg-green-50'
                    : 'hover:border-green-600'
                }`}
              >
                <p className="font-bold text-lg">{bus.name}</p>
                <p className="text-gray-600">{bus.time} - {bus.duration}</p>
                <p className="text-green-600 font-bold">₹{bus.price}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(5)}
            disabled={!selectedBus}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            Continue
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select Seat Type</h2>
          <div className="space-y-3 mb-4">
            {seatTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSeatType(type)}
                className={`w-full p-4 border rounded-lg font-semibold transition-all ${
                  seatType === type ? 'border-green-600 bg-green-50' : 'hover:border-green-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <button
            onClick={handleComplete}
            disabled={!seatType}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            Complete Booking
          </button>
        </div>
      )}
    </div>
  )
}

export default BusBooking