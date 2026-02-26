# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A movie booking web application ("Maa Vaishno") with a React frontend and Express backend. Users can browse movies, view showtimes, book seats, and manage favorites. There is an admin panel for managing shows and viewing bookings/dashboard data.

## Monorepo Structure

This is a two-package monorepo with no root package.json. The `client/` and `server/` directories are independent packages with their own `node_modules`.

- **client/** — React 19 SPA (Vite, Tailwind CSS v4, React Router v7)
- **server/** — Express 5 REST API (MongoDB/Mongoose, Clerk auth, Inngest background jobs)

## Build & Dev Commands

### Client (`client/`)
- `npm run dev` — Start Vite dev server
- `npm run build` — Production build to `client/dist/`
- `npm run lint` — ESLint (flat config, JS/JSX files)
- `npm run preview` — Preview production build locally

### Server (`server/`)
- `npm run dev` — Start server with `node server.js` (port 3001)
- `npm run server` — Start server with `nodemon` (auto-restart on changes)

### No test framework is configured in either package.

## Environment Variables

### Client (`client/.env`)
- `VITE_CLERK_PUBLISHABLE_KEY` — Clerk frontend auth key
- `VITE_BACKEND_URL` — Backend API base URL

### Server (`server/.env`)
- `MONGODB_URI` — MongoDB connection string (database name: `my-react-app`)
- `TMDB_API_KEY` — TMDB API bearer token for fetching movie data
- `CLERK_SECRET_KEY` / `CLERK_PUBLISHABLE_KEY` — Clerk auth keys
- Inngest and Cloudinary keys as needed

## Architecture

### Authentication Flow
Clerk handles all auth. The client wraps the app in `<ClerkProvider>` (`main.jsx`). The server uses `@clerk/express` middleware (`clerkMiddleware()`), and `req.auth().userId` extracts the user ID in controllers. Admin routes are protected by `server/middleware/auth.js` which checks `user.privateMetadata.role === 'admin'` via Clerk.

### User Sync (Inngest)
User creation/deletion/update in Clerk is synced to MongoDB via Inngest background functions (`server/inngest/index.js`). These listen to `clerk/user.created`, `clerk/user.deleted`, and `clerk/user.updated` events. The Inngest serve endpoint is at `/api/inngest`.

### Data Models (Mongoose)
- **User** — synced from Clerk, `_id` is the Clerk user ID (String)
- **Movie** — fetched from TMDB API on first show creation, `_id` is the TMDB movie ID (String)
- **Show** — a screening, references Movie, tracks `occupiedSeats` as an Object
- **Booking** — references User and Show, tracks `bookedSeats` array and payment status

All model `_id` fields are String type (not ObjectId).

### API Routes
- `/api/show/*` — public + admin show/movie endpoints
- `/api/booking/*` — seat booking and occupied seat queries
- `/api/admin/*` — admin dashboard, show/booking management (note: routes in `server.js` are missing leading `/` — `'api/admin'` instead of `'/api/admin'`)
- `/api/user/*` — user bookings and favorites
- `/api/inngest` — Inngest webhook endpoint

### Client Routing
React Router with public routes (`/`, `/movies`, `/movies/:id`, `/movies/:id/:date`, `/my-bookings`, `/favorite`) and nested admin routes (`/admin/*` with `Layout` wrapper). Navbar and Footer are hidden on admin routes.

### Styling
Tailwind CSS v4 via `@tailwindcss/vite` plugin. Custom theme colors defined in `client/src/index.css` (`--color-primary: #F84565`, `--color-primary-dull: #D63854`). Dark theme with `#09090B` background, white text, Outfit font.

### Deployment
Both client and server have `vercel.json` configs for Vercel deployment. Client uses SPA rewrites; server uses `@vercel/node`.

## Code Conventions
- ES modules throughout (`"type": "module"` in both packages)
- JSX files use `.jsx` extension
- API responses consistently use `{ success: boolean, ...data }` shape
- Server controllers follow `async (req, res) => { try/catch }` pattern with `res.json()` responses
- Client utility functions live in `client/src/lib/`
