import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import api, { tmdbImg } from '../../lib/api'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import Loading from '../../components/Loading'
import { PlusIcon, TrashIcon } from 'lucide-react'

const AddShows = () => {
  const { currency } = useContext(AppContext)

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showPrice, setShowPrice] = useState('')
  const [showsInput, setShowsInput] = useState([{ date: '', time: [''] }])
  const [submitting, setSubmitting] = useState(false)

  const fetchNowPlaying = async () => {
    try {
      const { data } = await api.get('/api/show/now-playing')
      if (data.success) {
        setMovies(data.movies)
      } else {
        toast.error(data.message || 'Failed to fetch movies')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNowPlaying()
  }, [])

  const addDateRow = () => {
    setShowsInput(prev => [...prev, { date: '', time: [''] }])
  }

  const removeDateRow = (index) => {
    setShowsInput(prev => prev.filter((_, i) => i !== index))
  }

  const updateDate = (index, value) => {
    setShowsInput(prev => prev.map((item, i) => i === index ? { ...item, date: value } : item))
  }

  const addTimeSlot = (dateIndex) => {
    setShowsInput(prev => prev.map((item, i) => i === dateIndex ? { ...item, time: [...item.time, ''] } : item))
  }

  const removeTimeSlot = (dateIndex, timeIndex) => {
    setShowsInput(prev => prev.map((item, i) => i === dateIndex ? { ...item, time: item.time.filter((_, j) => j !== timeIndex) } : item))
  }

  const updateTime = (dateIndex, timeIndex, value) => {
    setShowsInput(prev => prev.map((item, i) => i === dateIndex ? { ...item, time: item.time.map((t, j) => j === timeIndex ? value : t) } : item))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedMovie) return toast.error('Please select a movie')
    if (!showPrice) return toast.error('Please set a price')

    // Validate all dates and times are filled
    for (const show of showsInput) {
      if (!show.date) return toast.error('Please fill all dates')
      for (const time of show.time) {
        if (!time) return toast.error('Please fill all time slots')
      }
    }

    try {
      setSubmitting(true)
      const { data } = await api.post('/api/show/add', {
        movieId: String(selectedMovie.id),
        showsInput,
        showPrice: Number(showPrice),
      })
      if (data.success) {
        toast.success(data.message)
        setSelectedMovie(null)
        setShowPrice('')
        setShowsInput([{ date: '', time: [''] }])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div>
      <Title Text1="Add " Text2="Shows" />

      {/* Step 1: Select a movie */}
      <p className="mt-6 mb-3 text-sm text-gray-400">Select a Now Playing movie</p>
      <div className="flex flex-wrap gap-4 max-h-80 overflow-y-auto pb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className={`w-28 cursor-pointer rounded-lg overflow-hidden border-2 transition hover:-translate-y-1 ${
              selectedMovie?.id === movie.id ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src={tmdbImg(movie.poster_path)}
              alt={movie.title}
              className="w-full h-40 object-cover"
            />
            <p className="text-xs p-1 truncate">{movie.title}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="font-medium">{selectedMovie.title}</p>
            <p className="text-sm text-gray-400 mt-1">{selectedMovie.overview?.slice(0, 100)}...</p>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-400">Ticket Price ({currency})</label>
            <input
              type="number"
              min="1"
              value={showPrice}
              onChange={(e) => setShowPrice(e.target.value)}
              placeholder="e.g. 149"
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white outline-none focus:border-primary"
            />
          </div>

          {/* Date/Time rows */}
          <div>
            <label className="text-sm text-gray-400">Show Dates & Times</label>
            {showsInput.map((row, dateIdx) => (
              <div key={dateIdx} className="mt-3 p-3 bg-gray-800/50 border border-gray-700 rounded-md">
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => updateDate(dateIdx, e.target.value)}
                    className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-white outline-none focus:border-primary"
                  />
                  {showsInput.length > 1 && (
                    <button type="button" onClick={() => removeDateRow(dateIdx)} className="text-red-400 hover:text-red-300">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {row.time.map((t, timeIdx) => (
                    <div key={timeIdx} className="flex items-center gap-1">
                      <input
                        type="time"
                        value={t}
                        onChange={(e) => updateTime(dateIdx, timeIdx, e.target.value)}
                        className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm outline-none focus:border-primary"
                      />
                      {row.time.length > 1 && (
                        <button type="button" onClick={() => removeTimeSlot(dateIdx, timeIdx)} className="text-red-400 hover:text-red-300">
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={() => addTimeSlot(dateIdx)} className="text-primary text-xs flex items-center gap-1 hover:underline">
                    <PlusIcon className="w-3.5 h-3.5" /> Add Time
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addDateRow} className="mt-3 text-primary text-sm flex items-center gap-1 hover:underline">
              <PlusIcon className="w-4 h-4" /> Add Another Date
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-2.5 bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Adding...' : 'Add Shows'}
          </button>
        </form>
      )}
    </div>
  )
}

export default AddShows
