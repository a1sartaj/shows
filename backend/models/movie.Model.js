import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    tmdbId: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    overview: {
        type: String,
        required: true,
    },

    originalLanguage: {
        type: String,
        required: true
    },

    releaseDate: {
        type: Date,
        required: true,
    },

    posterPath: {
        type: String,
        required: true,
    },

    backdropPath: {
        type: String,
    },

    runtime: {
        type: Number,
        default: null
    },

    genres: [
        {
            id: Number,
            name: String
        }
    ],

    isActive: {
        type: Boolean,
        default: true,
    },

    rating: {                 
        type: Number,
        required: true,
    },

    trailer: {
        type: [
            {
                name: String,
                key: String
            }
        ],
        default: []
    },

    popularity: Number,       

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }

}, { timestamps: true })

const movieModel = mongoose.model('movie', movieSchema)

export default movieModel
