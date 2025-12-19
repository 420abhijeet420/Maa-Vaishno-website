import mongoose from "mongoose";

const showSchema = new mongoose.Schema( //creates an object
{
    movie: { type: String, required: true, ref: 'Movie' },
    showDateTime: { type: Date, required: true },
    showPrice: { type: Number, required: true },
    occupiedSeats: { type: Object, default: {} }
}, 
{ minimize: false }
);

const Show =  mongoose.model("Show", showSchema); //is a function, not a constructor

export default Show;