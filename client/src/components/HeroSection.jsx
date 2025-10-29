import React from 'react';
import { assets } from '../assets/assets';
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const videoId = 'LDwbAIunXbI'; // YouTube video ID

    return (
        <div className='relative flex h-screen w-full items-center justify-start overflow-hidden'>
            {/* Video Background */}
            <div className='absolute top-0 left-0 z-0 h-full w-full'>
                <iframe
                    className='absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2'
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&start=39`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                {/* Dark Overlay */}
                <div className='absolute top-0 left-0 z-10 h-full w-full bg-black/50'></div>
            </div>

            {/* Content */}
            <div className='relative z-20 flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36'>
\                <h1 className='text-5xl font-semibold md:text-[70px] md:leading-tight'>
                    Maa Vaishno <br /> Cinemas
                </h1>
                <p className='max-w-md text-gray-300'>
                where the divinity of comfort meets the art of cinema, and every frame feels like a blessing.
                </p>
                <button
                    onClick={() => navigate('/movies')}
                    className='mt-2 flex cursor-pointer items-center gap-1 rounded-full bg-primary px-6 py-3 text-sm font-medium transition hover:bg-primary-dull'
                >
                    Explore Movies
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

export default HeroSection;