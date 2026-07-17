# Silver Travel AI 🚀

A fully functional AI voice assistant web application for booking trains, buses, and movie tickets with multi-language support. Now includes a **World Clock** feature!

## 🌟 Features

### Travel Booking
✨ **AI Voice Assistant** - Natural language conversation like a real travel agent
🗣️ **Multi-language Support** - English, Tamil, Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi
🎫 **Multi-booking** - Train, Bus, and Movie tickets
🎤 **Voice Input & Output** - Web Speech API + Browser Text-to-Speech
💾 **Session Persistence** - Remember user preferences throughout booking
📱 **Responsive Design** - Works on desktop and mobile
🖼️ **Digital Tickets** - QR code enabled tickets
📋 **Booking History** - Track all your bookings

### World Clock ⏰
🌍 **Multiple Timezones** - Track 25+ major world timezones
⏱️ **Real-time Updates** - Live clock updates every second
➕ **Add/Remove Zones** - Customize which timezones to display
🔄 **Analog & Digital** - Toggle between display formats
🎨 **Theme Support** - Dark and Light themes
⚙️ **Settings Panel** - Control format, speed, and appearance

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Speech**: Web Speech API + Browser Text-to-Speech
- **APIs**: IRCTC RapidAPI, TMDB, ElevenLabs (Optional)
- **Routing**: React Router v6
- **HTTP**: Axios
- **QR Codes**: qrcode.react
- **Icons**: lucide-react

## 📦 Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Step 1: Clone & Setup

```bash
cd silver-travel-ai
npm install
```

### Step 2: Environment Variables

Create `.env` file in root directory:

```bash
cp .env.example .env
```

Add your API keys (optional - app works with fallback data):

```
VITE_RAPIDAPI_TRAIN_KEY=your_rapidapi_key
VITE_TMDB_KEY=your_tmdb_key
VITE_ELEVENLABS_KEY=your_elevenlabs_key
VITE_ELEVENLABS_VOICE_ID=your_voice_id
```

### Step 3: Run Development Server

```bash
npm run dev
```

