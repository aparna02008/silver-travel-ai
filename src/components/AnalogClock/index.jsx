import React, { useState, useEffect } from 'react'
import { Clock, Settings } from 'lucide-react'
import { getTimeInTimezone, formatTimeForDisplay } from '../../utils/timezoneUtils'

function AnalogClock({ timezone, size = 'md' }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeInZone = () => {
    try {
      return new Date(time.toLocaleString('en-US', { timeZone: timezone }))
    } catch {
      return time
    }
  }

  const timeInZone = getTimeInZone()
  const hours = timeInZone.getHours() % 12
  const minutes = timeInZone.getMinutes()
  const seconds = timeInZone.getSeconds()

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56'
  }

  const hourDegrees = (hours * 30) + (minutes * 0.5)
  const minuteDegrees = (minutes * 6) + (seconds * 0.1)
  const secondDegrees = seconds * 6

  return (
    <div className={`${sizeClasses[size]} relative bg-white rounded-full shadow-lg border-4 border-slate-800`}>
      {/* Clock center */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />

      {/* Hour markers */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180)
        const x = Math.sin(angle) * 35
        const y = -Math.cos(angle) * 35
        return (
          <div
            key={i}
            className="absolute text-xs font-bold text-slate-800"
            style={{
              top: `calc(50% + ${y}% - 8px)`,
              left: `calc(50% + ${x}% - 8px)`
            }}
          >
            {i === 0 ? 12 : i}
          </div>
        )
      })}

      {/* Hour hand */}
      <div
        className="absolute top-1/2 left-1/2 w-2 h-12 bg-slate-800 rounded-full origin-bottom transform -translate-x-1/2"
        style={{
          transform: `translate(-50%, -50%) rotate(${hourDegrees}deg)`,
          marginTop: '-24px'
        }}
      />

      {/* Minute hand */}
      <div
        className="absolute top-1/2 left-1/2 w-1.5 h-16 bg-slate-600 rounded-full origin-bottom transform -translate-x-1/2"
        style={{
          transform: `translate(-50%, -50%) rotate(${minuteDegrees}deg)`,
          marginTop: '-32px'
        }}
      />

      {/* Second hand */}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-20 bg-red-500 rounded-full origin-bottom transform -translate-x-1/2"
        style={{
          transform: `translate(-50%, -50%) rotate(${secondDegrees}deg)`,
          marginTop: '-40px'
        }}
      />
    </div>
  )
}

export default AnalogClock