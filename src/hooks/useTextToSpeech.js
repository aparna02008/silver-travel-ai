import { useState } from 'react'

const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const synth = window.speechSynthesis

  const speak = (text, language = 'en-US') => {
    if (synth.speaking) {
      synth.cancel()
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    utterance.rate = 1
    utterance.pitch = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    synth.speak(utterance)
  }

  const stop = () => {
    synth.cancel()
    setIsSpeaking(false)
  }

  return { isSpeaking, speak, stop }
}

export { useTextToSpeech }