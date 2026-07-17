import axios from 'axios'

const FALLBACK_BUSES = [
  { id: 1, name: 'Express Travels', from: 'Chennai', to: 'Bangalore', time: '09:00', duration: '6h', price: 400, type: 'AC' },
  { id: 2, name: 'RedBus Premium', from: 'Chennai', to: 'Bangalore', time: '14:00', duration: '5h 30m', price: 600, type: 'Luxury' },
  { id: 3, name: 'Local Transport', from: 'Chennai', to: 'Bangalore', time: '18:00', duration: '7h', price: 250, type: 'Non-AC' }
]

const busService = {
  searchBuses: async (from, to, date, passengers) => {
    try {
      return FALLBACK_BUSES
    } catch (error) {
      console.log('Using fallback bus data')
      return FALLBACK_BUSES
    }
  },

  getBusDetails: async (busId) => {
    try {
      return FALLBACK_BUSES.find(b => b.id === busId) || FALLBACK_BUSES[0]
    } catch (error) {
      return FALLBACK_BUSES[0]
    }
  },

  bookBus: async (busId, passengers, seatType) => {
    return {
      bookingId: `BUS${Date.now()}`,
      busId,
      passengers,
      seatType,
      status: 'confirmed'
    }
  }
}

export default busService