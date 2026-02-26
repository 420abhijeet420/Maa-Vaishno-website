import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js"
import Movie from "../models/Movies.js";


// API Controller to get user bookings
export const getUserBookings = async (req, res)=> {
    try {
        const user = req.auth().userId //...

        const bookings = await Booking.find({user}).populate({
            path: "show",
            populate : {path: "movie"}
        }).sort({createdAt : -1})
        res.json({success: true, bookings})
    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    } 

    
}

// Api controller to update Fav movie in clerk user metadata

export const updateFavourite = async (req,res)=>{

    try {
        const {movieId} = req.body;
        const userId = req.auth().userId

        const user = await clerkClient.users.getUser(userId)

        if(!user.privateMetadata.favourites){
            user.privateMetadata.favourites = []
        }

        if(!user.privateMetadata.favourites.includes(movieId)){
            user.privateMetadata.favourites.push(movieId)
        }else{
            user.privateMetadata.favourites = user.privateMetadata.favourites.filter(item => item !== movieId)
        }
        await clerkClient.users.updateUserMetadata(userId,{privateMetadata: user.privateMetadata})

        res.json({success: true , message: "favourite movie updated"})
    } catch (error) {
        console.error(error)
        res.json({success : false , message: error.message})
    }
}

//API to get favourites of a user
export const getFavourite = async (req, res) =>{
    try {
        const userId = req.auth().userId
        const user = await clerkClient.users.getUser(userId)
        const fav = (await user).privateMetadata.favourites
        const movies = await Movie.find({_id: {$in: fav}}) //......
        res.json({success: true , movies})
    } catch (error) {
        console.error(error)
        res.json({success : false , message: error.message})
    }
}




