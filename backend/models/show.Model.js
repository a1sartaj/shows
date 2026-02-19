import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
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

    format: {
        type: String,
        default: '2D'
    },

    language: {
        type: String,
        default: 'Hindi'
    },

    price: {
        type: Number,
        required: true
    },

    totalSeats: {
        type: Number,
        required: true,
        default: 100
    },

    bookedSeats: {
        type: [String],   // 👈 change Number → String
        default: []
    },

    expireAt: {
        type: Date,
        required: true,
        index: { expires: 0 }   // TTL index
    },

}, { timestamps: true });



const showModel = mongoose.model('show', showSchema)

export default showModel;