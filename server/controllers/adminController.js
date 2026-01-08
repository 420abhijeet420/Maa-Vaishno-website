import { use } from "react"
import Booking from "../models/Booking.js"
import Show from "../models/Shows.js"
import User from "../models/User.js"


// API to create if user is amdin , executes only after middleware which actually checks
export const isAdmin = async (req, res) => {
    res.json({sucess:true, isAdmin: true})
}

// API to get dashboard data
export const getDashboardData = async(req,res)=>{
    try {
        const bookings= await Booking.find({isPaids:true})
        const activeShows= await Show.find({$gte: new Date()}).populate('movie')
        const totalUser = await User.countDocuments()

        const dashboardData = {
            totalBookings: bookings.length,
            totalRevenue: bookings.reduce((acc, booking) => acc + booking.amount,0),
            activeShows,
            totalUser
        };
        res.json({sucess:true , dashboardData})
    } catch (error) {
        console.error(error)
        res.json({sucess:false, message: error.message})
    }
}