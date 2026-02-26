import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import MovieCard from './MovieCard';

const ShowMore = () => {
    const navigate = useNavigate()
    const { shows } = useContext(AppContext)
  return (
    <div>
        <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
            {shows.slice(0,4).map((movie, index)=>(
            <MovieCard key={index} movie={movie}/>
            ))}
        </div>
        <div className='flex justify-center mt-20'>
            <button onClick={() => {navigate('/movies'); scrollTo(0,0)}}
            className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
        </div>
    </div>
  )
}

export default ShowMore