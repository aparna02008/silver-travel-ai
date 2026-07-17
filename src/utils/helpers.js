export const formatDate = (date) => {
  if (typeof date === 'string') date = new Date(date)
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (time) => {
  if (typeof time === 'string') return time
  return new Date(time).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount)
}

export const calculateDuration = (start, end) => {
  const diff = new Date(end) - new Date(start)
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  return `${hours}h ${minutes}m`
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/
  return regex.test(phone)
}

export const generateBookingId = (type) => {
  return `${type.toUpperCase()}${Date.now()}`
}

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}