# 🎬 Movie Ticket Booking Website (MERN Stack)

A full-stack production-style **Movie Ticket Booking Web Application** built with the **MERN stack**. Users can browse movies, select shows, choose seats, and book tickets, while Admin can manage movies, shows, and users.

##🚀 Live Demo
- 🌐 Website: https://shows.a1sartaj.in
- 👨‍💻 GitHub: https://github.com/a1Sartaj/shows

## 😒 What Problem does is solve?
This movie ticket booking website help to see new movie and there timing for shows so that movie lover can book ticket from their home.

## 🚧 Project Status
I have completed most of the features of this like booking, new movies, trending, select seats and so on. But I will more improvement in feature.

## 🚀 Features
### 🔐 Authentication & Security
- Sigle login system for User & Admin
- Admin account will be created manually.
- Password hashing using bcrypt
- JWT-based authentication using Authorization header.
- Role-based route protection (USER / ADMIN)
- Protected routes & middleware authorization
- Secure booking ownership validataion

### 🎬 Movie System

- Movies fetched from TMDB API
- Admin can import movies via tmdbId
- TMDB image CDN used (no local storage)
- Movie listing with pagination
- Movie details page with backdrop hero
- Trailer integration (YouTube)

### 🎟 Show System
- Admin can create and manage shows
- Date + time merged into showDateTime
- Screen, format, language, price, seats
- Auto-expire past shows using TTL index
- Fetch available dates & shows by date

### 🪑 Seat Selection System
- Dynamic seat layout (A1, B2, etc.)
- Booked seats disabled
- Prevent double booking
- Atomic booking with MongoDB transactions
- Seat validation before booking

### 🎫 Booking System (Core Feature)
- Secure ticket booking
- MongoDB transaction-based seat locking
- Booking confirmation page
- QR Code ticket generation
- Ticket details: 
    - Movie 
    - Date & Time
    - Screen
    - Seats
    - Total amount
    - booking ID
- Booking history

### 👨‍💼 Admin Panel
- Manage users
- Update user password
- Delete users
- Manage movies (TMDB import)
- Manage shows (create & view)
- Role-based admin protection

### 💻 Frontend
- React + Vite
- TailwindCSS (custom glass theme)
- Axios API layer
- AuthContext session restore
- Protected routes
- Pagination with URL sync
- Skeleton & PageLoader
- Responsive UI
- QR code ticket
- Clean cinema-style ticket UI

### 🧠 Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- MongoDB Transactions (seat safety)
- TTL index (auto expire shows)
- RESTful APIs
- Middleware architecture
- Secure booking ownership validation


## 🛠 Tech Stack
### 💻 Frontend
- React
- Vite
- TailwindCSS
- Axios
- React Router
- React Hot Toast
- QRCode React


### 🧠 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- dotenv

## 🔑 Environment Variables
### 💻 Frontend (.env)
```
  VITE_BACKEND_URI=your-backend-url
```

### 🧠 Backend (.env)
```
    PORT=5000
    MONGO_URI=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    TMDB_API_KEY=your_tmdb_key
```

## 🔄 API Overview
### Auth Routes
- `GET: /api/auth/me`
- `POST: /api/auth/login`
- `POST: /api/auth/sign-up`
- `PUT: /api/auth/update/:userId` (ADMIN) 
- `GET: /api/auth/get-all-users` (ADMIN)
- `DELETE: /api/auth/delete/:userId` (ADMIN)

### Booking Routes
- `POST: /api/booking/book` (Protected Route)
- `GET: /api/booking/history` (Protected Route)
- `GET: /api/booking/:bookingId` (Protected Route) 

### Movie Routes
- `POST: /api/movie/admin/add-movie` (ADMIN)
- `GET: /api/movie/get-all-movies`
- `GET: /api/movie/get-movie/:id`
- `GET: /api/movie/get-for-hero`
- `GET: /api/movie/get-for-trailer`
- `GET: /api/movie/get-trending-movie`
- `GET: /api/movie/get-letest-movie`

### Show Routes
- `POST: /api/show/admin/create` (ADMIN)
- `GET: /api/show/available-dates/:movieId`
- `GET: /api/show/by-date`

### TDMD Routes
- `GET: /api/tmdb/admin/tmdb/search` (ADMIN)
- `GET: /api/tmdb/admin/tmdb/movie/:tmdbId` (ADMIN)

## 🔒 Security Features
- JWT token verification
- Role-based admin protection
- Password hashing
- Booking ownership validation
- MongoDB transaction safe booking
- Prevent seat race condition

## 🧪 How to Run Locally
### 🧑‍💻 Open terminal and paste it
```
    git clone https://github.com/a1sartaj/shows.git
 ```

### 🧠 Backend
```
    cd Backend
    npm install
    npm run dev
```

### 💻 Frontend
```
   cd frontend
   npm install
   npm run dev
```

## 🌍 Deployment
- **Frontend :** VPS server
- **Backend :** VPS server
- **MongoDB :** VPS server

## ⭐ Future Improvements
- Seat HOLD system (5 min)
- Real-time seat update (Socket.io)
- Payment gateway (Razorpay / Stripe)
- Booking history page
- Cancel booking → release seats
- Ticket PDF download
- Email ticket
- Admin dashboard analytics
- Search & filter
- Performance optimization

## 🧑‍💻 Author
### Sartaj Alam
- GitHub : https://github.com/a1Sartaj
- LinkedIn : https://linkedin.com/in/a1sartaj
- Portfolio : https://a1sartaj.in

## 📄 License
This project is licensed under the MIT License.