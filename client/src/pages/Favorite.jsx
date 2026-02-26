import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import Loading from '../components/Loading'
import api from '../lib/api'

const Favorite = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFavourites = async () => {
    try {
      const { data } = await api.get('/api/user/favourite')
      if (data.success) {
        setMovies(data.movies)
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavourites()
  }, [])

  if (loading) return <Loading />

  return  movies.length >0 ? (
    <div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>


        <BlurCircle top="150px" left="0px"/>
        <BlurCircle bottom="50px" right="50px"/>


        <h1 className='text-lg font-medium my-4'>Your Favourites</h1>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie._id}/>
            ))}
        </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen' >
    <h1 className='text-3xl font-bold text-center'>No favourites yet</h1>
    </div>
  )
}

export default Favorite
