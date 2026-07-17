const languageDetector = {
  detect: (text) => {
    const patterns = {
      ta: /[\u0B80-\u0BFF]/,
      hi: /[\u0900-\u097F]/,
      te: /[\u0C00-\u0C7F]/,
      kn: /[\u0C80-\u0CFF]/,
      ml: /[\u0D00-\u0D7F]/,
      bn: /[\u0980-\u09FF]/,
      mr: /[\u0900-\u097F]/
    }
    
    for (const [lang, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) return lang
    }
    return 'en'
  },

  getLanguageName: (code) => {
    const names = {
      en: 'English',
      ta: 'Tamil',
      hi: 'Hindi',
      te: 'Telugu',
      kn: 'Kannada',
      ml: 'Malayalam',
      bn: 'Bengali',
      mr: 'Marathi'
    }
    return names[code] || 'English'
  },

  getSpeechRecognitionLang: (code) => {
    const codes = {
      en: 'en-US',
      ta: 'ta-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      bn: 'bn-IN',
      mr: 'mr-IN'
    }
    return codes[code] || 'en-US'
  }
}

export default languageDetector