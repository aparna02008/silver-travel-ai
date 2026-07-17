import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Mic, MicOff, RotateCcw, X } from 'lucide-react'
import { useSessionStore } from '../hooks/useSessionStore'

function Chat() {
  const { type } = useParams()
  const navigate = useNavigate()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [language, setLanguage] = useState('en')
  const { resetSession } = useSessionStore()
  const recognitionRef = useRef(null)

  useEffect(() => {
    initializeSpeechRecognition()
  }, [language])

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = getLanguageCode(language)
      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            setTranscript(prev => prev + transcriptSegment)
          } else {
            interimTranscript += transcriptSegment
          }
        }
      }
    }
  }

  const getLanguageCode = (lang) => {
    const codes = {en: 'en-US', ta: 'ta-IN', hi: 'hi-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN', bn: 'bn-IN', mr: 'mr-IN'}
    return codes[lang] || 'en-US'
  }

  const startListening = () => {
    if (recognitionRef.current) { setTranscript(''); recognitionRef.current.start() }
  }

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Silver Travel AI</h1>
          <div className="flex gap-2">
            <button onClick={() => { resetSession(); setTranscript('') }} className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Start Over
            </button>
            <button onClick={() => { resetSession(); navigate('/') }} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>

        <div className="mb-6 flex gap-2 flex-wrap justify-center">
          {['en', 'ta', 'hi', 'te', 'kn', 'ml', 'bn', 'mr'].map(lang => (
            <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-2 rounded text-sm font-semibold transition-all ${language === lang ? 'bg-white text-blue-600' : 'bg-blue-500 text-white hover:bg-blue-400'}`}>
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
          <p className="text-gray-600 text-sm mb-2">Live Transcript:</p>
          <div className="h-24 bg-gray-50 rounded p-4 text-gray-800 overflow-y-auto">
            {transcript || <span className="text-gray-400">Waiting for input...</span>}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={startListening} disabled={isListening} className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors flex items-center gap-2">
            <Mic className={`w-5 h-5 ${isListening ? 'pulse-mic' : ''}`} />
            {isListening ? 'Listening...' : 'Start Listening'}
          </button>
          <button onClick={stopListening} disabled={!isListening} className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 disabled:bg-gray-400 transition-colors flex items-center gap-2">
            <MicOff className="w-5 h-5" /> Stop
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat