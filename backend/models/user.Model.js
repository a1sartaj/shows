import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false // security: password by default query me nahi aayega, means password will not be sent to frontend.
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        },

    },
    {
        timestamps: true // createdAt, updatedAt automatically
    }
);

const userModel = mongoose.model('user', userSchema)

export default userModel
