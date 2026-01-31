#  Movie Ticket Booking Platform (MERN Stack)

A full-stack movie ticket booking platform that allows users to explore movies, select seats, and securely book tickets online. The platform includes an admin dashboard for managing movies and bookings, along with automated background workflows for notifications and seat reservation handling.

The application is built using the MERN stack and deployed for real-world usage.

---

##  Features

### User Features
- User authentication with multiple sign-in options
- Browse currently available movies
- Seat selection with real-time availability
- Online ticket booking workflow
- Payment retry window with temporary seat reservation
- Booking confirmation and reminder emails
- Multi-session account switching

### Admin Dashboard
- Add and manage movies
- View and manage bookings
- Monitor platform activity

### System Features
- Temporary seat lock during payment attempts
- Automatic seat release on payment failure
- Automated email notifications
- Background job scheduling
- Scalable backend architecture

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- Clerk Authentication (Email, Social, Phone login)

### Background Jobs & Scheduling
- Inngest

### Logging & Monitoring
- Axiom

### Deployment
- Vercel (Frontend)
- Cloud backend deployment

---

##  Key Workflows

### Ticket Booking Flow
1. User selects movie and showtime.
2. Seats are temporarily locked.
3. Payment process begins.
4. On success → booking confirmed.
5. On failure → seats remain locked for retry.
6. Seats auto-release after timeout.

### Notification System
- Booking confirmation emails
- Upcoming show reminders
- New movie announcements

---

##  Project Structure
client/     → React frontend
server/     → Express backend
admin/      → Admin dashboar

---

##  Authentication Highlights
- Multi-provider login support
- Multi-session account switching
- Secure session management

---

##  Scalability Considerations
- Background jobs decoupled from request cycle
- Seat locking prevents race conditions
- Modular backend structure
- Stateless API architecture

---

##  Live Demo
https://maa-vaishno-website-f9u6.vercel.app

---

##  What This Project Demonstrates
- Full-stack application design
- Production-style backend workflows
- Authentication & session management
- Concurrency handling in booking systems
- Deployment-ready architecture

---

##  Future Improvements
- Payment gateway integration
- Real-time seat updates via WebSockets
- Movie recommendation system
- Mobile app client

---

##  Author
**Abhijeet**  linkedin.com/in/abhijeetkumar09/
**Vidhi Barbaria**   linkedin.com/in/vidhibarbaria/

---

 If you found this project useful, consider giving it a star.
