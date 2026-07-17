import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../../hooks/useSessionStore'
import { useTextToSpeech } from '../../hooks/useTextToSpeech'
import conversationEngine from '../../services/conversationEngine'
import trainService from '../../services/trainService'
import busService from '../../services/busService'
import movieService from '../../services/movieService'

function AIAssistant({ type, language }) {
  const navigate = useNavigate()
  const { session, updateSession, saveBooking } = useSessionStore()
  const { speak } = useTextToSpeech()
  const [step, setStep] = useState(0)
  const [results, setResults] = useState([])
  const [aiMessage, setAiMessage] = useState('')

  const steps = {
    train: ['fromStation', 'toStation', 'travelDate', 'passengerCount', 'selectTrain', 'selectClass', 'confirmBooking'],
    bus: ['fromCity', 'toCity', 'travelDate', 'passengerCount', 'selectBus', 'seatType', 'confirmBooking'],
    movie: ['movieName', 'city', 'travelDate', 'selectTheatre', 'showtime', 'ticketCount', 'confirmBooking']
  }

  useEffect(() => {
    greetUser()
  }, [language])

  const greetUser = () => {
    const greeting = conversationEngine.getTemplate('greeting', language)
    setAiMessage(greeting)
    speak(greeting, getLanguageCode(language))
  }

  const getLanguageCode = (lang) => {
    const codes = {
      en: 'en-US', ta: 'ta-IN', hi: 'hi-IN', te: 'te-IN',
      kn: 'kn-IN', ml: 'ml-IN', bn: 'bn-IN', mr: 'mr-IN'
    }
    return codes[lang] || 'en-US'
  }

  const handleUserInput = async (userText) => {
    const currentStep = steps[type][step]

    switch (currentStep) {
      case 'fromStation':
      case 'fromCity':
        updateSession({ from: userText })
        askNextQuestion('Where would you like to go?')
        break
      case 'toStation':
      case 'toCity':
        updateSession({ to: userText })
        askNextQuestion('What date would you like to travel?')
        break
      case 'travelDate':
        updateSession({ date: userText })
        askNextQuestion('How many passengers?')
        break
      case 'passengerCount':
      case 'ticketCount':
        updateSession({ passengers: userText })
        if (type === 'train') searchTrains()
        else if (type === 'bus') searchBuses()
        else if (type === 'movie') searchMovies()
        break
      case 'selectTrain':
      case 'selectBus':
      case 'selectTheatre':
        updateSession({ selected: userText })
        askNextQuestion('Proceeding to next step...')
        break
      case 'confirmBooking':
        completeBooking()
        break
      default:
        askNextQuestion('Please provide the required information')
    }

    setStep(step + 1)
  }

  const searchTrains = async () => {
    const trains = await trainService.searchTrains(
      session.from, session.to, session.date, session.passengers
    )
    setResults(trains.slice(0, 3))
    const message = `I found ${trains.length} trains. Please select one.`
    setAiMessage(message)
    speak(message, getLanguageCode(language))
  }

  const searchBuses = async () => {
    const buses = await busService.searchBuses(
      session.from, session.to, session.date, session.passengers
    )
    setResults(buses.slice(0, 3))
    const message = `I found ${buses.length} buses. Please select one.`
    setAiMessage(message)
    speak(message, getLanguageCode(language))
  }

  const searchMovies = async () => {
    const movies = await movieService.searchMovies(session.city, session.date)
    setResults(movies.slice(0, 3))
    const message = `I found ${movies.length} movies. Please select one.`
    setAiMessage(message)
    speak(message, getLanguageCode(language))
  }

  const askNextQuestion = (question) => {
    setAiMessage(question)
    speak(question, getLanguageCode(language))
  }

  const completeBooking = () => {
    const booking = {
      type,
      ...session,
      bookingId: `${type.toUpperCase()}${Date.now()}`,
      timestamp: new Date().toISOString()
    }
    saveBooking(booking)
    const confirmation = 'Your booking is confirmed! Please review your ticket.'
    speak(confirmation, getLanguageCode(language))
    setTimeout(() => navigate('/confirmation'), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Assistant</h2>
        <div className="bg-blue-50 p-4 rounded-lg min-h-20">
          <p className="text-gray-800 text-lg">{aiMessage}</p>
        </div>
      </div>

      {results.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Available Options:</h3>
          <div className="space-y-3">
            {results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleUserInput(item.id || item.name)}
                className="w-full text-left p-4 border rounded-lg hover:bg-blue-50 transition-colors"
              >
                <p className="font-semibold text-gray-800">{item.name || item.title}</p>
                <p className="text-gray-600 text-sm">Price: ${item.price || item.cost}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <input
        type="text"
        placeholder="Type your answer here..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleUserInput(e.target.value)
            e.target.value = ''
          }
        }}
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default AIAssistant