App opens at `http://localhost:5173`

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AIAssistant/          # AI conversation engine
│   ├── BookingFlow/          # Train, Bus, Movie booking flows
│   ├── SearchResults/        # Search results display
│   ├── DigitalClock/         # Digital clock component
│   ├── AnalogClock/          # Analog clock component
│   └── ClockSettings/        # Clock settings panel
├── hooks/
│   ├── useSessionStore.js    # Session management
│   ├── useSpeechRecognition.js
│   └── useTextToSpeech.js
├── services/
│   ├── trainService.js       # Train API integration
│   ├── busService.js         # Bus API integration
│   ├── movieService.js       # Movie API integration
│   └── conversationEngine.js # AI conversation logic
├── utils/
│   ├── languageDetector.js   # Multi-language detection
│   ├── sessionManager.js     # Local storage management
│   ├── helpers.js            # Utility functions
│   ├── fallbackData.js       # Default data
│   └── timezoneUtils.js      # Timezone utilities
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── Chat.jsx              # Chat interface
│   ├── Confirmation.jsx      # Booking confirmation
│   ├── Ticket.jsx            # Digital ticket display
│   ├── BookingHistory.jsx    # Previous bookings
│   └── ClockPage.jsx         # World Clock page
└── App.jsx                   # Main app with routing
```

## 🎫 Booking Flow

### Train Booking
1. Select departure station
2. Select destination
3. Choose travel date
4. Enter passenger count
5. Select train from 3+ options
6. Choose coach class (AC/Sleeper/General)
7. Review and confirm booking
8. Get digital ticket with QR code

### Bus Booking
1. Select departure city
2. Select destination
3. Choose travel date
4. Enter passenger count
5. Select bus from 3+ options
6. Choose seat type (Window/Aisle)
7. Review and confirm booking
8. Get digital ticket

### Movie Booking
1. Select movie
2. Choose city
3. Select date
4. Pick theatre from 3+ options
5. Select showtime
6. Enter ticket count
7. Review and confirm booking
8. Get digital ticket with QR code

## ⏰ Clock Features

### Real-time Display
- Updates every second
- Shows time, date, and UTC offset
- Multiple timezone support

### Customization
- Add/remove timezones
- Switch between 12/24 hour format
- Adjust update speed (100-5000ms)
- Toggle between themes
- Show analog clocks alongside digital

### Supported Timezones
25 major world timezones including:
- Americas: New York, LA, Chicago, Toronto, São Paulo
- Europe: London, Paris, Berlin, Moscow
- Asia: Dubai, India, Bangkok, Singapore, Tokyo
- Africa: Cairo, Lagos, Johannesburg
- Pacific: Sydney, Auckland

## 🗣️ AI Assistant Capabilities

- **Natural Conversation** - Speaks first with greeting
- **Multi-language** - Detects and responds in user's language
- **Smart Flow** - Asks one question at a time
- **Session Memory** - Remembers previous inputs
- **Auto-continuation** - Automatically proceeds through booking
- **Voice Input/Output** - Complete speech interface
- **Error Handling** - Graceful fallbacks for API failures

## 🌐 Supported Languages

| Code | Language | Region |
|------|----------|--------|
| en | English | Global |
| ta | Tamil | India (தமிழ்) |
| hi | Hindi | India (हिन्दी) |
| te | Telugu | India (తెలుగు) |
| kn | Kannada | India (ಕನ್ನಡ) |
| ml | Malayalam | India (മലയാളം) |
| bn | Bengali | India (বাংলা) |
| mr | Marathi | India (मराठी) |

## 🎤 Speech Recognition Setup

### Browser Support
- ✅ Chrome/Edge (Full support)
- ✅ Safari (iOS 14.5+)
- ⚠️ Firefox (Limited support)

### Enable Microphone
1. Allow browser microphone access when prompted
2. Speak clearly for best recognition
3. Button shows "Listening..." when active

## 💾 Local Storage

App stores data in browser:
- `currentSession` - Active booking session
- `bookings` - All completed bookings
- `userPreferences` - Language & settings

## 🔌 API Integration

### Optional APIs (with fallbacks)

#### IRCTC Train API
```bash
# Get from RapidAPI
https://rapidapi.com/iammetrics/api/irctc1
```

#### TMDB Movie Database
```bash
# Get from TMDB
https://www.themoviedb.org/settings/api
```

#### ElevenLabs TTS (Optional)
```bash
# Get from ElevenLabs
https://elevenlabs.io/
```

## ⚙️ Configuration

### Vite Config
- Port: 5173
- Auto-open browser on dev
- Fast HMR

### TailwindCSS
- Custom colors: blue, purple, green, red
- Mobile-first responsive
- Dark mode ready

## 🧪 Testing

### Manual Testing Checklist
- [ ] Home page loads with 3 booking options
- [ ] Language selector works
- [ ] Microphone recognizes speech
- [ ] Train/Bus/Movie search returns results
- [ ] Booking confirmation page displays
- [ ] QR code generates and downloads
- [ ] Booking history persists
- [ ] Session data saves correctly
- [ ] World Clock displays all timezones
- [ ] Clock settings work properly
- [ ] Add/remove timezone functionality works

## 🔐 Environment Variables

```env
# Optional - App works without these
VITE_RAPIDAPI_TRAIN_KEY=
VITE_TMDB_KEY=
VITE_ELEVENLABS_KEY=
VITE_ELEVENLABS_VOICE_ID=
```

## 🐛 Troubleshooting

### Microphone not working
- Check browser permissions
- Ensure HTTPS on production
- Try different browser

### Speech not playing
- Check browser volume
- Ensure speakers connected
- Try different browser

### APIs returning no results
- App automatically uses fallback data
- Add real API keys in `.env`

### Clock not updating
- Refresh the page
- Check browser console for errors
- Ensure JavaScript is enabled

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Styling

Utilizes TailwindCSS with custom theme:
- Primary: Blue (#0066cc)
- Secondary: Red (#ff6b6b)
- Accent: Gold (#ffd700)
- Gradients for visual appeal

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 🤝 Contributing

Fork → Create branch → Commit → Push → Pull Request

## 📧 Support

For issues or questions, create an issue on GitHub.

## 🎉 Features Coming Soon

- Payment gateway integration
- Real-time seat selection
- Advanced search filters
- User authentication
- Booking modifications
- Customer support chat
- Weather widget integration
- Currency converter

## 📚 Documentation

- [Setup Guide](./SETUP.md)
- [Clock Documentation](./docs/CLOCK.md)
- [API Documentation](./docs/API.md)

---

**Happy Booking & Timekeeping! 🎊⏰✈️🚌🎬**