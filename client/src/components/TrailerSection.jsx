import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import ReactPlayer from "react-player";
import { dummyTrailers } from "../assets/assets";
import { PlayCircleIcon } from "lucide-react";


// error - v3 of react-player is not compatable shit , use v2 
const TrailersSection = () => {

  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden'>
      <p className='text-gray-300 font-medium text-lg max-w-[960px]mx-auto'>Trailers</p>

      <div className='relative mt-6'>
        <BlurCircle top='-100px' right='-100px'/>
        <ReactPlayer url={currentTrailer.videoUrl} controls={false}
          className="mx-auto max-w-full" width="960px" height="540px"/>
      </div>
    
    
      <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
        {dummyTrailers.map((trailer)=>(
        <div key={trailer.image} className='relativegroup-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300transition max-md:h-60 md:max-h-60 cursor-pointer' 
            onClick={() =>setCurrentTrailer(trailer)}>

            <img src={trailer.image} alt="trailer" className='rounded-lg w-fullh-full object-cover brightness-75'/>

        </div>
      ))}
      </div>
    </div>
  )
}


export default TrailersSection