import React, { useState, useEffect } from 'react'
import DigitalClock from './components/DigitalClock'
import AnalogClock from './components/AnalogClock'
import ClockSettings from './components/ClockSettings'
import { COMMON_TIMEZONES } from './utils/timezoneUtils'

function ClockPage() {
  const [settings, setSettings] = useState({
    format: '12hour',
    updateSpeed: 1000,
    theme: 'dark',
    showAnalog: false
  })
  const [favorites, setFavorites] = useState(COMMON_TIMEZONES.slice(0, 6))

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      settings.theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 ${
          settings.theme === 'dark' ? 'text-white' : 'text-slate-800'
        }`}>
          <h1 className="text-5xl font-bold mb-2">⏰ World Clock</h1>
          <p className={`text-lg ${
            settings.theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Track time across multiple time zones in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <ClockSettings onSettingsChange={handleSettingsChange} />
          </div>

          {/* Clocks Section */}
          <div className="lg:col-span-3">
            <DigitalClock />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClockPage