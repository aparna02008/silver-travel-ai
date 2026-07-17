import { useRef, useEffect, useState } from 'react'

const useSpeechRecognition = (language = 'en-US') => {
  const recognitionRef = useRef(null)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError('Speech Recognition not supported')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = language

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setError('')
    }

    recognitionRef.current.onend = () => setIsListening(false)

    recognitionRef.current.onerror = (event) => {
      setError(event.error)
      setIsListening(false)
    }

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
  }, [language])

  const startListening = () => {
    setTranscript('')
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  return { isListening, transcript, startListening, stopListening, error }
}

export { useSpeechRecognition }