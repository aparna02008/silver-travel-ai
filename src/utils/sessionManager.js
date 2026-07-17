const sessionManager = {
  saveSession: (data) => {
    localStorage.setItem('currentSession', JSON.stringify(data))
  },

  getSession: () => {
    const session = localStorage.getItem('currentSession')
    return session ? JSON.parse(session) : {}
  },

  clearSession: () => {
    localStorage.removeItem('currentSession')
  },

  saveBooking: (booking) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    bookings.push({
      ...booking,
      id: `BOOKING${Date.now()}`,
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('bookings', JSON.stringify(bookings))
    return booking.id
  },

  getBookings: () => {
    return JSON.parse(localStorage.getItem('bookings') || '[]')
  },

  deleteBooking: (id) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const filtered = bookings.filter(b => b.id !== id)
    localStorage.setItem('bookings', JSON.stringify(filtered))
  },

  getUserPreferences: () => {
    const prefs = localStorage.getItem('userPreferences')
    return prefs ? JSON.parse(prefs) : { language: 'en' }
  },

  saveUserPreferences: (prefs) => {
    localStorage.setItem('userPreferences', JSON.stringify(prefs))
  }
}

export default sessionManager