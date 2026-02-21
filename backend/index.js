import express from 'express';
import 'dotenv/config'
import authRouter from './routes/auth.Routes.js';
import connectDB from './config/db.js';
import movieRouter from './routes/movie.Routes.js';
import tmdbRouter from './routes/tmdb.Routes.js';
import cors from 'cors'
import showRouter from './routes/show.Routes.js';
import bookingRouter from './routes/book.Routes.js';
import "./jobs/autoGenerateShows.js";

const app = express();

// Global Middleware
app.use(express.json())
app.use(cors())

// Connect to DB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World movie!');
})

app.use('/api/auth', authRouter)
app.use('/api/movie', movieRouter)
app.use('/api/tmdb', tmdbRouter)
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)


// Server Starting
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})


