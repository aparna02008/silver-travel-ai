import axios from 'axios'

const FALLBACK_MOVIES = [
  { id: 1, title: 'Leo', rating: 8.2, duration: 180, genres: ['Action', 'Thriller'], posterUrl: 'https://via.placeholder.com/200' },
  { id: 2, title: 'Jawan', rating: 8.0, duration: 165, genres: ['Action', 'Drama'], posterUrl: 'https://via.placeholder.com/200' },
  { id: 3, title: 'Pathaan', rating: 7.8, duration: 146, genres: ['Action', 'Adventure'], posterUrl: 'https://via.placeholder.com/200' }
]

const FALLBACK_THEATRES = [
  { id: 1, name: 'PVR Cinemas', city: 'Chennai', shows: ['10:00 AM', '2:30 PM', '7:00 PM', '10:30 PM'] },
  { id: 2, name: 'INOX', city: 'Chennai', shows: ['11:00 AM', '3:00 PM', '7:30 PM', '11:00 PM'] },
  { id: 3, name: 'Sathyam Cinemas', city: 'Chennai', shows: ['9:30 AM', '1:30 PM', '6:00 PM', '9:30 PM'] }
]

const movieService = {
  searchMovies: async (city, date) => {
    try {
      return FALLBACK_MOVIES
    } catch (error) {
      console.log('Using fallback movie data')
      return FALLBACK_MOVIES
    }
  },

  getTheatres: async (movieId, city, date) => {
    try {
      return FALLBACK_THEATRES
    } catch (error) {
      console.log('Using fallback theatre data')
      return FALLBACK_THEATRES
    }
  },

  bookMovie: async (movieId, theatreId, showtime, seatCount) => {
    return {
      bookingId: `MOV${Date.now()}`,
      movieId,
      theatreId,
      showtime,
      seatCount,
      status: 'confirmed'
    }
  }
}

export default movieService