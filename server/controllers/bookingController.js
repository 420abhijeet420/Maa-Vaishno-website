import mongoose from "mongoose";
import Show from "../models/Shows";
import { err } from "inngest/types";
import Show from "../models/Shows.js";

const checkSeatAvailability = async (showId, selectedSeats) =>{
    try {
        const showData = await Show.findById(showId)
        if(!showData) return false;
    
        const occupiedSeats = showData.occupiedSeats;
        const isAnySeatTaken = selectedSeats.some(seats => occupiedSeats[seats])
    
        return !isAnySeatTaken;
    } catch (error) {
        console.error(error.message);
        return false 
    }
}


export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body;
        const { origin } = req.headers;

        // Check if the seat is available for the selected show
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

        if (!isAvailable) {
            return res.json({
                success: false,
                message: "Selected Seats are not available."
            });
        }

        // Get the show details
        const showData = await Show.findById(showId).populate('movie');

        // Create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats
        });

        selectedSeats.map((seat) => {
            showData.occupiedSeats[seat] = userId;
        });

        showData.markModified('occupiedSeats');
        await showData.save();

        // Stripe Gateway Initialize
        res.json({ success: true, message: 'Booked successfully' });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const getOccupiedSeates = async (req,res) => {
    try {
        const {showId} = req.params
        const showData = await Show.findById(showId)
        const occupiedSeats = Object.keys(showData.occupiedSeats)
    } catch (error) {
        console.error(error.message)
        res.json({success: false, message: error.message})
    }
}

/*
req.params
URL path values
/shows/:showId


req.query
Query string
?page=2


req.body
POST/PUT data
{ seats: ["A1"] 


Client (Browser / React)
        ↓    
HTTP Request
        ↓
Express Route
        ↓
Controller (req, res)
        ↓
MongoDB
        ↓
res.json() → Client
*/