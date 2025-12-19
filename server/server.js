import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/showRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express()
const port = 3001;

// mongodb stuff
await connectDb()

// creating the middleware (whatever thar means)
app.use(clerkMiddleware())
app.use(express.json())
app.use(cors())

// api routes

app.listen(port, () =>{ console.log(`the server is live on http://localhost:${port}`)})

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show', showRouter),
app.use('/api/booking', bookingRouter)
app.get('/' , (req,res)=> res.send("SERVER IS LIVE"))

