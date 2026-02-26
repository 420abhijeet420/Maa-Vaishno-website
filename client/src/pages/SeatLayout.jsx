import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'
import api from '../lib/api'
import { useUser } from '@clerk/clerk-react'

const SeatLayout = () => {
  const { id, date } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()
  
  const groupRows = [["A","B"], ["C", "D"], ["E" ,"F"], ["G", "H"], ["I", "J"]]
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState()
  const [show, setShow] = useState(null)
  const [occupiedSeats, setOccupiedSeats] = useState([])
  const [booking, setBooking] = useState(false)

  const renderSeats = (row, count = 6) => (
  <div key={row} className="flex gap-2 mt-2">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        const isOccupied = occupiedSeats.includes(seatId);
        return (
          <button key={seatId} disabled={isOccupied} onClick={() => handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) ? "bg-primary text-white" : ""} ${isOccupied ? "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50" : ""}`}>
            {seatId}
          </button>
        );
      })}
    </div>
  </div>
);

  const handleSeatClick = (seatId) => {
  if (!selectedTime) {
    return toast("Please select time first")
  }
  if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
    return toast("You can only select 5 seats")
  }
  setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
} 

  const getShow = async () => {
    try {
      const { data } = await api.get(`/api/show/${id}`)
      if (data.success) {
        setShow(data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  // Fetch occupied seats when a showtime is selected
  const fetchOccupiedSeats = async (showId) => {
    try {
      const { data } = await api.get(`/api/booking/seates/${showId}`)
      if (data.success) {
        setOccupiedSeats(data.occupiedSeats)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleTimeSelect = (item) => {
    setSelectedTime(item)
    setSelectedSeats([])
    fetchOccupiedSeats(item.showId)
  }

  const handleBooking = async () => {
    if (!user) return toast('Please login first')
    if (!selectedTime) return toast('Please select a time')
    if (selectedSeats.length === 0) return toast('Please select at least one seat')

    try {
      setBooking(true)
      const { data } = await api.post('/api/booking/create', {
        showId: selectedTime.showId,
        selectedSeats,
      })
      if (data.success) {
        toast.success(data.message)
        navigate('/my-bookings')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setBooking(false)
    }
  }

  useEffect(()=>{
    getShow()
  },[])


  

  return  show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>

        {/* Available Timings */}
        <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
            <p className='text-lg font-semibold px-6'>Available Timings</p>
            <div className='mt-5 space-y-1'>
                {
                show.dateTime[date]?.map((item)=>(
                    <div key={item.time} onClick={()=> handleTimeSelect(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md  cursor-pointer transition 
                    ${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}>
                        <ClockIcon className="w-4 h-4"/>
                        <p className='text-sm'>{isoTimeFormat(item.time)}</p>
                    </div>
                ))
                }
            </div>
        </div>
        <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
            <BlurCircle top="-100px" left="-100px"/>
            <BlurCircle bottom="0" right="0"/>
            <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
            <img src={assets.screenImage} alt="screen" />
            <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>
            <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
                <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6 '>
                    {groupRows[0].map(row => renderSeats(row))}
                </div>
            <div className='grid grid-cols-2 gap-11'>
                {groupRows.slice(1).map((group, idx)=>(
                    <div key={idx}>
                        {group.map(row => renderSeats(row))}
                    </div>
                ))}
                </div>
            </div>
        <button disabled={booking} onClick={handleBooking} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95 disabled:opacity-50'>
          {booking ? 'Booking...' : 'Proceed to Checkout'}
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>            
        </div>
    </div>
  ):(
    <Loading/>
  )

}
export default SeatLayout
