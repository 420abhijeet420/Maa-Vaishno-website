import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import api, { tmdbImg } from '../../lib/api'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/Loading'
import { dateFormat } from '../../lib/dateFormat'

const ListBookings = () => {
  const { currency } = useContext(AppContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/api/admin/all-bookings')
      if (data.success) {
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  if (loading) return <Loading />

  return (
    <div>
      <Title Text1="List " Text2="Bookings" />

      {bookings.length === 0 ? (
        <p className="mt-6 text-gray-400">No bookings found.</p>
      ) : (
        <div className="mt-6 space-y-4 max-w-4xl">
          {bookings.map((booking) => (
            <div key={booking._id} className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg p-3">
              <div className="flex flex-col md:flex-row gap-4">
                <img
                  src={tmdbImg(booking.show?.movie?.poster_path)}
                  alt=""
                  className="w-24 h-auto rounded object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-medium">{booking.show?.movie?.title}</p>
                  <p className="text-sm text-gray-400">{dateFormat(booking.show?.showDateTime)}</p>
                  <p className="text-sm text-gray-400 mt-1">User: {booking.user?.name || booking.user?._id}</p>
                  <p className="text-sm text-gray-400">Seats: {booking.bookedSeats?.join(', ')}</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between p-2">
                <p className="text-xl font-medium">{currency}{booking.amount}</p>
                <span className={`text-xs px-3 py-1 rounded-full ${booking.isPaid ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {booking.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListBookings
