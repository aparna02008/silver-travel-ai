const conversationTemplates = {
  en: {
    greeting: 'Hello! I am your travel assistant. How can I help you today?',
    fromLocation: 'Where would you like to travel from?',
    toLocation: 'Where would you like to go?',
    travelDate: 'What date would you like to travel?',
    passengers: 'How many passengers?',
    selectOption: 'Please select one of the options.',
    confirmBooking: 'Should I proceed with the booking?',
    bookingConfirmed: 'Your booking is confirmed!',
    goodbye: 'Thank you for booking with us!'
  },
  ta: {
    greeting: 'வணக்கம்! நான் உங்கள் ஆசுவாச உதவியாளர். நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    fromLocation: 'நீங்கள் எங்கிருந்து பயணம் செய்ய விரும்புகிறீர்கள்?',
    toLocation: 'நீங்கள் எங்கே செல்ல விரும்புகிறீர்கள்?',
    travelDate: 'நீங்கள் எந்த தேதியில் பயணம் செய்ய விரும்புகிறீர்கள்?',
    passengers: 'எத்தனை பயணிகள் உள்ளனர்?',
    selectOption: 'ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்.',
    confirmBooking: 'முன்பதிவை தொடர்ந்து நாம் வளர்ந்து செல்லலாம்?',
    bookingConfirmed: 'உங்கள் முன்பதிவு உறுதிசெய்யப்பட்டுள்ளது!',
    goodbye: 'எங்களுடன் முன்பதிவு செய்ததற்கு நன்றி!'
  },
  hi: {
    greeting: 'नमस्ते! मैं आपका यात्रा सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?',
    fromLocation: 'आप कहाँ से यात्रा करना चाहते हैं?',
    toLocation: 'आप कहाँ जाना चाहते हैं?',
    travelDate: 'आप किस तारीख को यात्रा करना चाहते हैं?',
    passengers: 'कितने यात्री हैं?',
    selectOption: 'कृपया एक विकल्प चुनें।',
    confirmBooking: 'क्या मैं बुकिंग के साथ आगे बढ़ूं?',
    bookingConfirmed: 'आपकी बुकिंग की पुष्टि हुई!',
    goodbye: 'हमारे साथ बुकिंग के लिए धन्यवाद!'
  }
}

const conversationEngine = {
  getTemplate: (key, language = 'en') => {
    return conversationTemplates[language]?.[key] || conversationTemplates['en'][key]
  },

  detectLanguage: (text) => {
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

  extractDetails: (text, context) => {
    const tokens = text.toLowerCase().split(' ')
    const details = {}

    if (context === 'passengers') {
      const num = parseInt(text)
      if (!isNaN(num)) details.passengers = num
    }

    return details
  }
}

export default conversationEngine