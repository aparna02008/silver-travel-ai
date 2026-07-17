import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStore } from '../../hooks/useSessionStore'
import movieService from '../../services/movieService'

function MovieBooking() {
  const navigate = useNavigate()
  const { session, updateSession } = useSessionStore()
  const [step, setStep] = useState(0)
  const [movies, setMovies] = useState([])
  const [theatres, setTheatres] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedTheatre, setSelectedTheatre] = useState(null)
  const [selectedShowtime, setSelectedShowtime] = useState('')
  const [ticketCount, setTicketCount] = useState(1)

  const steps = [
    { title: 'Movie Name', key: 'movie' },
    { title: 'City', key: 'city' },
    { title: 'Date', key: 'date' },
    { title: 'Select Movie', key: 'selectMovie' },
    { title: 'Select Theatre', key: 'selectTheatre' },
    { title: 'Select Showtime', key: 'showtime' },
    { title: 'Ticket Count', key: 'ticketCount' }
  ]

  const handleNext = async () => {
    if (step === 1) {
      const moviesList = await movieService.searchMovies(session.city, session.date)
      setMovies(moviesList)
    } else if (step === 3) {
      const theatresList = await movieService.getTheatres(
        selectedMovie.id, session.city, session.date
      )
      setTheatres(theatresList)
    }
    setStep(step + 1)
  }

  const handleComplete = async () => {
    if (selectedShowtime && ticketCount) {
      updateSession({ ticketCount, showtime: selectedShowtime })
      const booking = await movieService.bookMovie(
        selectedMovie.id, selectedTheatre.id, selectedShowtime, ticketCount
      )
      updateSession({ booking })
      navigate('/confirmation')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {step < 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">{steps[step].title}</h2>
          <input
            type={step === 2 ? 'date' : 'text'}
            placeholder={steps[step].title}
            onChange={(e) => updateSession({ [steps[step].key]: e.target.value })}
            className="w-full px-4 py-3 border rounded-lg mb-4"
          />
          <button
            onClick={handleNext}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select a Movie</h2>
          <div className="space-y-3 mb-4">
            {movies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => { setSelectedMovie(movie); updateSession({ selectedMovie: movie }) }}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedMovie?.id === movie.id
                    ? 'border-red-600 bg-red-50'
                    : 'hover:border-red-600'
                }`}
              >
                <p className="font-bold text-lg">{movie.title}</p>
                <p className="text-gray-600">Rating: {movie.rating}/10</p>
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!selectedMovie}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
          >
            Continue
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select a Theatre</h2>
          <div className="space-y-3 mb-4">
            {theatres.map((theatre) => (
              <button
                key={theatre.id}
                onClick={() => { setSelectedTheatre(theatre); updateSession({ selectedTheatre: theatre }) }}
                className={`w-full p-4 border rounded-lg text-left transition-all ${
                  selectedTheatre?.id === theatre.id
                    ? 'border-red-600 bg-red-50'
                    : 'hover:border-red-600'
                }`}
              >
                <p className="font-bold text-lg">{theatre.name}</p>
                <p className="text-gray-600">{theatre.city}</p>
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!selectedTheatre}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
          >
            Continue
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Select Showtime</h2>
          <div className="space-y-3 mb-4">
            {selectedTheatre?.shows.map((show) => (
              <button
                key={show}
                onClick={() => setSelectedShowtime(show)}
                className={`w-full p-4 border rounded-lg font-semibold transition-all ${
                  selectedShowtime === show ? 'border-red-600 bg-red-50' : 'hover:border-red-600'
                }`}
              >
                {show}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(6)}
            disabled={!selectedShowtime}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
          >
            Continue
          </button>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Number of Tickets</h2>
          <input
            type="number"
            min="1"
            max="10"
            value={ticketCount}
            onChange={(e) => setTicketCount(parseInt(e.target.value))}
            className="w-full px-4 py-3 border rounded-lg mb-4"
          />
          <button
            onClick={handleComplete}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Complete Booking
          </button>
        </div>
      )}
    </div>
  )
}

export default MovieBooking