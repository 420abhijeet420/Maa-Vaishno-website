import { Router } from "express";
import { createBooking, getOccupiedSeates } from "../controllers/bookingController";

const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/seates/:showId', getOccupiedSeates);

export default bookingRouter