export const FALLBACK_TRAINS = [
  {
    id: 1,
    name: '12345 Express',
    from: 'Chennai Central',
    to: 'Bangalore City Junction',
    time: '10:00 AM',
    arrivalTime: '4:30 PM',
    duration: '6h 30m',
    price: 500,
    class: 'AC 2-Tier',
    seats: 50
  },
  {
    id: 2,
    name: '12346 Rajdhani',
    from: 'Chennai Central',
    to: 'Bangalore City Junction',
    time: '2:00 PM',
    arrivalTime: '7:45 PM',
    duration: '5h 45m',
    price: 750,
    class: 'AC 1-Tier',
    seats: 30
  },
  {
    id: 3,
    name: '12347 Local',
    from: 'Chennai Central',
    to: 'Bangalore City Junction',
    time: '6:00 PM',
    arrivalTime: '2:00 AM',
    duration: '8h',
    price: 300,
    class: 'Sleeper',
    seats: 100
  }
]

export const FALLBACK_BUSES = [
  {
    id: 1,
    name: 'Express Travels',
    from: 'Chennai',
    to: 'Bangalore',
    time: '9:00 AM',
    duration: '6h',
    price: 400,
    type: 'AC Sleeper',
    seats: 45
  },
  {
    id: 2,
    name: 'RedBus Premium',
    from: 'Chennai',
    to: 'Bangalore',
    time: '2:00 PM',
    duration: '5h 30m',
    price: 600,
    type: 'Luxury AC',
    seats: 32
  },
  {
    id: 3,
    name: 'Local Transport',
    from: 'Chennai',
    to: 'Bangalore',
    time: '6:00 PM',
    duration: '7h',
    price: 250,
    type: 'Non-AC',
    seats: 60
  }
]

export const FALLBACK_MOVIES = [
  {
    id: 1,
    title: 'Leo',
    rating: 8.2,
    duration: 180,
    genre: 'Action/Thriller',
    language: 'Tamil',
    releaseDate: '2024-01-15'
  },
  {
    id: 2,
    title: 'Jawan',
    rating: 8.0,
    duration: 165,
    genre: 'Action/Drama',
    language: 'Hindi/Tamil',
    releaseDate: '2023-09-07'
  },
  {
    id: 3,
    title: 'Pathaan',
    rating: 7.8,
    duration: 146,
    genre: 'Action/Adventure',
    language: 'Hindi/Tamil',
    releaseDate: '2023-01-25'
  }
]

export const FALLBACK_THEATRES = [
  {
    id: 1,
    name: 'PVR Cinemas',
    city: 'Chennai',
    location: 'Express Avenue Mall',
    shows: ['10:00 AM', '2:30 PM', '7:00 PM', '10:30 PM'],
    facilities: ['Dolby Atmos', 'Recliner Seats']
  },
  {
    id: 2,
    name: 'INOX',
    city: 'Chennai',
    location: 'Phoenix Mall',
    shows: ['11:00 AM', '3:00 PM', '7:30 PM', '11:00 PM'],
    facilities: ['IMAX', 'Premium Seats']
  },
  {
    id: 3,
    name: 'Sathyam Cinemas',
    city: 'Chennai',
    location: 'Nungambakkam',
    shows: ['9:30 AM', '1:30 PM', '6:00 PM', '9:30 PM'],
    facilities: ['Classic Seats']
  }
]

export const CITIES = [
  'Chennai',
  'Bangalore',
  'Hyderabad',
  'Mumbai',
  'Delhi',
  'Kolkata',
  'Pune',
  'Ahmedabad'
]

export const TRAIN_STATIONS = [
  { code: 'MAS', name: 'Chennai Central' },
  { code: 'BNC', name: 'Bangalore City' },
  { code: 'HYB', name: 'Hyderabad' },
  { code: 'LTT', name: 'Mumbai LTT' },
  { code: 'NDLS', name: 'New Delhi' },
  { code: 'HWH', name: 'Howrah' },
  { code: 'PUNE', name: 'Pune Junction' },
  { code: 'ADI', name: 'Ahmedabad' }
]