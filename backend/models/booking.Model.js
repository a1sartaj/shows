import mongoose from 'mongoose'


const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true
    },

    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'show',
        required: true
    },

    showDateTime: {
        type: Date,
        required: true
    },
    screen: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: 'Hindi'
    },
    format: {
        type: String,
        default: '2D'
    },
    seats: {
        type: [String],
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const bookingModel = mongoose.model('booking', bookingSchema)

export default bookingModel