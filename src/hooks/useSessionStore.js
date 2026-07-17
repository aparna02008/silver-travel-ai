import { useState, useCallback } from 'react'

const useSessionStore = () => {
  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('currentSession')
    return saved ? JSON.parse(saved) : {}
  })

  const updateSession = useCallback((data) => {
    setSession(prev => {
      const updated = { ...prev, ...data }
      localStorage.setItem('currentSession', JSON.stringify(updated))
      return updated
    })
  }, [])

  const resetSession = useCallback(() => {
    setSession({})
    localStorage.removeItem('currentSession')
  }, [])

  const saveBooking = useCallback((booking) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    bookings.push({ ...booking, id: Date.now(), date: new Date() })
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }, [])

  return { session, updateSession, resetSession, saveBooking }
}

export { useSessionStore }