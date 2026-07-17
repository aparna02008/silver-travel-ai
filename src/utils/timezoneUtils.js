export const COMMON_TIMEZONES = [
  { name: 'New York', zone: 'America/New_York', offset: -5, city: 'USA' },
  { name: 'Los Angeles', zone: 'America/Los_Angeles', offset: -8, city: 'USA' },
  { name: 'Chicago', zone: 'America/Chicago', offset: -6, city: 'USA' },
  { name: 'Denver', zone: 'America/Denver', offset: -7, city: 'USA' },
  { name: 'London', zone: 'Europe/London', offset: 0, city: 'UK' },
  { name: 'Paris', zone: 'Europe/Paris', offset: 1, city: 'France' },
  { name: 'Berlin', zone: 'Europe/Berlin', offset: 1, city: 'Germany' },
  { name: 'Dubai', zone: 'Asia/Dubai', offset: 4, city: 'UAE' },
  { name: 'India', zone: 'Asia/Kolkata', offset: 5.5, city: 'India' },
  { name: 'Bangkok', zone: 'Asia/Bangkok', offset: 7, city: 'Thailand' },
  { name: 'Singapore', zone: 'Asia/Singapore', offset: 8, city: 'Singapore' },
  { name: 'Hong Kong', zone: 'Asia/Hong_Kong', offset: 8, city: 'China' },
  { name: 'Tokyo', zone: 'Asia/Tokyo', offset: 9, city: 'Japan' },
  { name: 'Seoul', zone: 'Asia/Seoul', offset: 9, city: 'South Korea' },
  { name: 'Sydney', zone: 'Australia/Sydney', offset: 10, city: 'Australia' },
  { name: 'Auckland', zone: 'Pacific/Auckland', offset: 12, city: 'New Zealand' },
  { name: 'Moscow', zone: 'Europe/Moscow', offset: 3, city: 'Russia' },
  { name: 'Istanbul', zone: 'Europe/Istanbul', offset: 3, city: 'Turkey' },
  { name: 'Cairo', zone: 'Africa/Cairo', offset: 2, city: 'Egypt' },
  { name: 'Lagos', zone: 'Africa/Lagos', offset: 1, city: 'Nigeria' },
  { name: 'Johannesburg', zone: 'Africa/Johannesburg', offset: 2, city: 'South Africa' },
  { name: 'São Paulo', zone: 'America/Sao_Paulo', offset: -3, city: 'Brazil' },
  { name: 'Mexico City', zone: 'America/Mexico_City', offset: -6, city: 'Mexico' },
  { name: 'Toronto', zone: 'America/Toronto', offset: -5, city: 'Canada' },
  { name: 'Vancouver', zone: 'America/Vancouver', offset: -8, city: 'Canada' }
]

export const getTimezoneByName = (name) => {
  return COMMON_TIMEZONES.find(tz => tz.name.toLowerCase() === name.toLowerCase())
}

export const getTimeInTimezone = (timezone) => {
  try {
    return new Date(new Date().toLocaleString('en-US', { timeZone: timezone }))
  } catch {
    return new Date()
  }
}

export const formatTimeForDisplay = (date, format = '12hour') => {
  if (format === '24hour') {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}