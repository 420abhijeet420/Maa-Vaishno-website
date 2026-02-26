import { Router } from "express";
import { createBooking, getOccupiedSeates } from "../controllers/bookingController.js";

const bookingRouter = Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/seates/:showId', getOccupiedSeates);

export default bookingRouter