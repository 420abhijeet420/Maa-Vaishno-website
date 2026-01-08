import axios from "axios";
import Movie from "../models/Movies.js";
import Show from "../models/Shows.js";



// api to get now playing movies
export const getNowPlayingMovies = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing',
            {headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}`}});

        const movies = data.results;
        res.json({ success: true, movies: movies });   

    } catch (error) {
        console.error(error); 
        res.json({ success: false, message: error.message });
    }
};







// api to add new shows to db
export const addShows = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body
        let movie = await Movie.findById(movieId) // .findById is a model function
        if(!movie) {
         // Fetch movie details and credits from TMDB API

            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([   //Promise.all([ promise1, promise2, promise3 ])
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {       //Make a GET request to some API endpoint.  
            headers: { Authorization : `Bearer ${process.env.TMDB_API_KEY}` }
            }),
            axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: { Authorization : `Bearer ${process.env.TMDB_API_KEY}` }
            })
            ])

            const movieApiData = movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data; 
            const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                genres: movieApiData.genres,
                casts: movieCreditsData.cast,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || "",
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime,
            }

            // add movie to the database
            const movies = await Movie.create(movieDetails);            
        }

        const showsToCreate = [];
             // SOME ERROR MIGHT BE HERE
            showsInput.forEach(show => {
                const showDate = show.date;
                show.time.forEach((time) => {
                    const dateTimeString = `${showDate}T${time}`;
                    showsToCreate.push({
                        movie: movieId,
                        showDateTime: new Date(dateTimeString),
                        showPrice,
                        occupiedSeats: {}
                    });
                });
            });

            
            if (showsToCreate.length > 0) {
                await Show.insertMany(showsToCreate)
            }
            res.json({success: true , message: 'Show added sucessfully'});

    } catch (error) {
        console.error(error);
        res.json({success: false , message: error.message});
    }
};





// API to get all shows from the database
export const getShows = async (req, res) => {
    try {       //Mongoose query chain.
        const shows = await Show.find({ showDateTime: { $gte: new Date() } }) 
                                .populate('movie')
                                .sort({ showDateTime: 1 });// Sorts results by showDateTime in ascending order:
                                

        // filter unique shows
        const uniqueShows = new Set(shows.map(show => show.movie)); //.map() loops over each item in shows.  “From each show, extract ONLY the movie field.”
                                                                    // new Set() is a built-in JavaScript data structure that stores unique values only.

        res.json({ success: true, shows: Array.from(uniqueShows) })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get a single show from the database
export const getShow = async (req, res) => {
    try {
        const { movieId } = req.params;

        // get all upcoming shows for the movie
        const shows = await Show.find({
            movie: movieId,
            showDateTime: { $gte: new Date() }
        });

        const movie = await Movie.findById(movieId);
        const dateTime = {};

        shows.forEach((show) => {
            const date = show.showDateTime.toISOString().split("T")[0];

            if (!dateTime[date]) {
                dateTime[date] = [];
            }

            dateTime[date].push({
                time: show.showDateTime,
                showId: show._id
            });
        });

        res.json({ success: true, movie, dateTime });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};
