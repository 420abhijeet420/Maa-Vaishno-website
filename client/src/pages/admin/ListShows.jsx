import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import api, { tmdbImg } from '../../lib/api'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/Loading'
import { dateFormat } from '../../lib/dateFormat'
import { StarIcon } from 'lucide-react'

const ListShows = () => {
  const { currency } = useContext(AppContext)
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchShows = async () => {
    try {
      const { data } = await api.get('/api/admin/all-shows')
      if (data.success) {
        setShows(data.shows)
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [])

  if (loading) return <Loading />

  return (
    <div>
      <Title Text1="List " Text2="Shows" />

      {shows.length === 0 ? (
        <p className="mt-6 text-gray-400">No active shows found.</p>
      ) : (
        <div className="flex flex-wrap gap-6 mt-6">
          {shows.map((show) => (
            <div key={show._id} className="w-55 rounded-lg overflow-hidden pb-3 bg-primary/10 border border-primary/20 hover:-translate-y-1 transition duration-300">
              <img src={tmdbImg(show.movie?.poster_path)} alt="" className="h-60 w-full object-cover" />
              <p className="font-medium p-2 truncate">{show.movie?.title}</p>
              <div className="flex items-center justify-between px-2">
                <p className="text-lg font-medium">{currency}{show.showPrice}</p>
                <p className="flex items-center gap-1 text-sm text-gray-400 pr-1">
                  <StarIcon className="w-4 h-4 text-primary fill-primary" />
                  {show.movie?.vote_average?.toFixed(1)}
                </p>
              </div>
              <p className="px-2 pt-2 text-sm text-gray-500">{dateFormat(show.showDateTime)}</p>
              <p className="px-2 text-xs text-gray-500">
                {Object.keys(show.occupiedSeats || {}).length} seats booked
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListShows
