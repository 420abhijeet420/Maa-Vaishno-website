import express from "express"
import { getFavourite, getUserBookings, updateFavourite } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/bookings', getUserBookings)
userRouter.post( '/update-favourite', updateFavourite)
userRouter.get('/favourite',getFavourite)

export default userRouter;