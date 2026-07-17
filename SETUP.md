# Silver Travel AI - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env
```

### 3. (Optional) Add API Keys
Edit `.env` and add your API keys from:
- [RapidAPI IRCTC](https://rapidapi.com/iammetrics/api/irctc1)
- [TMDB API](https://www.themoviedb.org/settings/api)
- [ElevenLabs](https://elevenlabs.io/)

### 4. Run Development Server
```bash
npm run dev
```

App opens at `http://localhost:5173`

## Features Included

✅ Train Ticket Booking
✅ Bus Ticket Booking
✅ Movie Ticket Booking
✅ AI Voice Assistant
✅ 8 Languages Support
✅ Speech Recognition
✅ Digital Tickets with QR
✅ Booking History
✅ Responsive Design

## Browser Requirements

- Chrome/Edge (Recommended)
- Firefox
- Safari (iOS 14.5+)

## Microphone Setup

Allow browser microphone access when prompted.

## Build for Production

```bash
npm run build
```

Output in `dist/` folder

## Fallback Data

App includes fallback data so you can:
- Test without APIs
- Demo all features
- Add real API keys anytime

---

Enjoy the app! 🚀