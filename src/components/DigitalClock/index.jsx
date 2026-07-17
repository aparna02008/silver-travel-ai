import React, { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'

function DigitalClock() {
  const [timezones, setTimezones] = useState([
    { id: 1, name: 'New York', zone: 'America/New_York', offset: -5 },
    { id: 2, name: 'London', zone: 'Europe/London', offset: 0 },
    { id: 3, name: 'Tokyo', zone: 'Asia/Tokyo', offset: 9 },
    { id: 4, name: 'Sydney', zone: 'Australia/Sydney', offset: 10 },
    { id: 5, name: 'Dubai', zone: 'Asia/Dubai', offset: 4 },
    { id: 6, name: 'India', zone: 'Asia/Kolkata', offset: 5.5 }
  ])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showInput, setShowInput] = useState(false)
  const [newTimezone, setNewTimezone] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeInZone = (timezone) => {
    try {
      const time = new Date(currentTime.toLocaleString('en-US', { timeZone: timezone.zone }))
      return time
    } catch {
      return currentTime
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const addTimezone = () => {
    if (newTimezone.trim()) {
      const newId = Math.max(...timezones.map(t => t.id), 0) + 1
      setTimezones([...timezones, {
        id: newId,
        name: newTimezone,
        zone: 'UTC',
        offset: 0
      }])
      setNewTimezone('')
      setShowInput(false)
    }
  }

  const removeTimezone = (id) => {
    setTimezones(timezones.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">World Clock</h1>
          <p className="text-slate-400 text-lg">Track time across the globe</p>
          <p className="text-slate-500 text-sm mt-2">{formatDate(currentTime)}</p>
        </div>

        {/* Main Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {timezones.map((tz) => {
            const timeInZone = getTimeInZone(tz)
            return (
              <div
                key={tz.id}
                className="bg-slate-800 rounded-2xl p-6 shadow-2xl hover:shadow-slate-700/50 transition-all duration-300 border border-slate-700 hover:border-blue-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{tz.name}</h3>
                    <p className="text-slate-400 text-sm">{tz.zone}</p>
                  </div>
                  <button
                    onClick={() => removeTimezone(tz.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-slate-700 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Digital Display */}
                <div className="bg-slate-900 rounded-xl p-6 mb-4 border border-slate-700">
                  <div className="font-mono text-5xl font-bold text-blue-400 tracking-wider">
                    {formatTime(timeInZone)}
                  </div>
                  <div className="text-slate-400 text-sm mt-3 font-mono">
                    {timeInZone.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>

                {/* Time Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>UTC Offset:</span>
                    <span className="text-blue-400 font-semibold">UTC {tz.offset > 0 ? '+' : ''}{tz.offset}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Day:</span>
                    <span className="text-slate-200">{timeInZone.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add Timezone Button */}
        <div className="flex justify-center">
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/50"
            >
              <Plus className="w-5 h-5" /> Add Timezone
            </button>
          ) : (
            <div className="flex gap-2 w-full max-w-md">
              <input
                type="text"
                value={newTimezone}
                onChange={(e) => setNewTimezone(e.target.value)}
                placeholder="Enter timezone name (e.g., Singapore, Berlin)"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addTimezone()}
              />
              <button
                onClick={addTimezone}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Add
              </button>
              <button
                onClick={() => setShowInput(false)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DigitalClock