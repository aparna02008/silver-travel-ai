import React, { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

function ClockSettings({ onSettingsChange }) {
  const [format, setFormat] = useState('12hour')
  const [updateSpeed, setUpdateSpeed] = useState(1000)
  const [theme, setTheme] = useState('dark')
  const [showAnalog, setShowAnalog] = useState(false)

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat)
    onSettingsChange({ format: newFormat, updateSpeed, theme, showAnalog })
  }

  const handleSpeedChange = (speed) => {
    setUpdateSpeed(speed)
    onSettingsChange({ format, updateSpeed: speed, theme, showAnalog })
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    onSettingsChange({ format, updateSpeed, theme: newTheme, showAnalog })
  }

  const toggleAnalog = () => {
    const newShowAnalog = !showAnalog
    setShowAnalog(newShowAnalog)
    onSettingsChange({ format, updateSpeed, theme, showAnalog: newShowAnalog })
  }

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-lg border ${
      theme === 'dark' 
        ? 'bg-slate-800/50 border-slate-700' 
        : 'bg-white/50 border-slate-200'
    }`}>
      <h3 className={`text-lg font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-slate-800'
      }`}>
        ⚙️ Clock Settings
      </h3>

      {/* Time Format */}
      <div className="mb-6">
        <label className={`block text-sm font-semibold mb-3 ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Time Format
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => handleFormatChange('12hour')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              format === '12hour'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            12 Hour
          </button>
          <button
            onClick={() => handleFormatChange('24hour')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              format === '24hour'
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            24 Hour
          </button>
        </div>
      </div>

      {/* Update Speed */}
      <div className="mb-6">
        <label className={`block text-sm font-semibold mb-3 ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Update Speed
        </label>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => handleSpeedChange(Math.max(100, updateSpeed - 100))}
            className={`p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <span className={`text-sm font-semibold flex-1 text-center ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {updateSpeed}ms
          </span>
          <button
            onClick={() => handleSpeedChange(Math.min(5000, updateSpeed + 100))}
            className={`p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Theme */}
      <div className="mb-6">
        <label className={`block text-sm font-semibold mb-3 ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Theme
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => handleThemeChange('dark')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              theme === 'dark'
                ? 'bg-slate-900 text-slate-300 border-2 border-blue-600'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            🌙 Dark
          </button>
          <button
            onClick={() => handleThemeChange('light')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              theme === 'light'
                ? 'bg-yellow-100 text-slate-800 border-2 border-blue-600'
                : theme === 'dark'
                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
            }`}
          >
            ☀️ Light
          </button>
        </div>
      </div>

      {/* Analog Clock Toggle */}
      <div className="flex items-center justify-between">
        <label className={`text-sm font-semibold ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Show Analog Clocks
        </label>
        <button
          onClick={toggleAnalog}
          className={`relative w-12 h-7 rounded-full transition-all ${
            showAnalog
              ? 'bg-blue-600'
              : theme === 'dark'
                ? 'bg-slate-700'
                : 'bg-slate-300'
          }`}
        >
          <div
            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
              showAnalog ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default ClockSettings