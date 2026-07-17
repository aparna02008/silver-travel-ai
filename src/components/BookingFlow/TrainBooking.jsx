import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../../hooks/useSessionStore'
import trainService from '../../services/trainService'

function TrainBooking() {
  const navigate = useNavigate()
  const { session, updateSession } = useSessionStore()
  const [step, setStep] = useState(0)
  const [trains, setTrains] = useState([])
  const [selectedTrain, setSelectedTrain] = useState(null)
  const [classType, setClassType] = useState('')

  const classes = ['AC', 'Sleeper', 'General']

  const steps = [
    { title: 'From Station', key: 'from' },
    { title: 'To Station', key: 'to' },
    { title: 'Travel Date', key: 'date' },
    { title: 'Passengers', key: 'passengers' },
    { title: 'Select Train', key: 'train' },
    { title: 'Select Class', key: 'class' }
  ]

  const handleNext = async () => {
    if (step === 3) {
      const trainsList = await trainService.searchTrains(
        session.from, session.to, session.date, session.passengers
      )
      setTrains(trainsList)
    }
    setStep(step + 1)
  }

  const handleSelectTrain = (train) => {
    setSelectedTrain(train)
    updateSession({ selectedTrain: train })
  }

  const handleComplete = async () => {
    if (classType) {
      updateSession({ classType })
      const booking = await trainService.bookTrain(
        selectedTrain.id, session.passengers, classType
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select a Train</h2>
          <div className="space-y-3 mb-4">
            {trains.map((train) => (
              <button
                key={train.id}
                onClick={() => handleSelectTrain(train)}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedTrain?.id === train.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'hover:border-blue-600'
                }`}
              >
                <p className="font-bold text-lg">{train.name}</p>
                <p className="text-gray-600">{train.time} - {train.duration}</p>
                <p className="text-blue-600 font-bold">₹{train.price}</p>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(5)}
            disabled={!selectedTrain}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            Continue
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select Class</h2>
          <div className="space-y-3 mb-4">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setClassType(cls)}
                className={`w-full p-4 border rounded-lg font-semibold transition-all ${
                  classType === cls ? 'border-blue-600 bg-blue-50' : 'hover:border-blue-600'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
          <button
            onClick={handleComplete}
            disabled={!classType}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            Complete Booking
          </button>
        </div>
      )}
    </div>
  )
}

export default TrainBooking