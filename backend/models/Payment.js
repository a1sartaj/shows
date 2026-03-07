import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    showId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Show',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
     seats: {
        type: [String],
        required: true
    },
    paymentId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['CREATED', 'SUCCESS', 'FAILED'],
        default: 'CREATED'
    }

    
})

const Payment = mongoose.model('Payment', paymentSchema)
export default Payment