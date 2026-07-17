import axios from 'axios'

const FALLBACK_TRAINS = [
  { id: 1, name: '12345 Express', from: 'Chennai', to: 'Bangalore', time: '10:00', duration: '6h 30m', price: 500, class: 'AC' },
  { id: 2, name: '12346 Rajdhani', from: 'Chennai', to: 'Bangalore', time: '14:00', duration: '5h 45m', price: 750, class: 'AC' },
  { id: 3, name: '12347 Local', from: 'Chennai', to: 'Bangalore', time: '18:00', duration: '8h', price: 300, class: 'Sleeper' }
]

const trainService = {
  searchTrains: async (from, to, date, passengers) => {
    try {
      const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/searchTrain',
        params: { fromStationCode: from, toStationCode: to, dateOfJourney: date },
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_TRAIN_KEY,
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      }
      const response = await axios.request(options)
      return response.data.data || FALLBACK_TRAINS
    } catch (error) {
      console.log('Using fallback train data')
      return FALLBACK_TRAINS
    }
  },

  getTrainDetails: async (trainId) => {
    try {
      return FALLBACK_TRAINS.find(t => t.id === trainId) || FALLBACK_TRAINS[0]
    } catch (error) {
      return FALLBACK_TRAINS[0]
    }
  },

  bookTrain: async (trainId, passengers, classType) => {
    return {
      bookingId: `TRAIN${Date.now()}`,
      trainId,
      passengers,
      classType,
      status: 'confirmed'
    }
  }
}

export default trainService